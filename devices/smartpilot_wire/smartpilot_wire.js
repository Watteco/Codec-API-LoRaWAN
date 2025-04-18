let watteco = require("../../codec/decode_uplink")
let encoder = require("../../codec/encode_downlink")

let batch_param=[]

const dlFrames = {
    sendMSOMode: "11050013005520<U8:sendMSOMode>"
}

let endpointCorresponder={}
function decodeUplink(input,optBatchParams = null, optEndpointCorresponder = null) {
    if (optBatchParams) { batch_param = optBatchParams;}
    if (optEndpointCorresponder) { endpointCorresponder = optEndpointCorresponder;}
    return watteco.watteco_decodeUplink(input,batch_param,endpointCorresponder);
}
exports.decodeUplink = decodeUplink;

function encodeDownlink(input) {
    return encoder.watteco_encodeDownlink({ dlFrames: dlFrames }, input);
}
exports.encodeDownlink = encodeDownlink;

const encodePayload = encoder.encodePayload;
exports.encodePayload = encodePayload;

// Make it also globally available as it is TS013 compliant, 
// but keep former diver.decodeUplink format for retrocompatibility
const globalObject = typeof globalThis !== 'undefined' ? globalThis : this;
globalObject.decodeUplink = decodeUplink;
globalObject.encodeDownlink = encodeDownlink;
globalObject.encodePayload = encodePayload;