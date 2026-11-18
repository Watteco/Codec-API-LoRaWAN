let watteco = require("../../codec/decode_uplink")
let units = require("./units.auto.js")

let batch_param = [4, [
    { taglbl: 0, resol: 1, sampletype: 10, lblname: "index_1", divide: 1 },
    { taglbl: 3, resol: 1, sampletype: 1, lblname: "pin_state_1", divide: 1 },
    { taglbl: 6, resol: 100, sampletype: 6, lblname: "battery_voltage", divide: 1000 }
]];

let endpointCorresponder = {
    index: ["index_1"],
    pin_state: ["pin_state_1"],
    pin_state_2: ["NA"],
    pin_state_3: ["NA"],
    pin_state_4: ["NA"],
    pin_state_5: ["NA"],
    pin_state_6: ["NA"],
    pin_state_7: ["NA"],
    pin_state_8: ["NA"],
    pin_state_9: ["NA"],
    pin_state_10: ["NA"]
}

function decodeUplink(input, optBatchParams = null, optEndpointCorresponder = null, optUnits = null) {
	if (optBatchParams) { batch_param = optBatchParams; }
	if (optEndpointCorresponder) { endpointCorresponder = optEndpointCorresponder; }
    if (optUnits) { units = { ...units, ...optUnits }; }
	return watteco.watteco_decodeUplink(input, batch_param, endpointCorresponder, units);
}
exports.decodeUplink = decodeUplink;

const globalObject = typeof globalThis !== 'undefined' ? globalThis : this;
globalObject.decodeUplink = decodeUplink;

let encoder = require("../../codec/encode_downlink")

const dlFrames = {
}

function encodeDownlink(input) {
    return encoder.watteco_encodeDownlink({ dlFrames: dlFrames }, input);
}
exports.encodeDownlink = encodeDownlink;

const encodePayload = encoder.encodePayload;
exports.encodePayload = encodePayload;

globalObject.encodeDownlink = encodeDownlink;
globalObject.encodePayload = encodePayload;
