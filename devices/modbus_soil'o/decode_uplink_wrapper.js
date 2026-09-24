driver.decodeUplinkInter = driver.decodeUplink;

/* MODBUS MULTI WITHOUT HEADER: 10 data bytes per endpoint, implicit FC03. */
function decodeMultiLayerSoil(input, decoded) {
    var warnings = [];
    var samples = [];

    if (!decoded) return null;

    function toBytes(bytes) {
        if (typeof bytes !== "string") return bytes;
        var cleanHex = bytes.replace(/[^0-9A-Fa-f]/g, "");
        var result = [];
        for (var index = 0; index < cleanHex.length; index += 2) {
            result.push(parseInt(cleanHex.substr(index, 2), 16));
        }
        return result;
    }

    function hexToBytes(hex) {
        var result = [];
        for (var index = 0; index < hex.length; index += 2) {
            result.push(parseInt(hex.substr(index, 2), 16));
        }
        return result;
    }

    function u16be(bytes, index) {
        return (bytes[index] << 8) | bytes[index + 1];
    }

    function s16be(bytes, index) {
        var value = u16be(bytes, index);
        return (value & 0x8000) ? value - 0x10000 : value;
    }

    function addSample(variable, value, date, unit) {
        if (value === null) return;
        var sample = { variable: variable, value: value, date: date };
        if (unit) sample.unit = unit;
        samples.push(sample);
    }

    function decodeLayer(payloadHex, functionId, dataSize, endpointId, date) {
        if (!payloadHex || (functionId !== 3 && functionId !== 4) ||
            dataSize < 2 || dataSize > 10 || dataSize % 2 !== 0 ||
            payloadHex.length !== dataSize * 2) {
            return false;
        }

        var suffix = "_" + (endpointId + 1);
        var bytes = hexToBytes(payloadHex);
        var vwc = u16be(bytes, 0) / 10.0;
        var temperature = dataSize >= 4 ? s16be(bytes, 2) / 10.0 : null;
        var ec = dataSize >= 6 ? u16be(bytes, 4) : null;
        var salinity = dataSize >= 8 ? u16be(bytes, 6) : null;
        var tds = dataSize >= 10 ? u16be(bytes, 8) : null;

        addSample("temperature" + suffix, temperature, date, "Cel");
        addSample("vwc" + suffix, vwc, date, "%");
        addSample("ec" + suffix, ec, date, "uS/cm");
        addSample("salinity" + suffix, salinity, date, "mg/L");
        addSample("tds" + suffix, tds, date, "mg/L");
        return true;
    }

    function decodeImplicitLayers(bytes, date) {
        if (!bytes || bytes.length < 21 || bytes[1] !== 0x0A ||
            ((bytes[2] << 8) | bytes[3]) !== 0x8009 || bytes[6] !== 0x41) {
            return false;
        }

        var payloadLength = bytes[7];
        var dataLength = payloadLength - 3;
        if (payloadLength < 13 || bytes.length !== 8 + payloadLength ||
            dataLength % 10 !== 0 || dataLength / 10 > 10) {
            return false;
        }

        for (var endpoint = 0; endpoint < dataLength / 10; endpoint++) {
            var payload = "";
            var start = 11 + endpoint * 10;
            for (var index = start; index < start + 10; index++) {
                var hexByte = bytes[index].toString(16).toUpperCase();
                payload += hexByte.length === 1 ? "0" + hexByte : hexByte;
            }
            decodeLayer(payload, 3, 10, endpoint, date);
        }
        return true;
    }

    var decodedSamples = decoded.samples;
    var date = decodedSamples && decodedSamples.length && decodedSamples[0].date ?
        decodedSamples[0].date : (input && input.recvTime ? input.recvTime : new Date().toISOString());

    if (!(decodedSamples && decodedSamples.length && decodedSamples[0].date) && !(input && input.recvTime)) {
        warnings.push("Missing sample date, current time used");
    }

    var bytes = toBytes(input && input.bytes);
    var standardModbusFrame = bytes && bytes.length >= 4 && (((bytes[2] << 8) | bytes[3]) === 0x8007);
    var classicEndpoint = bytes && bytes.length ?
        ((bytes[0] & 0xE0) >> 5) | ((bytes[0] & 0x06) << 2) : 0;

    var decodedLayer = false;
    for (var endpoint = 0; endpoint <= 9; endpoint++) {
        var payloadKey = "modbus_payload_EP" + endpoint;
        decodedLayer = decodeLayer(
            decoded[payloadKey],
            decoded["modbus_fnctID_EP" + endpoint],
            decoded["modbus_datasize_EP" + endpoint],
            standardModbusFrame ? classicEndpoint : endpoint,
            date
        ) || decodedLayer;
    }

    if (!decodedLayer) decodedLayer = decodeImplicitLayers(bytes, date);
    if (!decodedLayer) return null;

    var data = { samples: samples };
    for (var sampleIndex = 0; sampleIndex < samples.length; sampleIndex++) {
        var sample = samples[sampleIndex];
        data[sample.variable] = sample.value;
        if (sample.unit) data[sample.variable + "_unit"] = sample.unit;
    }
    return { data: data, warnings: warnings };
}

function decodeUplink(input) {
    var output = driver.decodeUplinkInter(input);

    if (output.errors) return output;
    if (!output.data) {
        return { data: {}, warnings: ["driver.decodeUplinkInter returned no data"] };
    }

    var remapped = decodeMultiLayerSoil(input, output.data);
    return remapped || output;
}

driver.decodeUplink = decodeUplink;
(typeof globalThis !== "undefined" ? globalThis : this).decodeUplink = decodeUplink;
