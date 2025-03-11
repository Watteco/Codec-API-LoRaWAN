let watteco = require("../../codec/decode_uplink.js")

let batch_param =[2, [{taglbl: 0,resol: 10, sampletype: 7,lblname: "Temperature", divide: 100},
    { taglbl: 2, resol: 1, sampletype: 6,lblname: "BatteryVoltage", divide: 1000}]];
let endpointCorresponder={}
function decodeUplink(input,optBatchParams = null, optEndpointCorresponder = null) {
	if (optBatchParams) { batch_param = optBatchParams;}
	if (optEndpointCorresponder) { endpointCorresponder = optEndpointCorresponder;}
	return watteco.watteco_decodeUplink(input,batch_param,endpointCorresponder);
}
exports.decodeUplink = decodeUplink;

// Make it also globally available as it is TS013 compliant, 
// but keep former diver.decodeUplink format for retrocompatibility
const globalObject = typeof globalThis !== 'undefined' ? globalThis : this;
globalObject.decodeUplink = decodeUplink;

