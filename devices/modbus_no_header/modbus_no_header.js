let watteco = require("../../codec/decode_uplink");
let units = require("./units.auto.js");

let batchParam = [];
let endpointCorresponder = {};

function decodeModbusWithoutHeader(input, output) {
    const bytes = input && input.bytes;
    if (!bytes || bytes.length < 11 || bytes[1] !== 0x0A ||
        ((bytes[2] << 8) | bytes[3]) !== 0x8009 || bytes[6] !== 0x41) {
        return output;
    }

    const payloadLength = bytes[7];
    if (payloadLength < 3 || bytes.length !== 8 + payloadLength) {
        output.warnings = output.warnings || [];
        output.warnings.push("Invalid Modbus frame without header");
        return output;
    }

    let payload = "";
    for (let byteIndex = 11; byteIndex < bytes.length; byteIndex++) {
        const byte = bytes[byteIndex].toString(16).toUpperCase();
        payload += byte.length === 1 ? "0" + byte : byte;
    }

    const date = input.recvTime || new Date().toISOString();
    output.data = { samples: [{ variable: "modbus_payload", value: payload, date }] };
    output.data.modbus_payload = payload;
    return output;
}

function decodeUplink(input, optBatchParams = null, optEndpointCorresponder = null, optUnits = null) {
    if (optBatchParams) batchParam = optBatchParams;
    if (optEndpointCorresponder) endpointCorresponder = optEndpointCorresponder;
    if (optUnits) units = { ...units, ...optUnits };
    const output = watteco.watteco_decodeUplink(input, batchParam, endpointCorresponder, units);
    return output.errors ? output : decodeModbusWithoutHeader(input, output);
}

exports.decodeUplink = decodeUplink;
exports.decodeModbusWithoutHeader = decodeModbusWithoutHeader;

const globalObject = typeof globalThis !== "undefined" ? globalThis : this;
globalObject.decodeUplink = decodeUplink;

let encoder = require("../../codec/encode_downlink");
const dlFrames = {};

function encodeDownlink(input) {
    return encoder.watteco_encodeDownlink({ dlFrames: dlFrames }, input);
}

exports.encodeDownlink = encodeDownlink;
exports.encodePayload = encoder.encodePayload;
globalObject.encodeDownlink = encodeDownlink;
globalObject.encodePayload = encoder.encodePayload;