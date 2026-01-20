function _defineProperties(e,a){var t=0;for(;t<a.length;t++){var r=a[t];r.enumerable=r.enumerable||!1,
r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,_toPropertyKey(r.key),r)}}
function _createClass(e,a,t){return a&&_defineProperties(e.prototype,a),t&&_defineProperties(e,t),
Object.defineProperty(e,"prototype",{writable:!1}),e}function _classCallCheck(e,a){if(!(e instanceof a)){
throw new TypeError("Cannot call a class as a function")}}function _callSuper(e,a,t){return a=_getPrototypeOf(a),
_possibleConstructorReturn(e,_isNativeReflectConstruct()?Reflect.construct(a,t||[],_getPrototypeOf(e).constructor):a.apply(e,t))
}function _possibleConstructorReturn(e,a){if(a&&("object"==_typeof(a)||"function"==typeof a)){return a}if(void 0!==a){
throw new TypeError("Derived constructors may only return object or undefined")}return _assertThisInitialized(e)}
function _assertThisInitialized(e){if(void 0===e){
throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e}function _inherits(e,a){
if("function"!=typeof a&&null!==a){throw new TypeError("Super expression must either be null or a function")}
e.prototype=Object.create(a&&a.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),
Object.defineProperty(e,"prototype",{writable:!1}),a&&_setPrototypeOf(e,a)}function _wrapNativeSuper(e){
var a="function"==typeof Map?new Map:void 0;return _wrapNativeSuper=function(e){if(null===e||!_isNativeFunction(e)){
return e}if("function"!=typeof e){throw new TypeError("Super expression must either be null or a function")}
if(void 0!==a){if(a.has(e)){return a.get(e)}a.set(e,t)}function t(){
return _construct(e,arguments,_getPrototypeOf(this).constructor)}return t.prototype=Object.create(e.prototype,{
constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),_setPrototypeOf(t,e)},_wrapNativeSuper(e)}
function _construct(e,a,t){if(_isNativeReflectConstruct()){return Reflect.construct.apply(null,arguments)}var r=[null]
;r.push.apply(r,a);var n=new(e.bind.apply(e,r));return t&&_setPrototypeOf(n,t.prototype),n}
function _isNativeReflectConstruct(){try{
var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(e){}
return(_isNativeReflectConstruct=function(){return!!e})()}function _isNativeFunction(e){try{
return-1!==Function.toString.call(e).indexOf("[native code]")}catch(a){return"function"==typeof e}}
function _setPrototypeOf(e,a){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,a){
return e.__proto__=a,e},_setPrototypeOf(e,a)}function _getPrototypeOf(e){
return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){
return e.__proto__||Object.getPrototypeOf(e)},_getPrototypeOf(e)}function _typeof(e){
return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){
return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}
function ownKeys(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e)
;a&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,r)}return t}
function _objectSpread(e){var a=1;for(;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{}
;a%2?ownKeys(Object(t),!0).forEach(function(a){_defineProperty(e,a,t[a])
}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(a){
Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}function _defineProperty(e,a,t){
return(a=_toPropertyKey(a))in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}
function _toPropertyKey(e){var a=_toPrimitive(e,"string");return"symbol"==_typeof(a)?a:a+""}function _toPrimitive(e,a){
if("object"!=_typeof(e)||!e){return e}var t=e[Symbol.toPrimitive];if(void 0!==t){var r=t.call(e,a||"default")
;if("object"!=_typeof(r)){return r}throw new TypeError("@@toPrimitive must return a primitive value.")}
return("string"===a?String:Number)(e)}var driver;!function(){var e=[function(e,a,t){var r=t(1);var n=t(5);var i=[3,[{
taglbl:0,resol:1,sampletype:4,lblname:"occupancy",divide:1},{taglbl:1,resol:10,sampletype:7,lblname:"temperature_1",
divide:100},{taglbl:2,resol:100,sampletype:6,lblname:"humidity_1",divide:100},{taglbl:3,resol:10,sampletype:6,
lblname:"CO2",divide:1},{taglbl:4,resol:10,sampletype:6,lblname:"IAQ",divide:1},{taglbl:5,resol:10,sampletype:6,
lblname:"illuminance",divide:1},{taglbl:6,resol:10,sampletype:6,lblname:"pressure",divide:10}]];var o={
temperature:["temperature_1","temperature_2"],humidity:["humidity_1","humidity_2"],concentration:["IAQ","CO2"],
pin_state:["violation_detection"]};function s(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null
;var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null
;var s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;a&&(i=a);t&&(o=t)
;s&&(n=_objectSpread(_objectSpread({},n),s));return r.watteco_decodeUplink(e,i,o,n)}a.decodeUplink=s
;var d="undefined"!=typeof globalThis?globalThis:this;d.decodeUplink=s;var l=t(6);var c={};function u(e){
return l.watteco_encodeDownlink({dlFrames:c},e)}a.encodeDownlink=u;var v=l.encodePayload;a.encodePayload=v
;d.encodeDownlink=u;d.encodePayload=v},function(e,a,t){var r=t(2);var n=t(4);function i(e){
return null==e?{}:Array.isArray(e)?{samples:e}:"object"===_typeof(e)?e:"string"==typeof e||"number"==typeof e?{value:e
}:{}}function o(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};var t=i(e)
;if(!t.samples||!Array.isArray(t.samples)){return s(t,a)}var r=t.samples;var n={};r.forEach(function(e){
if("object"===_typeof(e)&&e.variable&&void 0!==e.value&&e.date){var t=e.variable,r=e.value,i=e.date
;(!n[t]||new Date(i)>new Date(n[t].date))&&(n[t]={value:r,date:i});a&&a[t]&&(e.unit=a[t])}});var o={};var d;for(d in t){
t.hasOwnProperty(d)&&(o[d]=t[d])}var l;for(l in n){n.hasOwnProperty(l)&&!o.hasOwnProperty(l)&&(o[l]=n[l].value)}
return s(o,a)}function s(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
;if(!a||0===Object.keys(a).length){return e}var t=_objectSpread({},e);var r;for(r in a){
void 0!==t[r]&&""!==a[r]&&(t["".concat(r,"_unit")]=a[r])}
t.samples&&Array.isArray(t.samples)&&(t.samples=t.samples.map(function(e){
return e.variable&&a[e.variable]&&""!==a[e.variable]?_objectSpread(_objectSpread({},e),{},{unit:a[e.variable]}):e}))
;return t}function d(e,a,t,i){var s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null
;if("string"==typeof e.bytes){var d=e.bytes.replace(/[^0-9A-Fa-f]/g,"");var c=[];var u=0;for(;u<d.length;u+=2){
c.push(parseInt(d.substr(u,2),16))}e.bytes=c}e.recvTime=l(e.recvTime);var v=e.recvTime;try{
var p=r.normalisation_standard(e,t,s);var f=p.payload;if("batch"!==p.type){return{data:o(p.data,i),warnings:p.warning}}
var _={batch1:a[0],batch2:a[1],payload:f,date:v};try{var m=n.normalisation_batch(_);return{data:o(m,i),warnings:[]}
}catch(e){return{errors:e.message,warnings:[]}}}catch(e){return{errors:e.message,warnings:[]}}}e.exports={
watteco_decodeUplink:d};function l(e){try{if(!e){return(new Date).toISOString()}if("string"==typeof e){var a=new Date(e)
;if(!isNaN(a.getTime())){return a.toISOString()}var t=Number(e);if(!isNaN(t)){return new Date(t).toISOString()}}
if("number"==typeof e){return e<1e12?new Date(1e3*e).toISOString():new Date(e).toISOString()}if("object"===_typeof(e)){
if(void 0!==e.seconds){var r=Number(e.seconds);var n=Number(e.nanos||e.nanoseconds||0);if(!isNaN(r)){
return new Date(1e3*r+Math.floor(n/1e6)).toISOString()}}var i=Object.keys(e);var o=0;for(;o<i.length;o++){var s=i[o]
;var d=e[s];if("object"===_typeof(d)&&null!==d){if(void 0!==d.int64&&!isNaN(Number(d.int64))){
return new Date(1e3*Number(d.int64)).toISOString()}if(d.string&&"string"==typeof d.string){var l=new Date(d.string)
;if(!isNaN(l.getTime())){return l.toISOString()}}if(void 0!==d.seconds){var c=Number(d.seconds);var u=Number(d.nanos||0)
;if(!isNaN(c)){return new Date(1e3*c+Math.floor(u/1e6)).toISOString()}}}}var v=new Date(e);if(!isNaN(v.getTime())){
return v.toISOString()}}}catch(e){return(new Date).toISOString()}return(new Date).toISOString()}},function(e,a,t){
var r=t(3),n=r.UintToInt,i=r.Bytes2Float32,o=r.BytesToInt64,s=r.decimalToHex,d=r.zeroPad;r.BytesToHexStr
;var l=function(e){function a(e){var t;_classCallCheck(this,a);t=_callSuper(this,a,[e]);t.name="ValidationError"
;return t}_inherits(a,e);return _createClass(a)}(_wrapNativeSuper(Error));var c={16:{name:"boolean",size:1},8:{
name:"general8",size:1},9:{name:"general16",size:2},10:{name:"general24",size:3},11:{name:"general32",size:4},24:{
name:"bitmap8",size:1},25:{name:"bitmap16",size:2},32:{name:"uint8",size:1},33:{name:"uint16",size:2},34:{name:"uint24",
size:3},35:{name:"uint32",size:4},40:{name:"int8",size:1},41:{name:"int16",size:2},42:{name:"int24",size:3},43:{
name:"int32",size:4},48:{name:"enum8",size:1},66:{name:"char string",size:1},65:{name:"bytes string",size:1},67:{
name:"long bytes string",size:2},76:{name:"structured ordered sequence",size:2},57:{name:"single",size:4}};var u={
32778:{0:{0:{divider:1,function_type:"int",name:"positive_active_energy",size:4},1:{divider:1,function_type:"int",
name:"negative_active_energy",size:4},2:{divider:1,function_type:"int",name:"positive_reactive_energy",size:4},3:{
divider:1,function_type:"int",name:"negative_reactive_energy",size:4},4:{divider:1,function_type:"int",
name:"positive_active_power",size:4},5:{divider:1,function_type:"int",name:"negative_active_power",size:4},6:{divider:1,
function_type:"int",name:"positive_reactive_power",size:4},7:{divider:1,function_type:"int",
name:"negative_reactive_power",size:4}}},32784:{0:{0:{divider:1,function_type:"int",name:"active_energy_a",size:4},1:{
divider:1,function_type:"int",name:"reactive_energy_a",size:4},2:{divider:1,function_type:"int",name:"active_energy_b",
size:4},3:{divider:1,function_type:"int",name:"reactive_energy_b",size:4},4:{divider:1,function_type:"int",
name:"active_energy_c",size:4},5:{divider:1,function_type:"int",name:"reactive_energy_c",size:4},6:{divider:1,
function_type:"int",name:"active_energy_abc",size:4},7:{divider:1,function_type:"int",name:"reactive_energy_abc",size:4}
},1:{0:{divider:1,function_type:"int",name:"active_power_a",size:4},1:{divider:1,function_type:"int",
name:"reactive_power_a",size:4},2:{divider:1,function_type:"int",name:"active_power_b",size:4},3:{divider:1,
function_type:"int",name:"reactive_power_b",size:4},4:{divider:1,function_type:"int",name:"active_power_c",size:4},5:{
divider:1,function_type:"int",name:"reactive_power_c",size:4},6:{divider:1,function_type:"int",name:"active_power_abc",
size:4},7:{divider:1,function_type:"int",name:"reactive_power_abc",size:4}}},32779:{0:{0:{divider:10,
function_type:"int",name:"Vrms",size:2},1:{divider:10,function_type:"int",name:"Irms",size:2},2:{divider:1,
function_type:"int",name:"angle",size:2}}},32781:{0:{0:{divider:10,function_type:"int",name:"Vrms_a",size:2},1:{
divider:10,function_type:"int",name:"Irms_a",size:2},2:{divider:1,function_type:"int",name:"angle_a",size:2},3:{
divider:10,function_type:"int",name:"Vrms_b",size:2},4:{divider:10,function_type:"int",name:"Irms_b",size:2},5:{
divider:1,function_type:"int",name:"angle_b",size:2},6:{divider:10,function_type:"int",name:"Vrms_c",size:2},7:{
divider:10,function_type:"int",name:"Irms_c",size:2},8:{divider:1,function_type:"int",name:"angle_c",size:2}}},32850:{
0:{0:{divider:1e3,function_type:"int",name:"frequency",size:2},1:{divider:1e3,function_type:"int",name:"frequency_min",
size:2},2:{divider:1e3,function_type:"int",name:"frequency_max",size:2},3:{divider:10,function_type:"int",name:"Vrms",
size:2},4:{divider:10,function_type:"int",name:"Vrms_min",size:2},5:{divider:10,function_type:"int",name:"Vrms_max",
size:2},6:{divider:10,function_type:"int",name:"Vpeak",size:2},7:{divider:10,function_type:"int",name:"Vpeak_min",size:2
},8:{divider:10,function_type:"int",name:"Vpeak_max",size:2},9:{divider:1,function_type:"int",name:"over_voltage",size:2
},10:{divider:1,function_type:"int",name:"sag_voltage",size:2},11:{divider:1,function_type:"int",name:"brownout_number",
size:2}}},32773:{0:{0:{divider:1,function_type:"none",name:"pin_state_1",size:1},1:{divider:1,function_type:"none",
name:"pin_state_2",size:1},2:{divider:1,function_type:"none",name:"pin_state_3",size:1},3:{divider:1,
function_type:"none",name:"pin_state_4",size:1},4:{divider:1,function_type:"none",name:"pin_state_5",size:1},5:{
divider:1,function_type:"none",name:"pin_state_6",size:1},6:{divider:1,function_type:"none",name:"pin_state_7",size:1},
7:{divider:1,function_type:"none",name:"pin_state_8",size:1},8:{divider:1,function_type:"none",name:"pin_state_9",size:1
},9:{divider:1,function_type:"none",name:"pin_state_10",size:1}}},80:{6:{0:{divider:1e3,function_type:"none",
name:"power_modes",size:2},1:{divider:1e3,function_type:"none",name:"current_power_source",size:2},2:{divider:1e3,
function_type:"none",name:"constant_power",size:2},3:{divider:1e3,function_type:"none",name:"rechargeable_battery",
size:2},4:{divider:1e3,function_type:"none",name:"disposable_battery",size:2},5:{divider:1e3,function_type:"none",
name:"solar_harvesting",size:2},6:{divider:1e3,function_type:"none",name:"TIC_harvesting",size:2}}}};function v(e){
var a="";var t=e.toString(2);a+=d(t,8);return a}function p(e,a,t){var r=0;var o=0;switch(t){case 8:case 24:case 32:
case 40:case 48:o=1;break;case 9:case 25:case 33:case 41:o=2;break;case 10:case 26:case 34:case 42:o=3;break;case 11:
case 27:case 35:case 43:o=4;break;case 12:o=5;break;case 13:case 37:o=6;break;case 57:
return i(256*e[a]*256*256+256*e[a+1]*256+256*e[a+2]+e[a+3]);default:throw new Error("Unsupported number type: "+t)}
var s=0;for(;s<o;s++){r=r<<8|e[a+s]}return t>=40&&t<=43?n(r,o):r}function f(e,a,t,r,o,s,d,l,c){var v={reportCauses:[],
causesMessages:[]};138===e&&v.causesMessages.push("alarm triggered");var p=o;if(p>=r.length){return v}var f=!1
;var _=3&(r[o]>>=4);if(2==_){f=!0}else if(1!=_){
throw new Error("Alarm decoding: Unexpected cause type. (ReportParams byte = ".concat(r[o],")"))}p++;if(p>=r.length){
v.causesMessages.push("cause:{}");return v}var m="FieldUndef !";function g(e,a,t){r.length;var o=0;var s=0
;for(;s<a;s++){o=o<<8|r[p++]}if("int"===e){o=n(o,a)}else{if("float"!==e){
throw new Error("Alarm decoding: Unknown type kind: "+e)}if(4!==a){
throw new Error("Alarm decoding: Invalid float size. Only 4 bytes are supported.")}o=i(o)}return o/t}while(p<r.length){
var h={};if(p>=r.length){throw new Error("Alarm decoding: Unexpected end of data before reading CSD.")}var y=r[p++]
;h.criterionIndex=7&y;var b=y>>3&3;h.mode=1===b?"delta":2===b?"threshold":"unused";h.hasFallen=!!(32&y)
;h.hasExceeded=!!(64&y);h.isAlarm=!!(128&y)
;var z=h.hasExceeded&&h.hasFallen?"exceed&fall":h.hasExceeded?"exceed":h.hasFallen?"fall":""
;var w=void 0,S=void 0,x=void 0,N=void 0,O=void 0,I=void 0;var P=null;if(f){if(p>=r.length){
throw new Error("Alarm decoding: Unexpected end of data before reading FI.")}var U=s;var T=d;var C=l;h.fieldIndex=0
;if(null!=c&&!0===c){P=r[p++];h.fieldIndex=P;if(u[a]&&u[a][t]&&u[a][t][P]){var M=u[a][t][P];U=M.function_type||s
;T=M.size||d;C=M.divider||l;I=M.name||m}}w=g(U,T,C);"threshold"===h.mode&&(S=g(U,T,C))}if("threshold"===h.mode&&f){
if(p>=r.length){throw new Error("Alarm decoding: Unexpected end of data before reading Occ.")}var D=r[p++];x=D
;if(D>0&&128&D){if(p+3>=r.length){throw new Error("Alarm decoding: Invalid OccH or OccL read.")}N=r[p++]<<8|r[p++]
;O=r[p++]<<8|r[p++]}}v.reportCauses.push(h);var j=void 0;if(f){
j="threshold"===h.mode?void 0!==N?"cause:{alarm:".concat(h.isAlarm,", criterion_index: ").concat(h.criterionIndex,", mode: threshold, crossing: ").concat(z,", value: ").concat(w,", gap: ").concat(S,", occurences_up: ").concat(N,", occurences_down: ").concat(O):"cause:{alarm:".concat(h.isAlarm,", criterion_index: ").concat(h.criterionIndex,", mode: threshold, crossing: ").concat(z,", value: ").concat(w,", gap: ").concat(S,", occurences: ").concat(x):"cause:{alarm:".concat(h.isAlarm,", criterion_index: ").concat(h.criterionIndex,", mode: delta, value: ").concat(w)
;I&&(j+=", field: ".concat(I));j+="}"}else{
j="cause:{alarm:".concat(h.isAlarm,", criterion_index: ").concat(h.criterionIndex,", mode: ").concat(h.mode)
;"threshold"===h.mode&&(j+=", crossing: ".concat(z));j+="}"}v.causesMessages.push(j)}if(p!==r.length){
throw new Error("Alarm decoding: Remaining unprocessed bytes detected. Expected ".concat(r.length,", but stopped at ").concat(p,"."))
}return v}function _(e,a,t,r,n,i,o,s,d,l){if(138===e||10==e){var u=c[o];var v=d;var p=u.size;var _=u.name
;void 0===v&&(v="single"===_?"float":"int8"===_||"int16"===_||"int32"===_?"int":"none");var m=f(e,a,t,r,i,v,p,s,l)
;n.zclheader.alarmmsg=m.causesMessages}}function m(e,a){
var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;var r={};var d=0;r.lora={};r.lora.port=a
;var u=e.length;var f="";r.lora.payload="";var m=0;for(;m<u;m++){f=e[m].toString(16).toUpperCase()
;1===f.length&&(f="0"+f);r.lora.payload+=f;var g=new Date;r.lora.date=g.toISOString()}if(125===a){var h=!(1&e[0])
;if(!1===h){r.zclheader={};r.zclheader.report="standard";var y=-1;var b=-1;var z=-1
;r.zclheader.endpoint=(224&e[0])>>5|(6&e[0])<<2;b=e[1];r.zclheader.cmdID=s(b,2);z=256*e[2]+e[3]
;r.zclheader.clustID=s(z,4);if(10===b||138===b||1===b){d=1;r.data={};y=256*e[4]+e[5];r.zclheader.attID=s(y,4);var w=e[4]
;var S=0;10!==b&&138!==b||(S=7);138===b&&(r.zclheader.alarm=1);if(1===b){S=8;r.zclheader.status=e[6]}
if(83===z||84===z||85===z||86===z||87===z){if("function"!=typeof t){throw new l("TIC_Decode function not found")}
r.data=t(z,y,e.slice(S+1))}if(0===z&&2===y){r.data.firmware="";var x=0;for(;x<3;x++){r.data.firmware+=String(e[S+x])
;x<2&&(r.data.firmware+=".")}var N=256*e[S+3]*256+256*e[S+4]+e[S+5];r.data.firmware+="."+N.toString()}if(0===z&&3===y){
var O=e[S];r.data.kernel="";var I=0;for(;I<O;I++){r.data.kernel+=String.fromCharCode(e[S+1+I])}}if(0===z&&4===y){
var P=e[S];r.data.manufacturer="";var U=0;for(;U<P;U++){r.data.manufacturer+=String.fromCharCode(e[S+1+U])}}
if(0===z&&5===y){var T=e[S];r.data.model="";var C=0;for(;C<T;C++){r.data.model+=String.fromCharCode(e[S+1+C])}}
if(0===z&&6===y){var M=e[S];r.data.date="";var D=0;for(;D<M;D++){r.data.date+=String.fromCharCode(e[S+1+D])}}
if(0===z&&16===y){var j=e[S];r.data.position="";var k=0;for(;k<j;k++){r.data.position+=String.fromCharCode(e[S+1+k])}}
if(0===z&&32769===y){var E=e[S];r.data.application_name="";var A=0;for(;A<E;A++){
r.data.application_name+=String.fromCharCode(e[S+1+A])}}if(1026===z&&0===y){var F=e[S-1]
;r.data.temperature=n(256*e[S]+e[S+1],2)/100;var q=S+2;_(b,z,y,e,r,q,F,100,"int")}
1026===z&&1===y&&(r.data.min_temperature=n(256*e[S]+e[S+1],2)/100)
;1026===z&&2===y&&(r.data.max_temperature=n(256*e[S]+e[S+1],2)/100);if(1029===z&&0===y){var H=e[S-1]
;r.data.humidity=(256*e[S]+e[S+1])/100;var V=S+2;_(b,z,y,e,r,V,H,100,"none")}
1029===z&&1===y&&(r.data.min_humidity=(256*e[S]+e[S+1])/100)
;1029===z&&2===y&&(r.data.max_humidity=(256*e[S]+e[S+1])/100);if(15===z&&1026===y){var R=e[S-1]
;r.data.index=256*e[S]*256*256+256*e[S+1]*256+256*e[S+2]+e[S+3];var B=S+4;_(b,z,y,e,r,B,R,1,"none")}if(15===z&&85===y){
var G=e[S-1];r.data.pin_state=!!e[S];var Y=S+1;_(b,z,y,e,r,Y,G,1,"none")}if(15===z&&84===y){
0===e[S]&&(r.data.polarity="normal");1===e[S]&&(r.data.polarity="reverse")}if(15===z&&1024===y){
0===e[S]&&(r.data.edge_selection="none");1===e[S]&&(r.data.edge_selection="falling edge")
;2===e[S]&&(r.data.edge_selection="rising edge");3===e[S]&&(r.data.edge_selection="both edges")
;5===e[S]&&(r.data.edge_selection="polling and falling edge")
;6===e[S]&&(r.data.edge_selection="polling and rising edge");7===e[S]&&(r.data.edge_selection="polling and both edges")}
15===z&&1025===y&&(r.data.debounce_period=e[S]);15===z&&1027===y&&(r.data.poll_period=e[S])
;15===z&&1028===y&&(r.data.force_notify=e[S]);if(19===z&&85===y){var K=e[S-1];r.data.output_value=e[S];var L=S+1
;_(b,z,y,e,r,L,K,1,"none")}if(6===z&&0===y){var X=e[S];r.data.output=1===X?"ON":"OFF"}if(32776===z&&0===y){var Z=e[S-1]
;r.data.differential_pressure=256*e[S]+e[S+1];var Q=S+2;_(b,z,y,e,r,Q,Z,1,"none")}if(32773===z&&0===y){var W=e[S-1]
;r.data.pin_state_1=!(1&~e[S+1]);r.data.pin_state_2=!(2&~e[S+1]);r.data.pin_state_3=!(4&~e[S+1])
;r.data.pin_state_4=!(8&~e[S+1]);r.data.pin_state_5=!(16&~e[S+1]);r.data.pin_state_6=!(32&~e[S+1])
;r.data.pin_state_7=!(64&~e[S+1]);r.data.pin_state_8=!(128&~e[S+1]);r.data.pin_state_9=!(1&~e[S])
;r.data.pin_state_10=!(2&~e[S]);var $=S+2;_(b,z,y,e,r,$,W,100,"none")}
32774===z&&0===y&&(r.data.speed=256*e[S]*256+256*e[S+1]+e[S+2]);32774===z&&1===y&&(r.data.data_bit=e[S])
;32774===z&&2===y&&(r.data.parity=e[S]);32774===z&&3===y&&(r.data.stop_bit=e[S]);if(12===z&&85===y){var J=e[S-1]
;r.data.analog=i(256*e[S]*256*256+256*e[S+1]*256+256*e[S+2]+e[S+3]);var ee=S+4;_(b,z,y,e,r,ee,J,1,"float")}
if(12===z&&256===y){5===e[S+1]&&(r.data.type="ppm");255===e[S+1]&&0===e[S+3]&&(r.data.type="mA")
;255===e[S+1]&&1===e[S+3]&&(r.data.type="mV")}12===z&&32771===y&&(r.data.power_duration=256*e[S]+e[S+1])
;if(12===z&&32772===y){var ae={};var te=v(e[S]);var re=v(e[S+1]);var ne=2*te[0]+te[1];0===ne&&(ae.mode="idle")
;1===ne&&(ae.mode="chock");2===ne&&(ae.mode="click");var ie=8*te[2]+4*te[3]+2*te[4]+te[5];0===ie&&(ae.frequency="idle")
;1===ie&&(ae.frequency="1Hz");2===ie&&(ae.frequency="10Hz");3===ie&&(ae.frequency="25Hz");4===ie&&(ae.frequency="50Hz")
;5===ie&&(ae.frequency="100Hz");6===ie&&(ae.frequency="200Hz");7===ie&&(ae.frequency="400Hz")
;8===ie&&(ae.frequency="1620Hz");9===ie&&(ae.frequency="5376Hz");ae.range={};var oe=2*te[6]+te[7];if(0===oe){
ae.range.precision="+/- 2g";ae.range.value=16}if(1===oe){ae.range.precision="+/- 4g";ae.range.value=32}if(2===oe){
ae.range.precision="+/- 8g";ae.range.value=64}if(3===oe){ae.range.precision="+/- 16g";ae.range.value=128}
var se=128*re[0]+64*re[1]+32*re[2]+16*re[3]+8*re[4]+4*re[5]+2*re[6]+re[7];ae.threshold=se*ae.range.value}
if(32782===z&&0===y){var de=e[S-1];r.data.number=p(e,S,de);var le=S+Math.ceil(c[de].size);_(b,z,y,e,r,le,de,1,"none")}
if(32775===z&&1===y){r.data.modbus_payload="";var ce=e[S];var ue=0;for(;ue<ce;ue++){
f=e[S+ue+1].toString(16).toUpperCase();1===f.length&&(f="0"+f)
;0===ue?r.data.modbus_slaveID=e[S+ue+1]:1===ue?r.data.modbus_fnctID=e[S+ue+1]:2===ue?r.data.modbus_datasize=e[S+ue+1]:r.data.modbus_payload+=f
}}if(32777===z&&0===y){var ve=e[S+2]<<8|e[S+3];r.data.modbus_frame_series_sent=e[S+1]
;r.data.modbus_frame_number_in_serie=(57344&ve)>>13;r.data.modbus_last_frame_of_serie=(7168&ve)>>10;var pe=0
;for(;pe<=9;pe++){r.data["modbus_EP".concat(pe)]=!!(ve&1<<pe)}function fa(e,a,t,r,n,i){if(!0===e){if(0===t){
n.data["modbus_slaveID_EP".concat(i)]=r[a];n.data["modbus_fnctID_EP".concat(i)]=r[a+1]
;n.data["modbus_datasize_EP".concat(i)]=r[a+2];a+=3}n.data["modbus_payload_EP".concat(i)]="";if(void 0===r[a]){return n}
var o="modbus_datasize_EP".concat(i);var s=n.data[o];var d=0;for(;d<s;d++){var l=r[a+d].toString(16).toUpperCase()
;1===l.length&&(l="0"+l);n.data["modbus_payload_EP".concat(i)]+=l}a+=s}return a}var fe=S+4;var _e=0;var me=0
;for(;me<=9;me++){fe=fa(r.data["modbus_EP".concat(me)],fe,_e,e,r,me)}}if(82===z&&0===y){
r.data.active_energy=n(256*e[S+1]*256+256*e[S+2]+e[S+3],3);r.data.reactive_energy=n(256*e[S+4]*256+256*e[S+5]+e[S+6],3)
;r.data.nb_samples=256*e[S+7]+e[S+8];r.data.active_power=n(256*e[S+9]+e[S+10],2)
;r.data.reactive_power=n(256*e[S+11]+e[S+12],2)}if(32772===z&&0===y){1===e[S]&&(r.data.message_type="confirmed")
;0===e[S]&&(r.data.message_type="unconfirmed")}32772===z&&1===y&&(r.data.nb_retry=e[S]);if(32772===z&&2===y){
r.data.automatic_association={};r.data.automatic_association.period_in_minutes=256*e[S+1]+e[S+2]
;r.data.automatic_association.nb_err_frames=256*e[S+3]+e[S+4]}32772===z&&3===y&&(r.data.data_rate=e[S+2])
;if(32772===z&&4===y){r.data.ABP_dev_address="";var ge=0;for(;ge<4;ge++){r.data.ABP_dev_address+=String(e[S+1+ge])
;ge<3&&(r.data.ABP_dev_address+=".")}}if(32772===z&&5===y){r.data.OTA_app_EUI="";var he=0;for(;he<8;he++){
r.data.OTA_app_EUI+=String(e[S+1+he]);he<7&&(r.data.OTA_app_EUI+=".")}}if(80===z&&4===y){e[S],e[S+1];var ye={}
;var be=e[S+2];var ze=0;for(;ze<be;ze++){var we={};we.endpoint=e[S+3+7*ze];var Se=e[S+4+7*ze];we.input_clusters=[]
;var xe=0;for(;xe<Se;xe++){we.input_clusters[xe]=s(256*e[S+5+7*ze+2*xe]+e[S+6+7*ze+2*xe],4)}var Ne=e[S+5+7*ze+2*Se]
;we.output_clusters=[];var Oe=0;for(;Oe<Ne;Oe++){we.output_clusters[Oe]=s(256*e[S+6+7*ze+2*Oe]+e[S+7+7*ze+2*Oe],4)}
ye[ze]=we}r.data.configuration=ye}if(80===z&&6===y){var Ie=S+3;var Pe=e[S-1];if(!(1&~e[S+2])){
r.data.main_or_external_voltage=(256*e[Ie]+e[Ie+1])/1e3;Ie+=2}if(!(2&~e[S+2])){
r.data.rechargeable_battery_voltage=(256*e[Ie]+e[Ie+1])/1e3;Ie+=2}if(!(4&~e[S+2])){
r.data.disposable_battery_voltage=(256*e[Ie]+e[Ie+1])/1e3;Ie+=2}if(!(8&~e[S+2])){
r.data.solar_harvesting_voltage=(256*e[Ie]+e[Ie+1])/1e3;Ie+=2}if(!(16&~e[S+2])){
r.data.tic_harvesting_voltage=(256*e[Ie]+e[Ie+1])/1e3;Ie+=2}var Ue=Ie+1;_(b,z,y,e,r,Ue,Pe,1e3,"multistate",!0)}
if(80===z&&255===w){var Te=e[5];var Ce="action "+Te.toString();r.data[Ce]="";var Me=e[S+1];var De="none";var je=0
;for(;je<Me;je++){De+=String.fromCharCode(e[S+1+je])}r.data[Ce]=De}if(32778===z&&0===y){var ke=S;var Ee=e[ke-1]
;r.data.positive_active_energy=n(256*e[ke+1]*256*256+256*e[ke+2]*256+256*e[ke+3]+e[ke+4],4);ke+=4
;r.data.negative_active_energy=n(256*e[ke+1]*256*256+256*e[ke+2]*256+256*e[ke+3]+e[ke+4],4);ke+=4
;r.data.positive_reactive_energy=n(256*e[ke+1]*256*256+256*e[ke+2]*256+256*e[ke+3]+e[ke+4],4);ke+=4
;r.data.negative_reactive_energy=n(256*e[ke+1]*256*256+256*e[ke+2]*256+256*e[ke+3]+e[ke+4],4);ke+=4
;r.data.positive_active_power=n(256*e[ke+1]*256*256+256*e[ke+2]*256+256*e[ke+3]+e[ke+4],4);ke+=4
;r.data.negative_active_power=n(256*e[ke+1]*256*256+256*e[ke+2]*256+256*e[ke+3]+e[ke+4],4);ke+=4
;r.data.positive_reactive_power=n(256*e[ke+1]*256*256+256*e[ke+2]*256+256*e[ke+3]+e[ke+4],4);ke+=4
;r.data.negative_reactive_power=n(256*e[ke+1]*256*256+256*e[ke+2]*256+256*e[ke+3]+e[ke+4],4);var Ae=ke+5
;_(b,z,y,e,r,Ae,Ee,1,"multistate",!0)}if(32784===z&&0===y){var Fe=e[S-1]
;r.data.active_energy_a=n(256*e[S+1]*256*256+256*e[S+2]*256+256*e[S+3]+e[S+4])
;r.data.reactive_energy_a=n(256*e[S+5]*256*256+256*e[S+6]*256+256*e[S+7]+e[S+8])
;r.data.active_energy_b=n(256*e[S+9]*256*256+256*e[S+10]*256+256*e[S+11]+e[S+12])
;r.data.reactive_energy_b=n(256*e[S+13]*256*256+256*e[S+14]*256+256*e[S+15]+e[S+16])
;r.data.active_energy_c=n(256*e[S+17]*256*256+256*e[S+18]*256+256*e[S+19]+e[S+20])
;r.data.reactive_energy_c=n(256*e[S+21]*256*256+256*e[S+22]*256+256*e[S+23]+e[S+24])
;r.data.active_energy_abc=n(256*e[S+25]*256*256+256*e[S+26]*256+256*e[S+27]+e[S+28])
;r.data.reactive_energy_abc=n(256*e[S+29]*256*256+256*e[S+30]*256+256*e[S+31]+e[S+32]);var qe=S+33
;_(b,z,y,e,r,qe,Fe,1,"multistate",!0)}else if(32784===z&&1===y){var He=e[S-1]
;r.data.active_power_a=n(256*e[S+1]*256*256+256*e[S+2]*256+256*e[S+3]+e[S+4])
;r.data.reactive_power_a=n(256*e[S+5]*256*256+256*e[S+6]*256+256*e[S+7]+e[S+8])
;r.data.active_power_b=n(256*e[S+9]*256*256+256*e[S+10]*256+256*e[S+11]+e[S+12])
;r.data.reactive_power_b=n(256*e[S+13]*256*256+256*e[S+14]*256+256*e[S+15]+e[S+16])
;r.data.active_power_c=n(256*e[S+17]*256*256+256*e[S+18]*256+256*e[S+19]+e[S+20])
;r.data.reactive_power_c=n(256*e[S+21]*256*256+256*e[S+22]*256+256*e[S+23]+e[S+24])
;r.data.active_power_abc=n(256*e[S+25]*256*256+256*e[S+26]*256+256*e[S+27]+e[S+28])
;r.data.reactive_power_abc=n(256*e[S+29]*256*256+256*e[S+30]*256+256*e[S+31]+e[S+32]);var Ve=S+33
;_(b,z,y,e,r,Ve,He,1,"multistate",!0)}if(32779===z&&0===y){var Re=S;var Be=e[Re-1]
;r.data.Vrms=n(256*e[Re+1]+e[Re+2],2)/10;Re+=2;r.data.Irms=n(256*e[Re+1]+e[Re+2],2)/10;Re+=2
;r.data.angle=n(256*e[Re+1]+e[Re+2],2);var Ge=Re+3;_(b,z,y,e,r,Ge,Be,1,"multistate",!0)}if(32781===z&&0===y){
var Ye=e[S-1];r.data.Vrms_a=n(256*e[S+1]+e[S+2],2)/10;r.data.Irms_a=n(256*e[S+3]+e[S+4],2)/10
;r.data.angle_a=n(256*e[S+5]+e[S+6],2);r.data.Vrms_b=n(256*e[S+7]+e[S+8],2)/10;r.data.Irms_b=n(256*e[S+9]+e[S+10],2)/10
;r.data.angle_b=n(256*e[S+11]+e[S+12],2);r.data.Vrms_c=n(256*e[S+13]+e[S+14],2)/10
;r.data.Irms_c=n(256*e[S+15]+e[S+16],2)/10;r.data.angle_c=n(256*e[S+17]+e[S+18],2);var Ke=S+19
;_(b,z,y,e,r,Ke,Ye,1,"multistate",!0)}if(32780===z&&0===y){var Le=e[S-1];r.data.concentration=256*e[S]+e[S+1];var Xe=S+2
;_(b,z,y,e,r,Xe,Le,1,"none")}32780===z&&1===y&&(r.data.analog=e[S]);32780===z&&2===y&&(r.data.analog=e[S])
;if(1024===z&&0===y){var Ze=e[S-1];r.data.illuminance=256*e[S]+e[S+1];var Qe=S+2;_(b,z,y,e,r,Qe,Ze,1,"none")}
if(1027===z&&0===y){var We=e[S-1];r.data.pressure=n(256*e[S]+e[S+1],2);var $e=S+2;_(b,z,y,e,r,$e,We,1,"int")}
if(1030===z&&0===y){var Je=e[S-1];r.data.occupancy=!!e[S];var ea=S+1;_(b,z,y,e,r,ea,Je,1,"none")}if(32850===z&&0===y){
var aa=S;r.data.frequency=(n(256*e[aa+1]+e[aa+2],2)+22232)/1e3;aa+=2
;r.data.frequency_min=(n(256*e[aa+1]+e[aa+2],2)+22232)/1e3;aa+=2
;r.data.frequency_max=(n(256*e[aa+1]+e[aa+2],2)+22232)/1e3;aa+=2;r.data.Vrms=n(256*e[aa+1]+e[aa+2],2)/10;aa+=2
;r.data.Vrms_min=n(256*e[aa+1]+e[aa+2],2)/10;aa+=2;r.data.Vrms_max=n(256*e[aa+1]+e[aa+2],2)/10;aa+=2
;r.data.Vpeak=n(256*e[aa+1]+e[aa+2],2)/10;aa+=2;r.data.Vpeak_min=n(256*e[aa+1]+e[aa+2],2)/10;aa+=2
;r.data.Vpeak_max=n(256*e[aa+1]+e[aa+2],2)/10;aa+=2;r.data.over_voltage=n(256*e[aa+1]+e[aa+2],2);aa+=2
;r.data.sag_voltage=n(256*e[aa+1]+e[aa+2],2);aa+=2;r.data.brownout_number=n(256*e[aa+1]+e[aa+2],2)}if(32783===z){
var ta=S+1;if(0===y){var ra=r.data.last={};ra.NbTriggedAcq=o(e,ta,"U32");ta+=4;ra.Mean_X_G=o(e,ta,"U16")/100;ta+=2
;ra.Max_X_G=o(e,ta,"U16")/100;ta+=2;ra.Dt_X_ms=o(e,ta,"U16");ta+=2;ra.Mean_Y_G=o(e,ta,"U16")/100;ta+=2
;ra.Max_Y_G=o(e,ta,"U16")/100;ta+=2;ra.Dt_Y_ms=o(e,ta,"U16");ta+=2;ra.Mean_Z_G=o(e,ta,"U16")/100;ta+=2
;ra.Max_Z_G=o(e,ta,"U16")/100;ta+=2;ra.Dt_Z_ms=o(e,ta,"U16")}else if(1===y||2===y||3===y){
var na=1===y?"Stats_X":2===y?"Stats_Y":"Stats_Z";var ia=r.data[na]={};ia.NbAcq=o(e,ta,"U16");ta+=2
;ia.MinMean_G=o(e,ta,"U16")/100;ta+=2;ia.MinMax_G=o(e,ta,"U16")/100;ta+=2;ia.MinDt=o(e,ta,"U16");ta+=2
;ia.MeanMean_G=o(e,ta,"U16")/100;ta+=2;ia.MeanMax_G=o(e,ta,"U16")/100;ta+=2;ia.MeanDt=o(e,ta,"U16");ta+=2
;ia.MaxMean_G=o(e,ta,"U16")/100;ta+=2;ia.MaxMax_G=o(e,ta,"U16")/100;ta+=2;ia.MaxDt=o(e,ta,"U16");ta+=2
}else if(32768===y){var oa=r.data.params={};oa.WaitFreq_Hz=o(e,ta,"U16")/10;ta+=2;oa.AcqFreq_Hz=o(e,ta,"U16")/10;ta+=2
;var sa=o(e,ta,"U16");ta+=2;32768&sa&&(sa=60*(-32769&sa));oa.NewWaitDelay_s=32768&sa?sa=60*(-32769&sa):sa
;oa.MaxAcqDuration_ms=o(e,ta,"U16");ta+=2;oa.Threshold_X_G=o(e,ta,"U16")/100;ta+=2;oa.Threshold_Y_G=o(e,ta,"U16")/100
;ta+=2;oa.Threshold_Z_G=o(e,ta,"U16")/100;ta+=2;oa.OverThrsh_Dt_ms=o(e,ta,"U16");ta+=2;oa.UnderThrsh_Dt_ms=o(e,ta,"U16")
;ta+=2;oa.Range_G=o(e,ta,"U16")/100;ta+=2;oa.FilterSmoothCoef=o(e,ta,"U8");ta+=1;oa.FilterGainCoef=o(e,ta,"U8");ta+=1
;oa=r.data.Params.working_modes={};oa.SignalEachAcq=128&e[ta]?"true":"false";oa.RstAftStdRpt_X=1&e[ta]?"true":"false"
;oa.RstAftStdRpt_Y=2&e[ta]?"true":"false";oa.RstAftStdRpt_7=4&e[ta]?"true":"false"}}var da=Object.keys(r.data)[0]
;if(void 0===r.data[da]){throw new l("bad payload1")}if(e.length<=7){throw new l("bad payload2")}}if(7===b){d=1
;y=256*e[6]+e[7];r.zclheader.attID=s(y,4);r.zclheader.status=e[4];r.zclheader.report_parameters={};var la=v(e[5])
;r.zclheader.report_parameters.new_mode_configuration=la[0]
;"0"===la[2]&&"0"===la[3]&&(r.zclheader.report_parameters.cause_request="none")
;"0"===la[2]&&"1"===la[3]&&(r.zclheader.report_parameters.cause_request="short")
;"1"===la[2]&&"0"===la[3]&&(r.zclheader.report_parameters.cause_request="long")
;"1"===la[2]&&"1"===la[3]&&(r.zclheader.report_parameters.cause_request="reserved")
;r.zclheader.report_parameters.secured_if_alarm=la[4];r.zclheader.report_parameters.secured=la[5]
;r.zclheader.report_parameters.no_hearde_port=la[6];r.zclheader.report_parameters.batch=la[7]}if(9===b){d=1
;y=256*e[6]+e[7];r.zclheader.attID=s(y,4);r.zclheader.status=e[4];r.zclheader.report_parameters={};var ca=v(e[5])
;r.zclheader.report_parameters.new_mode_configuration=ca[0]
;"0"===ca[2]&&"0"===ca[3]&&(r.zclheader.report_parameters.cause_request="none")
;"0"===ca[2]&&"1"===ca[3]&&(r.zclheader.report_parameters.cause_request="short")
;"1"===ca[2]&&"0"===ca[3]&&(r.zclheader.report_parameters.cause_request="long")
;"1"===ca[2]&&"1"===ca[3]&&(r.zclheader.report_parameters.cause_request="reserved")
;r.zclheader.report_parameters.secured_if_alarm=ca[4];r.zclheader.report_parameters.secured=ca[5]
;r.zclheader.report_parameters.no_hearde_port=ca[6];r.zclheader.report_parameters.batch=ca[7]
;r.zclheader.attribut_type=e[8];r.zclheader.min={};if(128&~e[9]){r.zclheader.min.value=256*e[9]+e[10]
;r.zclheader.min.unit="seconds"}else{r.zclheader.min.value=256*(e[9]-128)+e[10];r.zclheader.min.unit="minutes"}
r.zclheader.max={};if(128&~e[11]){r.zclheader.max.value=256*e[11]+e[12];r.zclheader.max.unit="seconds"}else{
r.zclheader.max.value=256*(e[11]-128)+e[12];r.zclheader.max.unit="minutes"}r.lora.payload="";if(80===z&&6===y){
var ua=e[13];var va=ua/5;var pa=0;while(va>0){r.zclheader.modepower=e[14+5*pa];r.zclheader.powersource=e[15+5*pa]
;r.zclheader.delta=256*e[16+5*pa]+e[17+5*pa];r.zclheader.changedpowersource=e[18+5*pa];pa++;va--}}}if(0===d){
throw new l("bad payload3")}}else{r.batch={};r.batch.report="batch"}}return r}function g(e,a){
var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;var r=[];var n=e.bytes;var i=m(n,e.fPort,t)
;if(void 0!==i.zclheader){void 0!==i.zclheader.alarmmsg&&(r=i.zclheader.alarmmsg);if(7===n[1]){return{data:i.zclheader,
warning:r}}if(9===n[1]){return{data:i.zclheader,warning:r}}if(1===n[1]){if(void 0===i.zclheader.data){var o=[];var s=!0
;var d=0;while(s){var c=Object.keys(i.data)[d];if(void 0===c){s=!1;break}o.push({variable:c,value:i.data[c],
date:e.recvTime});d++}return{data:o,type:"standard",warning:r}}return{data:{
variable:"read reporting configuration response status",value:i.zclheader.data,date:e.recvTime},warning:r}}}
if(void 0!==i.zclheader){if(void 0!==a){var u=i.zclheader.endpoint;var v=!0;var p=0;var f=[];var _="";while(v){
var g=Object.keys(i.data)[p];if(void 0===g){v=!1;break}if(void 0===a[g]){f.push({variable:g,value:i.data[g],
date:e.recvTime})}else{_=a[g][u];"NA"===_?f.push({variable:_,value:"NA",date:e.recvTime}):f.push({variable:_,
value:i.data[g],date:e.recvTime})}p++}return{data:f,type:"standard",warning:r}}throw new l("bad decoding")}return{
type:i.batch.report,payload:i.lora.payload}}e.exports={normalisation_standard:g}},function(e){function a(e,a){
if(a<1||a>4){throw new Error("Unsupported Size")}
1===a&&(128&e)>0?e-=256:2===a&&(32768&e)>0?e-=65536:3===a&&(8388608&e)>0?e-=16777216:4===a&&(2147483648&e)>0&&(e-=4294967296)
;return e}function t(e){var a=e>>>0>>24&128?-1:1;var t=(e>>23&255)-127;var r=8388607&e;if(128===t){
return a*(r?Number.NaN:Number.POSITIVE_INFINITY)}if(-127===t){if(0===r){return 0}t=-126;r/=1<<23}else{
r=(r|1<<23)/(1<<23)}return a*r*Math.pow(2,t)}function r(e,a,t,r){void 0===r&&(r=!1);var n="U"!=t.substr(0,1)
;var i=parseInt(t.substr(1,2),10)/8;var o,s;var d=i;if(r){o=-1;s=a+i-1}else{o=1;s=a}var l=0;var c=s;for(;d>0;d--){c+=o
;l=(l<<8)+e[c]}n&&i<8&&128&e[s]&&(l-=1<<8*i);return l}function n(e,a){var t=e.toString(16).toUpperCase();a=null!=a?a:2
;while(t.length<a){t="0"+t}return"0x"+t}function i(e,a){var t=String(e);while(t.length<a){t="0"+t}return t}
function o(e){var a="";var t=0;for(;t<e.length;t++){var r=e[t].toString(16).toUpperCase();1===r.length&&(r="0"+r);a+=r}
return a}e.exports={UintToInt:a,Bytes2Float32:t,BytesToInt64:r,decimalToHex:n,zeroPad:i,BytesToHexStr:o}},function(e){
var a=0;var t=1;var r=2;var n=3;var i=4;var o=5;var s=6;var d=7;var l=8;var c=9;var u=10;var v=11;var p=12;var f=[]
;f[a]=0;f[t]=1;f[r]=4;f[n]=4;f[i]=8;f[o]=8;f[s]=16;f[d]=16;f[l]=24;f[c]=24;f[u]=32;f[v]=32;f[p]=32;var _=14;var m=16
;var g=[[{sz:2,lbl:0},{sz:2,lbl:1},{sz:2,lbl:3},{sz:3,lbl:5},{sz:4,lbl:9},{sz:5,lbl:17},{sz:6,lbl:33},{sz:7,lbl:65},{
sz:8,lbl:129},{sz:10,lbl:512},{sz:11,lbl:1026},{sz:11,lbl:1027},{sz:11,lbl:1028},{sz:11,lbl:1029},{sz:11,lbl:1030},{
sz:11,lbl:1031}],[{sz:7,lbl:111},{sz:5,lbl:26},{sz:4,lbl:12},{sz:3,lbl:3},{sz:3,lbl:7},{sz:2,lbl:2},{sz:2,lbl:0},{sz:3,
lbl:2},{sz:6,lbl:54},{sz:9,lbl:443},{sz:9,lbl:441},{sz:10,lbl:885},{sz:10,lbl:884},{sz:10,lbl:880},{sz:11,lbl:1763},{
sz:11,lbl:1762}],[{sz:4,lbl:9},{sz:3,lbl:5},{sz:2,lbl:0},{sz:2,lbl:1},{sz:2,lbl:3},{sz:5,lbl:17},{sz:6,lbl:33},{sz:7,
lbl:65},{sz:8,lbl:129},{sz:10,lbl:512},{sz:11,lbl:1026},{sz:11,lbl:1027},{sz:11,lbl:1028},{sz:11,lbl:1029},{sz:11,
lbl:1030},{sz:11,lbl:1031}]];Math.trunc=Math.trunc||function(e){return isNaN(e)?NaN:e>0?Math.floor(e):Math.ceil(e)}
;function h(e,a,t,r){var n=y();var o=b(z(t));var s=w(o.getNextSample(i));n.batch_counter=o.getNextSample(i,3)
;o.getNextSample(i,1);var d=S(n,o,a,s,e);var l=d.last_timestamp;var c=d.i1_of_the_first_sample
;s.hasSample&&(l=C(n,o,c,a,l,s,e));n.batch_relative_timestamp=O(o,l);return A(n,a,r)}function y(){var e=[],a=0
;while(a<m){e.push({codingType:0,codingTable:0,resolution:null,uncompressSamples:[]});a+=1}return{batch_counter:0,
batch_relative_timestamp:0,series:e}}function b(e){function a(e,a,t){var r=a;var n=t-1;if(8*e.length<r+t){
throw new Error("Batch : Verify that dest buf is large enough")}var i=0;var o=0;while(t>0){e[r>>3]&1<<(7&r)&&(o|=1<<n-i)
;t--;i++;r++}return o}return{i1:0,byteArray:e,getNextSample:function(e,a){var t=a||f[e];var r=this.i1;this.i1+=t
;if(e===p&&32!==t){throw new Error("Batch : Mauvais sampletype")}var i=0;var s=Math.trunc((t-1)/8)+1;var l=t%8
;0===l&&s>0&&(l=8);while(s>0){var u=0;while(l>0){var v=r>>3;this.byteArray[v]&1<<(7&r)&&(i|=1<<8*(s-1)+u);l--;u++;r+=1}
s--;l=8}if((e==n||e==o||e==d||e==c)&&i&1<<t-1){var _=t;for(;_<32;_++){i|=1<<_;t++}}return i},
getNextBifromHi:function(e){var t=2;for(;t<12;t++){var r=a(this.byteArray,this.i1,t);var n=0;for(;n<g[e].length;n++){
if(g[e][n].sz==t&&r==g[e][n].lbl){this.i1+=t;return n}}}throw new Error("Bi not found in HUFF table")}}}function z(e){
var a=[];while(e.length>=2){a.push(parseInt(e.substring(0,2),16));e=e.substring(2,e.length)}return a}function w(e){
var a=e.toString(2);while(a.length<8){a="0"+a}return{isCommonTimestamp:parseInt(a[a.length-2],2),
hasSample:!parseInt(a[a.length-3],2),batch_req:parseInt(a[a.length-4],2),nb_of_type_measure:parseInt(a.substring(0,4),2)
}}function S(e,a,t,r,n){var o=0;var s=0;var d=0;for(;d<r.nb_of_type_measure;d++){var l={size:n,lbl:a.getNextSample(i,n)}
;var c=N(t,l);0===d&&(s=c);o=O(a,o);e.series[c]=x(a,t[c].sampletype,l.lbl,o);if(r.hasSample){
e.series[c].codingType=a.getNextSample(i,2);e.series[c].codingTable=a.getNextSample(i,2)}}return{last_timestamp:o,
i1_of_the_first_sample:s}}function x(e,a,t,r){return{uncompressSamples:[{data_relative_timestamp:r,data:{value:U(e,a),
label:t}}],codingType:0,codingTable:0,resolution:null}}function N(e,a){var t=0;for(;t<e.length;t++){
if(e[t].taglbl===a.lbl){return t}}throw new Error("Batch : Cannot find i1 in argList")}function O(e,a){if(a){
var t=e.getNextBifromHi(1);return I(e,a,t)}return e.getNextSample(u)}function I(e,a,t){
return t>_?e.getNextSample(u):t>0?P(e,a,t):a}function P(e,a,t){return e.getNextSample(u,t)+a+Math.pow(2,t)-1}
function U(e,a){var t=e.getNextSample(a);return a===p?T(t):t}function T(e){
var a=e>>>0>>24&128?-1:1,t=(e>>23&255)-127,r=8388607&e;if(128===t){return a*(r?Number.NaN:Number.POSITIVE_INFINITY)}
if(-127===t){if(0===r){return 0*a}t=-126;r/=1<<22}else{r=(r|1<<23)/(1<<23)}return a*r*Math.pow(2,t)}
function C(e,a,t,r,n,i,o){return i.isCommonTimestamp?M(e,a,t,r,i,o):E(e,a,r,n,i,o)}function M(e,a,t,r,n,o){
var s=a.getNextSample(i,8);var d={};var l=D(e,a,s,t);var c=l.timestampCommon;var u=l.lastTimestamp;var v=0
;for(;v<n.nb_of_type_measure;v++){var p=1;d.lbl=a.getNextSample(i,o);var f=N(r,d);var m=0;for(;m<s;m++){
var g=a.getNextSample(i,1);if(g){var h=a.getNextBifromHi(e.series[f].codingTable);var y={data_relative_timestamp:0,
data:{}};if(h<=_){var b=e.series[f].uncompressSamples[e.series[f].uncompressSamples.length-1].data.value;if(h>0){
y.data.value=j(a,b,e.series[f].codingType,r[f].resol,h)}else{if(p){p=0;continue}y.data.value=b}}else{
y.data.value=a.getNextSample(r[f].sampletype)}y.data_relative_timestamp=c[m];e.series[f].uncompressSamples.push(y)}}}
return u}function D(e,a,t,r){var n=[];var o=0;var s=a.getNextSample(i,2);var d=0;for(;d<t;d++){
var l=a.getNextBifromHi(s);if(l<=_){if(0===d){n.push(e.series[r].uncompressSamples[0].data_relative_timestamp)}else{
var c=n[d-1];l>0?n.push(a.getNextSample(u,l)+c+Math.pow(2,l)-1):n.push(c)}}else{n.push(a.getNextSample(u))}o=n[d]}
return{timestampCommon:n,lastTimestamp:o}}function j(e,a,t,r,n){var i=e.getNextSample(s,n)
;return 0===t?k(i,r,a,n):1===t?(i+Math.pow(2,n)-1)*r+a:a-(i+(Math.pow(2,n)-1))*r}function k(e,a,t,r){
return e>=Math.pow(2,r-1)?e*a+t:(e+1-Math.pow(2,r))*a+t}function E(e,a,t,r,n,o){var s={};var d=0
;for(;d<n.nb_of_type_measure;d++){s.lbl=a.getNextSample(i,o);var l=N(t,s);var c=a.getNextSample(i,8);if(c){
var u=a.getNextSample(i,2);var v=0;for(;v<c;v++){
var p=e.series[l].uncompressSamples[e.series[l].uncompressSamples.length-1].data_relative_timestamp;var f={
data_relative_timestamp:0,data:{}};var m=a.getNextBifromHi(u);f.data_relative_timestamp=I(a,p,m)
;f.data_relative_timestamp>r&&(r=f.data_relative_timestamp);m=a.getNextBifromHi(e.series[l].codingTable);if(m<=_){
var g=e.series[l].uncompressSamples[e.series[l].uncompressSamples.length-1].data.value
;f.data.value=m>0?j(a,g,e.series[l].codingType,t[l].resol,m):g}else{f.data.value=a.getNextSample(t[l].sampletype)}
e.series[l].uncompressSamples.push(f)}}}return r}function A(e,a,t){var r={batch_counter:e.batch_counter,
batch_relative_timestamp:e.batch_relative_timestamp};t&&(r.batch_absolute_timestamp=t)
;r.dataset=e.series.reduce(function(r,n,i){return r.concat(n.uncompressSamples.map(function(r){var n={
data_relative_timestamp:r.data_relative_timestamp,data:{value:a[i].divide?r.data.value/a[i].divide:r.data.value,
label:a[i].taglbl}};a[i].lblname&&(n.data.label_name=a[i].lblname)
;t&&(n.data_absolute_timestamp=F(t,e.batch_relative_timestamp,r.data_relative_timestamp));return n}))},[]);return r}
function F(e,a,t){return new Date(new Date(e).getTime()-1e3*(a-t)).toISOString()}function q(e){var a=e.date
;var t=h(e.batch1,e.batch2,e.payload,a);var r=[];var n=0;for(;n<t.dataset.length;n++){var i=t.dataset[n];var o={
variable:i.data.label_name,value:i.data.value,date:i.data_absolute_timestamp};r.push(o)}return{
batch_counter:t.batch_counter,samples:r}}e.exports={normalisation_batch:q}},function(e){var a={
disposable_battery_voltage:"V",illuminance:"lx",temperature_1:"Cel",temperature_2:"Cel",pressure:"hPa",humidity_1:"%RH",
humidity_2:"%RH",CO2:"ppm"};e.exports=a},function(e){function a(){return arguments[0]}function t(e,a){var t={fPort:125,
bytes:[],warnings:[]};if(!a||!a.data||0===Object.keys(a.data).length){t.errors=["Invalid or empty data object"];return t
}try{var r=e&&e.dlFrames?e.dlFrames:{};r.sendHexFrame="<sendHexFrame>"
;r.sendConfirmedMode="11058004000008<U8:sendConfirmedMode>";r.sendReboot="1150005000";r.sendFactoryReset="1150005007"
;r.sendLoraRetries="11058004000120<U8:sendLoraRetries>";r.sendLoraRejoin="1150800400<U16:sendLoraRejoin>";var n=null
;var i;for(i in a.data){if(r[i]){n=i;break}}if(!n){
t.errors=["Unknown command. No matching command found in downlink frames"];return t}if("sendHexFrame"===n){
var o=a.data.sendHexFrame;if("string"!=typeof o){t.errors=["sendHexFrame must be a string"];return t}
if(o.includes(":")){var s=o.split(":");if(2!==s.length){
t.errors=["Invalid sendHexFrame format. Use 'hexdata:port' format"];return t}o=s[0];var d=parseInt(s[1],10)
;if(isNaN(d)||d<1||d>223){t.errors=["Port number must be between 1 and 223"];return t}t.fPort=d}
if(!/^[0-9A-Fa-f]+$/.test(o)){t.errors=["sendHexFrame must be a valid hexadecimal string"];return t}
if("string"!=typeof o||!/^[0-9A-Fa-f]+$/.test(o)){t.errors=["sendHexFrame must be a valid hexadecimal string"];return t}
o.length%2!=0&&t.warnings.push("Odd number of hex characters in sendHexFrame");var l=0;for(;l<o.length;l+=2){
if(l+1>=o.length){break}var c=parseInt(o.substr(l,2),16);t.bytes.push(c)}return t}var u=r[n]
;var v=/<([^:>]+)?:?([^>]+)>/g;var p=[];var f;while(null!==(f=v.exec(u))){var _=f[1]||null;var m=f[2];p.push({type:_,
name:m})}var g=0,h=p;for(;g<h.length;g++){var y=h[g];var b=y.name;var z=y.type;var w=void 0;if(b===n){w=a.data[n]}else{
if(void 0===a.data[b]){t.errors=["Missing required parameter: ".concat(b)];return t}w=a.data[b]}var S=void 0
;if("boolean"==typeof w){S=w?"01":"00"}else{if("number"!=typeof w){
t.errors=["Unsupported type for parameter ".concat(b,": ").concat(_typeof(w))];return t}if(z){if("U8"===z){
(w<0||w>255)&&t.warnings.push("Value ".concat(w," out of range for U8, truncating"));S=(255&w).toString(16)
;while(S.length<2){S="0"+S}}else if("U16"===z){
(w<0||w>65535)&&t.warnings.push("Value ".concat(w," out of range for U16, truncating"));S=(65535&w).toString(16)
;while(S.length<4){S="0"+S}}else if("U32"===z){if(w<0){
t.warnings.push("Negative value ".concat(w," for unsigned type U32, converting to 0"));w=0}
S=Math.min(w,4294967295).toString(16);while(S.length<8){S="0"+S}}else{
t.warnings.push("Unknown type ".concat(z,", using default encoding"));S=w.toString(16);S.length%2!=0&&(S="0"+S)}}else{
S=w.toString(16);S.length%2!=0&&(S="0"+S)}}u=u.replace(z?"<".concat(z,":").concat(b,">"):"<".concat(b,">"),S)}var x=0
;for(;x<u.length;x+=2){if(x+1>=u.length){t.warnings.push("Odd number of hex characters in template");break}
var N=parseInt(u.substr(x,2),16);if(isNaN(N)){
throw new Error("Invalid hex character in template at position ".concat(x))}t.bytes.push(N)}}catch(e){
t.errors=["Encoding error: ".concat(e.message)];return t}return t}e.exports={watteco_encodeDownlink:t,encodePayload:a}}]
;var a={};function t(r){var n=a[r];if(void 0!==n){return n.exports}var i=a[r]={exports:{}}
;e[r].call(i.exports,i,i.exports,t);return i.exports}var r=t(0);driver=r}()
;"undefined"!=typeof exports&&"undefined"!=typeof module&&module.exports&&(exports.driver=driver);

function HexStrToBytes(InHexStr) {
    if (typeof InHexStr === 'string') {
        var hexString = InHexStr.replace(/[^0-9A-Fa-f]/g, '');
        var bytes = [];
        for (var i = 0; i < hexString.length; i += 2) {
            bytes.push(parseInt(hexString.substr(i, 2), 16));
        }
        InHexStr = bytes;
    }
    return InHexStr;
}

try {
    msg = msg || {}; metadata = metadata || {};
    var tsDate = new Date(parseInt(metadata.ts))
    var ISODate = tsDate.toISOString()
    var input = { bytes: HexStrToBytes(msg.data), fPort: 125, recvTime: ISODate };
    var endpoint_parameters = metadata.endpoint_parameters || metadata.endpointCorresponder || null;
    var TIC_Decode = metadata.TIC_Decode || null;
    var decoded = driver.decodeUplink(input);
    msg.decoded_standard = decoded;
    return { msg: msg, metadata: metadata, msgType: msgType };
} catch (err) {
    metadata = metadata || {}; metadata.__standard_error = err && err.message ? err.message : String(err);
    return { msg: msg || {}, metadata: metadata, msgType: msgType };
}
