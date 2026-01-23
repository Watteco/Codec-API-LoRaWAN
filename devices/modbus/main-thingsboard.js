/*modbus v1.1.8*/function _readOnlyError(e){throw new TypeError('"'+e+'" is read-only')}function _defineProperties(e,a){
var t=0;for(;t<a.length;t++){var r=a[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),
Object.defineProperty(e,_toPropertyKey(r.key),r)}}function _createClass(e,a,t){
return a&&_defineProperties(e.prototype,a),t&&_defineProperties(e,t),Object.defineProperty(e,"prototype",{writable:!1}),
e}function _classCallCheck(e,a){if(!(e instanceof a)){throw new TypeError("Cannot call a class as a function")}}
function _callSuper(e,a,t){
return a=_getPrototypeOf(a),_possibleConstructorReturn(e,_isNativeReflectConstruct()?Reflect.construct(a,t||[],_getPrototypeOf(e).constructor):a.apply(e,t))
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
return e.__proto__||Object.getPrototypeOf(e)},_getPrototypeOf(e)}function ownKeys(e,a){var t=Object.keys(e)
;if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter(function(a){
return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,r)}return t}function _objectSpread(e){var a=1
;for(;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?ownKeys(Object(t),!0).forEach(function(a){
_defineProperty(e,a,t[a])
}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(a){
Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}function _defineProperty(e,a,t){
return(a=_toPropertyKey(a))in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}
function _toPropertyKey(e){var a=_toPrimitive(e,"string");return"symbol"==_typeof(a)?a:a+""}function _toPrimitive(e,a){
if("object"!=_typeof(e)||!e){return e}var t=e[Symbol.toPrimitive];if(void 0!==t){var r=t.call(e,a||"default")
;if("object"!=_typeof(r)){return r}throw new TypeError("@@toPrimitive must return a primitive value.")}
return("string"===a?String:Number)(e)}function _typeof(e){
return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){
return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}
function __FAIL__(e){var a=e&&e.message?e.message:String(e);if("undefined"!=typeof v){
v.causesMessages&&v.causesMessages.push(a);v.error=a}return null}var driver;!function(){var e={174:function(e,a,t){
var r=t(907),n=t(652);function i(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
;var t=null==(r=e)?{}:Array.isArray(r)?{samples:r}:"object"==_typeof(r)?r:"string"==typeof r||"number"==typeof r?{
value:r}:{};var r;if(!t.samples||!Array.isArray(t.samples)){return o(t,a)}var n=t.samples,i={};n.forEach(function(e){
if("object"==_typeof(e)&&e.variable&&void 0!==e.value&&e.date){var t=e.variable,r=e.value,n=e.date
;(!i[t]||new Date(n)>new Date(i[t].date))&&(i[t]={value:r,date:n}),a&&a[t]&&(e.unit=a[t])}});var s={};var d;for(d in t){
t.hasOwnProperty(d)&&(s[d]=t[d])}var c;for(c in i){i.hasOwnProperty(c)&&!s.hasOwnProperty(c)&&(s[c]=i[c].value)}
return o(s,a)}function o(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
;if(!a||0===Object.keys(a).length){return e}var t=_objectSpread({},e);var r;for(r in a){
void 0!==t[r]&&""!==a[r]&&(t["".concat(r,"_unit")]=a[r])}
return t.samples&&Array.isArray(t.samples)&&(t.samples=t.samples.map(function(e){
return e.variable&&a[e.variable]&&""!==a[e.variable]?_objectSpread(_objectSpread({},e),{},{unit:a[e.variable]}):e})),t}
e.exports={watteco_decodeUplink:function(e,a,t,o){var s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null
;if("string"==typeof e.bytes){var d=e.bytes.replace(/[^0-9A-Fa-f]/g,""),c=[];var l=0;for(;l<d.length;l+=2){
c.push(parseInt(d.substr(l,2),16))}e.bytes=c}e.recvTime=function(e){try{if(!e){return(new Date).toISOString()}
if("string"==typeof e){var a=new Date(e);if(!isNaN(a.getTime())){return a.toISOString()}var t=Number(e);if(!isNaN(t)){
return new Date(t).toISOString()}}if("number"==typeof e){
return e<1e12?new Date(1e3*e).toISOString():new Date(e).toISOString()}if("object"==_typeof(e)){if(void 0!==e.seconds){
var r=Number(e.seconds),n=Number(e.nanos||e.nanoseconds||0);if(!isNaN(r)){
return new Date(1e3*r+Math.floor(n/1e6)).toISOString()}}var i=Object.keys(e);var o=0;for(;o<i.length;o++){var s=i[o]
;var d=e[s];if("object"==_typeof(d)&&null!==d){if(void 0!==d.int64&&!isNaN(Number(d.int64))){
return new Date(1e3*Number(d.int64)).toISOString()}if(d.string&&"string"==typeof d.string){var c=new Date(d.string)
;if(!isNaN(c.getTime())){return c.toISOString()}}if(void 0!==d.seconds){var l=Number(d.seconds),u=Number(d.nanos||0)
;if(!isNaN(l)){return new Date(1e3*l+Math.floor(u/1e6)).toISOString()}}}}var _=new Date(e);if(!isNaN(_.getTime())){
return _.toISOString()}}}catch(e){return(new Date).toISOString()}return(new Date).toISOString()}(e.recvTime)
;var u=e.recvTime;try{var _=r.normalisation_standard(e,t,s),p=_.payload;if("batch"!==_.type){return{data:i(_.data,o),
warnings:_.warning}}var f={batch1:a[0],batch2:a[1],payload:p,date:u};try{return{data:i(n.normalisation_batch(f),o),
warnings:[]}}catch(e){return{errors:e.message,warnings:[]}}}catch(e){return{errors:e.message,warnings:[]}}}}},
396:function(e,a,t){var r=t(174),n=t(422),i=[],o={
modbus_payload:["modbus_payload_EP1","modbus_payload_EP2","modbus_payload_EP3","modbus_payload_EP4","modbus_payload_EP5","modbus_payload_EP6","modbus_payload_EP7","modbus_payload_EP8","modbus_payload_EP9"],
modbus_slaveID:["modbus_slaveID_EP1","modbus_slaveID_EP2","modbus_slaveID_EP3","modbus_slaveID_EP4","modbus_slaveID_EP5","modbus_slaveID_EP6","modbus_slaveID_EP7","modbus_slaveID_EP8","modbus_slaveID_EP9"],
modbus_fnctID:["modbus_fnctID_EP1","modbus_fnctID_EP2","modbus_fnctID_EP3","modbus_fnctID_EP4","modbus_fnctID_EP5","modbus_fnctID_EP6","modbus_fnctID_EP7","modbus_fnctID_EP8","modbus_fnctID_EP9"],
modbus_datasize:["modbus_datasize_EP1","modbus_datasize_EP2","modbus_datasize_EP3","modbus_datasize_EP4","modbus_datasize_EP5","modbus_datasize_EP6","modbus_datasize_EP7","modbus_datasize_EP8","modbus_datasize_EP9"]
};function s(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null
;var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null
;var s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return a&&(i=a),t&&(o=t),
s&&(n=_objectSpread(_objectSpread({},n),s)),r.watteco_decodeUplink(e,i,o,n)}a.decodeUplink=s
;var d="undefined"!=typeof globalThis?globalThis:this;d.decodeUplink=s;var c=t(871);var l={};function u(e){
return c.watteco_encodeDownlink({dlFrames:l},e)}a.encodeDownlink=u;var _=c.encodePayload;a.encodePayload=_,
d.encodeDownlink=u,d.encodePayload=_},422:function(e){e.exports={main_or_external_voltage:"V",
disposable_battery_voltage:"V",speed:"bps"}},652:function(e){var a=[];a[0]=0,a[1]=1,a[2]=4,a[3]=4,a[4]=8,a[5]=8,a[6]=16,
a[7]=16,a[8]=24,a[9]=24,a[10]=32,a[11]=32,a[12]=32;var t=[[{sz:2,lbl:0},{sz:2,lbl:1},{sz:2,lbl:3},{sz:3,lbl:5},{sz:4,
lbl:9},{sz:5,lbl:17},{sz:6,lbl:33},{sz:7,lbl:65},{sz:8,lbl:129},{sz:10,lbl:512},{sz:11,lbl:1026},{sz:11,lbl:1027},{
sz:11,lbl:1028},{sz:11,lbl:1029},{sz:11,lbl:1030},{sz:11,lbl:1031}],[{sz:7,lbl:111},{sz:5,lbl:26},{sz:4,lbl:12},{sz:3,
lbl:3},{sz:3,lbl:7},{sz:2,lbl:2},{sz:2,lbl:0},{sz:3,lbl:2},{sz:6,lbl:54},{sz:9,lbl:443},{sz:9,lbl:441},{sz:10,lbl:885},{
sz:10,lbl:884},{sz:10,lbl:880},{sz:11,lbl:1763},{sz:11,lbl:1762}],[{sz:4,lbl:9},{sz:3,lbl:5},{sz:2,lbl:0},{sz:2,lbl:1},{
sz:2,lbl:3},{sz:5,lbl:17},{sz:6,lbl:33},{sz:7,lbl:65},{sz:8,lbl:129},{sz:10,lbl:512},{sz:11,lbl:1026},{sz:11,lbl:1027},{
sz:11,lbl:1028},{sz:11,lbl:1029},{sz:11,lbl:1030},{sz:11,lbl:1031}]];function r(e,a,t,r){return{uncompressSamples:[{
data_relative_timestamp:r,data:{value:s(e,a),label:t}}],codingType:0,codingTable:0,resolution:null}}function n(e,a){
var t=0;for(;t<e.length;t++){if(e[t].taglbl===a.lbl){return t}}throw new Error("Batch : Cannot find i1 in argList")}
function i(e,a){if(a){var t=e.getNextBifromHi(1);return o(e,a,t)}return e.getNextSample(10)}function o(e,a,t){
return t>14?e.getNextSample(10):t>0?function(e,a,t){return e.getNextSample(10,t)+a+Math.pow(2,t)-1}(e,a,t):a}
function s(e,a){var t=e.getNextSample(a);return 12===a?function(e){
var a=e>>>0>>24&128?-1:1,t=(e>>23&255)-127,r=8388607&e;if(128===t){return a*(r?Number.NaN:Number.POSITIVE_INFINITY)}
if(-127===t){if(0===r){return 0*a}t=-126,r/=1<<22}else{r=(r|1<<23)/(1<<23)}return a*r*Math.pow(2,t)}(t):t}
function d(e,a,t,r,n){var i=e.getNextSample(6,n);return 0===t?function(e,a,t,r){
return e>=Math.pow(2,r-1)?e*a+t:(e+1-Math.pow(2,r))*a+t
}(i,r,a,n):1===t?(i+Math.pow(2,n)-1)*r+a:a-(i+(Math.pow(2,n)-1))*r}Math.trunc=Math.trunc||function(e){
return isNaN(e)?NaN:e>0?Math.floor(e):Math.ceil(e)},e.exports={normalisation_batch:function(e){
var s=e.date,c=function(e,s,c,l){var u=function(){var e=[],a=0;for(;a<16;){e.push({codingType:0,codingTable:0,
resolution:null,uncompressSamples:[]}),a+=1}return{batch_counter:0,batch_relative_timestamp:0,series:e}
}(),_=function(e){function r(e,a,t){var r=a,n=t-1;if(8*e.length<r+t){
throw new Error("Batch : Verify that dest buf is large enough")}var i=0,o=0;for(;t>0;){e[r>>3]&1<<(7&r)&&(o|=1<<n-i),
t--,i++,r++}return o}return{i1:0,byteArray:e,getNextSample:function(e,t){var r=t||a[e],n=this.i1;if(this.i1+=r,
12===e&&32!==r){throw new Error("Batch : Mauvais sampletype")}var i=0,o=Math.trunc((r-1)/8)+1,s=r%8
;for(0===s&&o>0&&(s=8);o>0;){var d=0;for(;s>0;){var c=n>>3;this.byteArray[c]&1<<(7&n)&&(i|=1<<8*(o-1)+d),s--,d++,n+=1}
o--,s=8}if((3==e||5==e||7==e||9==e)&&i&1<<r-1){var l=r}for(;l<32;l++){i|=1<<l,r++}return i},getNextBifromHi:function(e){
var a=2;for(;a<12;a++){var n=r(this.byteArray,this.i1,a);var i=0;for(;i<t[e].length;i++){
if(t[e][i].sz==a&&n==t[e][i].lbl){return this.i1+=a,i}}}throw new Error("Bi not found in HUFF table")}}}(function(e){
var a=[];for(;e.length>=2;){a.push(parseInt(e.substring(0,2),16)),e=e.substring(2,e.length)}return a}(c)),p=function(e){
var a=e.toString(2);for(;a.length<8;){a="0"+a}return{isCommonTimestamp:parseInt(a[a.length-2],2),
hasSample:!parseInt(a[a.length-3],2),batch_req:parseInt(a[a.length-4],2),nb_of_type_measure:parseInt(a.substring(0,4),2)
}}(_.getNextSample(4));u.batch_counter=_.getNextSample(4,3),_.getNextSample(4,1);var f=function(e,a,t,o,s){var d=0,c=0
;var l=0;for(;l<o.nb_of_type_measure;l++){var u={size:s,lbl:a.getNextSample(4,s)},_=n(t,u);0===l&&(c=_),d=i(a,d),
e.series[_]=r(a,t[_].sampletype,u.lbl,d),o.hasSample&&(e.series[_].codingType=a.getNextSample(4,2),
e.series[_].codingTable=a.getNextSample(4,2))}return{last_timestamp:d,i1_of_the_first_sample:c}
}(u,_,s,p,e),m=f.last_timestamp,v=f.i1_of_the_first_sample;return p.hasSample&&(m=function(e,a,t,r,i,s,c){
return s.isCommonTimestamp?function(e,a,t,r,i,o){var s=a.getNextSample(4,8),c={},l=function(e,a,t,r){
var n=[],i=0,o=a.getNextSample(4,2);var s=0;for(;s<t;s++){var d=a.getNextBifromHi(o);if(d<=14){if(0===s){
n.push(e.series[r].uncompressSamples[0].data_relative_timestamp)}else{var c=n[s-1]
;d>0?n.push(a.getNextSample(10,d)+c+Math.pow(2,d)-1):n.push(c)}}else{n.push(a.getNextSample(10))}i=n[s]}return{
timestampCommon:n,lastTimestamp:i}}(e,a,s,t),u=l.timestampCommon,_=l.lastTimestamp;var p=0
;for(;p<i.nb_of_type_measure;p++){var f=1;c.lbl=a.getNextSample(4,o);var m=n(r,c);var v=0;for(;v<s;v++){
if(a.getNextSample(4,1)){var g=a.getNextBifromHi(e.series[m].codingTable),b={data_relative_timestamp:0,data:{}}
;if(g<=14){var y=e.series[m].uncompressSamples[e.series[m].uncompressSamples.length-1].data.value;if(g>0){
b.data.value=d(a,y,e.series[m].codingType,r[m].resol,g)}else{if(f){f=0;continue}b.data.value=y}}else{
b.data.value=a.getNextSample(r[m].sampletype)}b.data_relative_timestamp=u[v],e.series[m].uncompressSamples.push(b)}}}
return _}(e,a,t,r,s,c):function(e,a,t,r,i,s){var c={};var l=0;for(;l<i.nb_of_type_measure;l++){
c.lbl=a.getNextSample(4,s);var u=n(t,c),_=a.getNextSample(4,8);if(_){var p=a.getNextSample(4,2);var f=0;for(;f<_;f++){
var m=e.series[u].uncompressSamples[e.series[u].uncompressSamples.length-1].data_relative_timestamp,v={
data_relative_timestamp:0,data:{}},g=a.getNextBifromHi(p);if(v.data_relative_timestamp=o(a,m,g),
v.data_relative_timestamp>r&&(r=v.data_relative_timestamp),g=a.getNextBifromHi(e.series[u].codingTable),g<=14){
var b=e.series[u].uncompressSamples[e.series[u].uncompressSamples.length-1].data.value
;v.data.value=g>0?d(a,b,e.series[u].codingType,t[u].resol,g):b}else{v.data.value=a.getNextSample(t[u].sampletype)}
e.series[u].uncompressSamples.push(v)}}}return r}(e,a,r,i,s,c)}(u,_,v,s,m,p,e)),u.batch_relative_timestamp=i(_,m),
function(e,a,t){var r={batch_counter:e.batch_counter,batch_relative_timestamp:e.batch_relative_timestamp}
;return t&&(r.batch_absolute_timestamp=t),r.dataset=e.series.reduce(function(r,n,i){
return r.concat(n.uncompressSamples.map(function(r){var n={data_relative_timestamp:r.data_relative_timestamp,data:{
value:a[i].divide?r.data.value/a[i].divide:r.data.value,label:a[i].taglbl}};var o,s,d
;return a[i].lblname&&(n.data.label_name=a[i].lblname),t&&(n.data_absolute_timestamp=(o=t,s=e.batch_relative_timestamp,
d=r.data_relative_timestamp,new Date(new Date(o).getTime()-1e3*(s-d)).toISOString())),n}))},[]),r}(u,s,l)
}(e.batch1,e.batch2,e.payload,s),l=[];var u=0;for(;u<c.dataset.length;u++){var _=c.dataset[u],p={
variable:_.data.label_name,value:_.data.value,date:_.data_absolute_timestamp};l.push(p)}return{
batch_counter:c.batch_counter,samples:l}}}},839:function(e){e.exports={UintToInt:function(e,a){if(a<1||a>4){
throw new Error("Unsupported Size")}
return 1===a&&(128&e)>0?e-=256:2===a&&(32768&e)>0?e-=65536:3===a&&(8388608&e)>0?e-=16777216:4===a&&(2147483648&e)>0&&(e-=4294967296),
e},Bytes2Float32:function(e){var a=e>>>0>>24&128?-1:1;var t=(e>>23&255)-127,r=8388607&e;if(128===t){
return a*(r?Number.NaN:Number.POSITIVE_INFINITY)}if(-127===t){if(0===r){return 0}t=-126,r/=1<<23}else{
r=(r|1<<23)/(1<<23)}return a*r*Math.pow(2,t)},BytesToInt64:function(e,a,t,r){void 0===r&&(r=!1)
;var n="U"!=t.substr(0,1),i=parseInt(t.substr(1,2),10)/8;var o,s,d=i;r?(o=-1,s=a+i-1):(o=1,s=a);var c=0;var l=s
;for(;d>0;d--){l+=o,c=(c<<8)+e[l]}return n&&i<8&&128&e[s]&&(c-=1<<8*i),c},decimalToHex:function(e,a){
var t=e.toString(16).toUpperCase();for(a=null!=a?a:2;t.length<a;){t="0"+t}return"0x"+t},zeroPad:function(e,a){
var t=String(e);for(;t.length<a;){t="0"+t}return t},BytesToHexStr:function(e){var a="";var t=0;for(;t<e.length;t++){
var r=e[t].toString(16).toUpperCase();1===r.length&&(r="0"+r),a+=r}return a}}},871:function(e){e.exports={
watteco_encodeDownlink:function(e,a){var t={fPort:125,bytes:[],warnings:[]}
;if(!a||!a.data||0===Object.keys(a.data).length){return t.errors=["Invalid or empty data object"],t}try{
var r=e&&e.dlFrames?e.dlFrames:{}
;r.sendHexFrame="<sendHexFrame>",r.sendConfirmedMode="11058004000008<U8:sendConfirmedMode>",r.sendReboot="1150005000",
r.sendFactoryReset="1150005007",r.sendLoraRetries="11058004000120<U8:sendLoraRetries>",
r.sendLoraRejoin="1150800400<U16:sendLoraRejoin>";var n=null;var i;for(i in a.data){if(r[i]){n=i;break}}if(!n){
return t.errors=["Unknown command. No matching command found in downlink frames"],t}if("sendHexFrame"===n){
var o=a.data.sendHexFrame;if("string"!=typeof o){return t.errors=["sendHexFrame must be a string"],t}
if(o.includes(":")){var s=o.split(":");if(2!==s.length){
return t.errors=["Invalid sendHexFrame format. Use 'hexdata:port' format"],t}o=s[0];var d=parseInt(s[1],10)
;if(isNaN(d)||d<1||d>223){return t.errors=["Port number must be between 1 and 223"],t}t.fPort=d}
if(!/^[0-9A-Fa-f]+$/.test(o)){return t.errors=["sendHexFrame must be a valid hexadecimal string"],t}
if("string"!=typeof o||!/^[0-9A-Fa-f]+$/.test(o)){return t.errors=["sendHexFrame must be a valid hexadecimal string"],t}
o.length%2!=0&&t.warnings.push("Odd number of hex characters in sendHexFrame");var c=0
;for(;c<o.length&&!(c+1>=o.length);c+=2){var l=parseInt(o.substr(c,2),16);t.bytes.push(l)}return t}var u=r[n]
;var _=/<([^:>]+)?:?([^>]+)>/g;var p,f=[];for(;null!==(p=_.exec(u));){var m=p[1]||null,v=p[2];f.push({type:m,name:v})}
var g=0,b=f;for(;g<b.length;g++){var y=b[g];var h=y.name,z=y.type;var w=void 0,S=void 0;if(h===n){w=a.data[n]}else{
if(void 0===a.data[h]){return t.errors=["Missing required parameter: ".concat(h)],t}w=a.data[h]}if("boolean"==typeof w){
S=w?"01":"00"}else{if("number"!=typeof w){
return t.errors=["Unsupported type for parameter ".concat(h,": ").concat(_typeof(w))],t}if(z){if("U8"===z){
for((w<0||w>255)&&t.warnings.push("Value ".concat(w," out of range for U8, truncating")),
S=(255&w).toString(16);S.length<2;){S="0"+S}}else if("U16"===z){
for((w<0||w>65535)&&t.warnings.push("Value ".concat(w," out of range for U16, truncating")),
S=(65535&w).toString(16);S.length<4;){S="0"+S}}else if("U32"===z){
for(w<0&&(t.warnings.push("Negative value ".concat(w," for unsigned type U32, converting to 0")),w=0),
S=Math.min(w,4294967295).toString(16);S.length<8;){S="0"+S}}else{
t.warnings.push("Unknown type ".concat(z,", using default encoding")),S=w.toString(16),S.length%2!=0&&(S="0"+S)}}else{
S=w.toString(16),S.length%2!=0&&(S="0"+S)}}u=u.replace(z?"<".concat(z,":").concat(h,">"):"<".concat(h,">"),S)}var x=0
;for(;x<u.length;x+=2){if(x+1>=u.length){t.warnings.push("Odd number of hex characters in template");break}
var P=parseInt(u.substr(x,2),16);if(isNaN(P)){
throw new Error("Invalid hex character in template at position ".concat(x))}t.bytes.push(P)}}catch(e){
return t.errors=["Encoding error: ".concat(e.message)],t}return t},encodePayload:function(){return arguments[0]}}},
907:function(e,a,t){var r=t(839),n=r.UintToInt,i=r.Bytes2Float32,o=r.BytesToInt64,s=r.decimalToHex,d=r.zeroPad
;r.BytesToHexStr;var c=function(e){function a(e){var t;_classCallCheck(this,a);t=_callSuper(this,a,[e]),
t.name="ValidationError";return t}_inherits(a,e);return _createClass(a)}(_wrapNativeSuper(Error));var l={16:{
name:"boolean",size:1},8:{name:"general8",size:1},9:{name:"general16",size:2},10:{name:"general24",size:3},11:{
name:"general32",size:4},24:{name:"bitmap8",size:1},25:{name:"bitmap16",size:2},32:{name:"uint8",size:1},33:{
name:"uint16",size:2},34:{name:"uint24",size:3},35:{name:"uint32",size:4},40:{name:"int8",size:1},41:{name:"int16",
size:2},42:{name:"int24",size:3},43:{name:"int32",size:4},48:{name:"enum8",size:1},66:{name:"char string",size:1},65:{
name:"bytes string",size:1},67:{name:"long bytes string",size:2},76:{name:"structured ordered sequence",size:2},57:{
name:"single",size:4}},u={32778:{0:{0:{divider:1,function_type:"int",name:"positive_active_energy",size:4},1:{divider:1,
function_type:"int",name:"negative_active_energy",size:4},2:{divider:1,function_type:"int",
name:"positive_reactive_energy",size:4},3:{divider:1,function_type:"int",name:"negative_reactive_energy",size:4},4:{
divider:1,function_type:"int",name:"positive_active_power",size:4},5:{divider:1,function_type:"int",
name:"negative_active_power",size:4},6:{divider:1,function_type:"int",name:"positive_reactive_power",size:4},7:{
divider:1,function_type:"int",name:"negative_reactive_power",size:4}}},32784:{0:{0:{divider:1,function_type:"int",
name:"active_energy_a",size:4},1:{divider:1,function_type:"int",name:"reactive_energy_a",size:4},2:{divider:1,
function_type:"int",name:"active_energy_b",size:4},3:{divider:1,function_type:"int",name:"reactive_energy_b",size:4},4:{
divider:1,function_type:"int",name:"active_energy_c",size:4},5:{divider:1,function_type:"int",name:"reactive_energy_c",
size:4},6:{divider:1,function_type:"int",name:"active_energy_abc",size:4},7:{divider:1,function_type:"int",
name:"reactive_energy_abc",size:4}},1:{0:{divider:1,function_type:"int",name:"active_power_a",size:4},1:{divider:1,
function_type:"int",name:"reactive_power_a",size:4},2:{divider:1,function_type:"int",name:"active_power_b",size:4},3:{
divider:1,function_type:"int",name:"reactive_power_b",size:4},4:{divider:1,function_type:"int",name:"active_power_c",
size:4},5:{divider:1,function_type:"int",name:"reactive_power_c",size:4},6:{divider:1,function_type:"int",
name:"active_power_abc",size:4},7:{divider:1,function_type:"int",name:"reactive_power_abc",size:4}}},32779:{0:{0:{
divider:10,function_type:"int",name:"Vrms",size:2},1:{divider:10,function_type:"int",name:"Irms",size:2},2:{divider:1,
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
name:"solar_harvesting",size:2},6:{divider:1e3,function_type:"none",name:"TIC_harvesting",size:2}}}};function _(e){
var a="",t=e.toString(2);return a+=d(t,8),a}function p(e,a,t,r,o,s,d,c,_,p){if(138===e||10==e){
var f=l[d],m=_,v=f.size,g=f.name;void 0===m&&(m="single"===g?"float":"int8"===g||"int16"===g||"int32"===g?"int":"none")
;var b=function(e,a,t,r,o,s,d,c,l){var _={reportCauses:[],causesMessages:[]}
;138===e&&_.causesMessages.push("alarm triggered");var p=o;if(p>=r.length){return _}var f=!1,m=3&(r[o]>>=4);if(2==m){
f=!0}else if(1!=m){throw new Error("Alarm decoding: Unexpected cause type. (ReportParams byte = ".concat(r[o],")"))}
if(p++,p>=r.length){return _.causesMessages.push("cause:{}"),_}function v(e,a,t){if(p+a-1>=r.length){
throw new Error("Alarm decoding: Unexpected end of data during reading of the value.")}var o=0;var s=0;for(;s<a;s++){
o=o<<8|r[p++]}if("int"===e){o=n(o,a)}else{if("float"!==e){throw new Error("Alarm decoding: Unknown type kind: "+e)}
if(4!==a){throw new Error("Alarm decoding: Invalid float size. Only 4 bytes are supported.")}o=i(o)}return o/t}
for(;p<r.length;){var g={};if(p>=r.length){throw new Error("Alarm decoding: Unexpected end of data before reading CSD.")
}var b=r[p++];g.criterionIndex=7&b;var y=b>>3&3;g.mode=1===y?"delta":2===y?"threshold":"unused",g.hasFallen=!!(32&b),
g.hasExceeded=!!(64&b),g.isAlarm=!!(128&b)
;var h=void 0,z=void 0,w=void 0,S=void 0,x=void 0,P=void 0,I=void 0,N=g.hasExceeded&&g.hasFallen?"exceed&fall":g.hasExceeded?"exceed":g.hasFallen?"fall":"",O=null
;if(f){if(p>=r.length){throw new Error("Alarm decoding: Unexpected end of data before reading FI.")}var E=s,U=d,D=c
;if(g.fieldIndex=0,null!=l&&!0===l&&(O=r[p++],g.fieldIndex=O,u[a]&&u[a][t]&&u[a][t][O])){var T=u[a][t][O]
;E=T.function_type||s,U=T.size||d,D=T.divider||c,P=T.name||"FieldUndef !"}h=v(E,U,D),"threshold"===g.mode&&(z=v(E,U,D))}
if("threshold"===g.mode&&f){if(p>=r.length){
throw new Error("Alarm decoding: Unexpected end of data before reading Occ.")}var M=r[p++];if(w=M,M>0&&128&M){
if(p+3>=r.length){throw new Error("Alarm decoding: Invalid OccH or OccL read.")}S=r[p++]<<8|r[p++],x=r[p++]<<8|r[p++]}}
_.reportCauses.push(g),
f?(I="threshold"===g.mode?void 0!==S?"cause:{alarm:".concat(g.isAlarm,", criterion_index: ").concat(g.criterionIndex,", mode: threshold, crossing: ").concat(N,", value: ").concat(h,", gap: ").concat(z,", occurences_up: ").concat(S,", occurences_down: ").concat(x):"cause:{alarm:".concat(g.isAlarm,", criterion_index: ").concat(g.criterionIndex,", mode: threshold, crossing: ").concat(N,", value: ").concat(h,", gap: ").concat(z,", occurences: ").concat(w):"cause:{alarm:".concat(g.isAlarm,", criterion_index: ").concat(g.criterionIndex,", mode: delta, value: ").concat(h),
P&&(I+=", field: ".concat(P)),
I+="}"):(I="cause:{alarm:".concat(g.isAlarm,", criterion_index: ").concat(g.criterionIndex,", mode: ").concat(g.mode),
"threshold"===g.mode&&(I+=", crossing: ".concat(N)),I+="}"),_.causesMessages.push(I)}if(p!==r.length){
throw new Error("Alarm decoding: Remaining unprocessed bytes detected. Expected ".concat(r.length,", but stopped at ").concat(p,"."))
}return _}(e,a,t,r,s,m,v,c,p);o.zclheader.alarmmsg=b.causesMessages}}e.exports={normalisation_standard:function(e,a){
var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;var r=[],d=e.bytes,u=function(e,a){
var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;var r={},d=0;r.lora={},r.lora.port=a
;var u=e.length,f="";r.lora.payload="";var m=0;for(;m<u;m++){f=e[m].toString(16).toUpperCase(),1===f.length&&(f="0"+f),
r.lora.payload+=f;var v=new Date;r.lora.date=v.toISOString()}if(125===a){if(0==!(1&e[0])){r.zclheader={},
r.zclheader.report="standard";var g=-1,b=-1,y=-1;if(r.zclheader.endpoint=(224&e[0])>>5|(6&e[0])<<2,b=e[1],
r.zclheader.cmdID=s(b,2),y=256*e[2]+e[3],r.zclheader.clustID=s(y,4),10===b||138===b||1===b){d=1,r.data={},
g=256*e[4]+e[5],r.zclheader.attID=s(g,4);var h=e[4],z=0;if(10!==b&&138!==b||(z=7),138===b&&(r.zclheader.alarm=1),
1===b&&(z=8,r.zclheader.status=e[6]),83===y||84===y||85===y||86===y||87===y){if("function"!=typeof t){
throw new c("TIC_Decode function not found")}r.data=t(y,g,e.slice(z+1))}if(0===y&&2===g){r.data.firmware="";var w=0
;for(;w<3;w++){r.data.firmware+=String(e[z+w]),w<2&&(r.data.firmware+=".")}var S=256*e[z+3]*256+256*e[z+4]+e[z+5]
;r.data.firmware+="."+S.toString()}if(0===y&&3===g){var x=e[z];r.data.kernel="";var P=0;for(;P<x;P++){
r.data.kernel+=String.fromCharCode(e[z+1+P])}}if(0===y&&4===g){var I=e[z];r.data.manufacturer="";var N=0;for(;N<I;N++){
r.data.manufacturer+=String.fromCharCode(e[z+1+N])}}if(0===y&&5===g){var O=e[z];r.data.model="";var E=0;for(;E<O;E++){
r.data.model+=String.fromCharCode(e[z+1+E])}}if(0===y&&6===g){var U=e[z];r.data.date="";var D=0;for(;D<U;D++){
r.data.date+=String.fromCharCode(e[z+1+D])}}if(0===y&&16===g){var T=e[z];r.data.position="";var M=0;for(;M<T;M++){
r.data.position+=String.fromCharCode(e[z+1+M])}}if(0===y&&32769===g){var C=e[z];r.data.application_name="";var j=0
;for(;j<C;j++){r.data.application_name+=String.fromCharCode(e[z+1+j])}}if(1026===y&&0===g){var k=e[z-1]
;r.data.temperature=n(256*e[z]+e[z+1],2)/100,p(b,y,g,e,r,z+2,k,100,"int")}
if(1026===y&&1===g&&(r.data.min_temperature=n(256*e[z]+e[z+1],2)/100),
1026===y&&2===g&&(r.data.max_temperature=n(256*e[z]+e[z+1],2)/100),1029===y&&0===g){var A=e[z-1]
;r.data.humidity=(256*e[z]+e[z+1])/100,p(b,y,g,e,r,z+2,A,100,"none")}
if(1029===y&&1===g&&(r.data.min_humidity=(256*e[z]+e[z+1])/100),
1029===y&&2===g&&(r.data.max_humidity=(256*e[z]+e[z+1])/100),15===y&&1026===g){var F=e[z-1]
;r.data.index=256*e[z]*256*256+256*e[z+1]*256+256*e[z+2]+e[z+3],p(b,y,g,e,r,z+4,F,1,"none")}if(15===y&&85===g){
var q=e[z-1];r.data.pin_state=!!e[z],p(b,y,g,e,r,z+1,q,1,"none")}
if(15===y&&84===g&&(0===e[z]&&(r.data.polarity="normal"),1===e[z]&&(r.data.polarity="reverse")),
15===y&&1024===g&&(0===e[z]&&(r.data.edge_selection="none"),1===e[z]&&(r.data.edge_selection="falling edge"),
2===e[z]&&(r.data.edge_selection="rising edge"),3===e[z]&&(r.data.edge_selection="both edges"),
5===e[z]&&(r.data.edge_selection="polling and falling edge"),
6===e[z]&&(r.data.edge_selection="polling and rising edge"),7===e[z]&&(r.data.edge_selection="polling and both edges")),
15===y&&1025===g&&(r.data.debounce_period=e[z]),15===y&&1027===g&&(r.data.poll_period=e[z]),
15===y&&1028===g&&(r.data.force_notify=e[z]),19===y&&85===g){var H=e[z-1];r.data.output_value=e[z],
p(b,y,g,e,r,z+1,H,1,"none")}if(6===y&&0===g){var V=e[z];r.data.output=1===V?"ON":"OFF"}if(32776===y&&0===g){var R=e[z-1]
;r.data.differential_pressure=256*e[z]+e[z+1],p(b,y,g,e,r,z+2,R,1,"none")}if(32773===y&&0===g){var B=e[z-1]
;r.data.pin_state_1=!(1&~e[z+1]),r.data.pin_state_2=!(2&~e[z+1]),r.data.pin_state_3=!(4&~e[z+1]),
r.data.pin_state_4=!(8&~e[z+1]),r.data.pin_state_5=!(16&~e[z+1]),r.data.pin_state_6=!(32&~e[z+1]),
r.data.pin_state_7=!(64&~e[z+1]),r.data.pin_state_8=!(128&~e[z+1]),r.data.pin_state_9=!(1&~e[z]),
r.data.pin_state_10=!(2&~e[z]),p(b,y,g,e,r,z+2,B,100,"none")}
if(32774===y&&0===g&&(r.data.speed=256*e[z]*256+256*e[z+1]+e[z+2]),32774===y&&1===g&&(r.data.data_bit=e[z]),
32774===y&&2===g&&(r.data.parity=e[z]),32774===y&&3===g&&(r.data.stop_bit=e[z]),12===y&&85===g){var G=e[z-1]
;r.data.analog=i(256*e[z]*256*256+256*e[z+1]*256+256*e[z+2]+e[z+3]),p(b,y,g,e,r,z+4,G,1,"float")}
if(12===y&&256===g&&(5===e[z+1]&&(r.data.type="ppm"),255===e[z+1]&&0===e[z+3]&&(r.data.type="mA"),
255===e[z+1]&&1===e[z+3]&&(r.data.type="mV")),12===y&&32771===g&&(r.data.power_duration=256*e[z]+e[z+1]),
12===y&&32772===g){var Y={};var L=_(e[z]),K=_(e[z+1]),X=2*L[0]+L[1];0===X&&(Y.mode="idle"),1===X&&(Y.mode="chock"),
2===X&&(Y.mode="click");var Z=8*L[2]+4*L[3]+2*L[4]+L[5];0===Z&&(Y.frequency="idle"),1===Z&&(Y.frequency="1Hz"),
2===Z&&(Y.frequency="10Hz"),3===Z&&(Y.frequency="25Hz"),4===Z&&(Y.frequency="50Hz"),5===Z&&(Y.frequency="100Hz"),
6===Z&&(Y.frequency="200Hz"),7===Z&&(Y.frequency="400Hz"),8===Z&&(Y.frequency="1620Hz"),9===Z&&(Y.frequency="5376Hz"),
Y.range={};var W=2*L[6]+L[7];0===W&&(Y.range.precision="+/- 2g",Y.range.value=16),1===W&&(Y.range.precision="+/- 4g",
Y.range.value=32),2===W&&(Y.range.precision="+/- 8g",Y.range.value=64),3===W&&(Y.range.precision="+/- 16g",
Y.range.value=128);var $=128*K[0]+64*K[1]+32*K[2]+16*K[3]+8*K[4]+4*K[5]+2*K[6]+K[7];Y.threshold=$*Y.range.value}
if(32782===y&&0===g){var J=e[z-1];r.data.number=function(e,a,t){var r=0,o=0;switch(t){case 8:case 24:case 32:case 40:
case 48:o=1;break;case 9:case 25:case 33:case 41:o=2;break;case 10:case 26:case 34:case 42:o=3;break;case 11:case 27:
case 35:case 43:o=4;break;case 12:o=5;break;case 13:case 37:o=6;break;case 57:
return i(256*e[a]*256*256+256*e[a+1]*256+256*e[a+2]+e[a+3]);default:throw new Error("Unsupported number type: "+t)}
var s=0;for(;s<o;s++){r=r<<8|e[a+s]}return t>=40&&t<=43?n(r,o):r}(e,z,J),p(b,y,g,e,r,z+Math.ceil(l[J].size),J,1,"none")}
if(32775===y&&1===g){r.data.modbus_payload="";var Q=e[z];var ee=0;for(;ee<Q;ee++){
f=e[z+ee+1].toString(16).toUpperCase(),
1===f.length&&(f="0"+f),0===ee?r.data.modbus_slaveID=e[z+ee+1]:1===ee?r.data.modbus_fnctID=e[z+ee+1]:2===ee?r.data.modbus_datasize=e[z+ee+1]:r.data.modbus_payload+=f
}}if(32777===y&&0===g){var ae=e[z+2]<<8|e[z+3];r.data.modbus_frame_series_sent=e[z+1],
r.data.modbus_frame_number_in_serie=(57344&ae)>>13,r.data.modbus_last_frame_of_serie=(7168&ae)>>10;var te=0
;for(;te<=9;te++){r.data["modbus_EP".concat(te)]=!!(ae&1<<te)}function Ye(e,a,t,r,n,i){if(!0===e){
if(0===t&&(n.data["modbus_slaveID_EP".concat(i)]=r[a],n.data["modbus_fnctID_EP".concat(i)]=r[a+1],
n.data["modbus_datasize_EP".concat(i)]=r[a+2],a+=3),n.data["modbus_payload_EP".concat(i)]="",void 0===r[a]){return n}
var o="modbus_datasize_EP".concat(i),s=n.data[o];var d=0;for(;d<s;d++){var c=r[a+d].toString(16).toUpperCase()
;1===c.length&&(c="0"+c),n.data["modbus_payload_EP".concat(i)]+=c}a+=s}return a}var re=z+4;var ne=0;var ie=0
;for(;ie<=9;ie++){re=Ye(r.data["modbus_EP".concat(ie)],re,ne,e,r,ie)}}
if(82===y&&0===g&&(r.data.active_energy=n(256*e[z+1]*256+256*e[z+2]+e[z+3],3),
r.data.reactive_energy=n(256*e[z+4]*256+256*e[z+5]+e[z+6],3),r.data.nb_samples=256*e[z+7]+e[z+8],
r.data.active_power=n(256*e[z+9]+e[z+10],2),r.data.reactive_power=n(256*e[z+11]+e[z+12],2)),
32772===y&&0===g&&(1===e[z]&&(r.data.message_type="confirmed"),0===e[z]&&(r.data.message_type="unconfirmed")),
32772===y&&1===g&&(r.data.nb_retry=e[z]),32772===y&&2===g&&(r.data.automatic_association={},
r.data.automatic_association.period_in_minutes=256*e[z+1]+e[z+2],
r.data.automatic_association.nb_err_frames=256*e[z+3]+e[z+4]),32772===y&&3===g&&(r.data.data_rate=e[z+2]),
32772===y&&4===g){r.data.ABP_dev_address="";var oe=0;for(;oe<4;oe++){r.data.ABP_dev_address+=String(e[z+1+oe]),
oe<3&&(r.data.ABP_dev_address+=".")}}if(32772===y&&5===g){r.data.OTA_app_EUI="";var se=0;for(;se<8;se++){
r.data.OTA_app_EUI+=String(e[z+1+se]),se<7&&(r.data.OTA_app_EUI+=".")}}if(80===y&&4===g){e[z],e[z+1];var de={}
;var ce=e[z+2];var le=0;for(;le<ce;le++){var ue={};ue.endpoint=e[z+3+7*le];var _e=e[z+4+7*le];ue.input_clusters=[]
;var pe=0;for(;pe<_e;pe++){ue.input_clusters[pe]=s(256*e[z+5+7*le+2*pe]+e[z+6+7*le+2*pe],4)}var fe=e[z+5+7*le+2*_e]
;ue.output_clusters=[];var me=0;for(;me<fe;me++){ue.output_clusters[me]=s(256*e[z+6+7*le+2*me]+e[z+7+7*le+2*me],4)}
de[le]=ue}r.data.configuration=de}if(80===y&&6===g){var ve=z+3;var ge=e[z-1]
;1&~e[z+2]||(r.data.main_or_external_voltage=(256*e[ve]+e[ve+1])/1e3,
ve+=2),2&~e[z+2]||(r.data.rechargeable_battery_voltage=(256*e[ve]+e[ve+1])/1e3,ve+=2),
4&~e[z+2]||(r.data.disposable_battery_voltage=(256*e[ve]+e[ve+1])/1e3,
ve+=2),8&~e[z+2]||(r.data.solar_harvesting_voltage=(256*e[ve]+e[ve+1])/1e3,ve+=2),
16&~e[z+2]||(r.data.tic_harvesting_voltage=(256*e[ve]+e[ve+1])/1e3,ve+=2),p(b,y,g,e,r,ve+1,ge,1e3,"multistate",!0)}
if(80===y&&255===h){var be="action "+e[5].toString();r.data[be]="";var ye=e[z+1];var he="none";var ze=0
;for(;ze<ye;ze++){he+=String.fromCharCode(e[z+1+ze])}r.data[be]=he}if(32778===y&&0===g){var we=z;var Se=e[we-1]
;r.data.positive_active_energy=n(256*e[we+1]*256*256+256*e[we+2]*256+256*e[we+3]+e[we+4],4),we+=4,
r.data.negative_active_energy=n(256*e[we+1]*256*256+256*e[we+2]*256+256*e[we+3]+e[we+4],4),we+=4,
r.data.positive_reactive_energy=n(256*e[we+1]*256*256+256*e[we+2]*256+256*e[we+3]+e[we+4],4),we+=4,
r.data.negative_reactive_energy=n(256*e[we+1]*256*256+256*e[we+2]*256+256*e[we+3]+e[we+4],4),we+=4,
r.data.positive_active_power=n(256*e[we+1]*256*256+256*e[we+2]*256+256*e[we+3]+e[we+4],4),we+=4,
r.data.negative_active_power=n(256*e[we+1]*256*256+256*e[we+2]*256+256*e[we+3]+e[we+4],4),we+=4,
r.data.positive_reactive_power=n(256*e[we+1]*256*256+256*e[we+2]*256+256*e[we+3]+e[we+4],4),we+=4,
r.data.negative_reactive_power=n(256*e[we+1]*256*256+256*e[we+2]*256+256*e[we+3]+e[we+4],4),
p(b,y,g,e,r,we+5,Se,1,"multistate",!0)}if(32784===y&&0===g){var xe=e[z-1]
;r.data.active_energy_a=n(256*e[z+1]*256*256+256*e[z+2]*256+256*e[z+3]+e[z+4]),
r.data.reactive_energy_a=n(256*e[z+5]*256*256+256*e[z+6]*256+256*e[z+7]+e[z+8]),
r.data.active_energy_b=n(256*e[z+9]*256*256+256*e[z+10]*256+256*e[z+11]+e[z+12]),
r.data.reactive_energy_b=n(256*e[z+13]*256*256+256*e[z+14]*256+256*e[z+15]+e[z+16]),
r.data.active_energy_c=n(256*e[z+17]*256*256+256*e[z+18]*256+256*e[z+19]+e[z+20]),
r.data.reactive_energy_c=n(256*e[z+21]*256*256+256*e[z+22]*256+256*e[z+23]+e[z+24]),
r.data.active_energy_abc=n(256*e[z+25]*256*256+256*e[z+26]*256+256*e[z+27]+e[z+28]),
r.data.reactive_energy_abc=n(256*e[z+29]*256*256+256*e[z+30]*256+256*e[z+31]+e[z+32]),
p(b,y,g,e,r,z+33,xe,1,"multistate",!0)}else if(32784===y&&1===g){var Pe=e[z-1]
;r.data.active_power_a=n(256*e[z+1]*256*256+256*e[z+2]*256+256*e[z+3]+e[z+4]),
r.data.reactive_power_a=n(256*e[z+5]*256*256+256*e[z+6]*256+256*e[z+7]+e[z+8]),
r.data.active_power_b=n(256*e[z+9]*256*256+256*e[z+10]*256+256*e[z+11]+e[z+12]),
r.data.reactive_power_b=n(256*e[z+13]*256*256+256*e[z+14]*256+256*e[z+15]+e[z+16]),
r.data.active_power_c=n(256*e[z+17]*256*256+256*e[z+18]*256+256*e[z+19]+e[z+20]),
r.data.reactive_power_c=n(256*e[z+21]*256*256+256*e[z+22]*256+256*e[z+23]+e[z+24]),
r.data.active_power_abc=n(256*e[z+25]*256*256+256*e[z+26]*256+256*e[z+27]+e[z+28]),
r.data.reactive_power_abc=n(256*e[z+29]*256*256+256*e[z+30]*256+256*e[z+31]+e[z+32]),
p(b,y,g,e,r,z+33,Pe,1,"multistate",!0)}if(32779===y&&0===g){var Ie=z;var Ne=e[Ie-1]
;r.data.Vrms=n(256*e[Ie+1]+e[Ie+2],2)/10,Ie+=2,r.data.Irms=n(256*e[Ie+1]+e[Ie+2],2)/10,Ie+=2,
r.data.angle=n(256*e[Ie+1]+e[Ie+2],2),p(b,y,g,e,r,Ie+3,Ne,1,"multistate",!0)}if(32781===y&&0===g){var Oe=e[z-1]
;r.data.Vrms_a=n(256*e[z+1]+e[z+2],2)/10,r.data.Irms_a=n(256*e[z+3]+e[z+4],2)/10,r.data.angle_a=n(256*e[z+5]+e[z+6],2),
r.data.Vrms_b=n(256*e[z+7]+e[z+8],2)/10,r.data.Irms_b=n(256*e[z+9]+e[z+10],2)/10,
r.data.angle_b=n(256*e[z+11]+e[z+12],2),r.data.Vrms_c=n(256*e[z+13]+e[z+14],2)/10,
r.data.Irms_c=n(256*e[z+15]+e[z+16],2)/10,r.data.angle_c=n(256*e[z+17]+e[z+18],2),p(b,y,g,e,r,z+19,Oe,1,"multistate",!0)
}if(32780===y&&0===g){var Ee=e[z-1];r.data.concentration=256*e[z]+e[z+1],p(b,y,g,e,r,z+2,Ee,1,"none")}
if(32780===y&&1===g&&(r.data.analog=e[z]),32780===y&&2===g&&(r.data.analog=e[z]),1024===y&&0===g){var Ue=e[z-1]
;r.data.illuminance=256*e[z]+e[z+1],p(b,y,g,e,r,z+2,Ue,1,"none")}if(1027===y&&0===g){var De=e[z-1]
;r.data.pressure=n(256*e[z]+e[z+1],2),p(b,y,g,e,r,z+2,De,1,"int")}if(1030===y&&0===g){var Te=e[z-1]
;r.data.occupancy=!!e[z],p(b,y,g,e,r,z+1,Te,1,"none")}if(32850===y&&0===g){var Me=z
;r.data.frequency=(n(256*e[Me+1]+e[Me+2],2)+22232)/1e3,Me+=2,r.data.frequency_min=(n(256*e[Me+1]+e[Me+2],2)+22232)/1e3,
Me+=2,r.data.frequency_max=(n(256*e[Me+1]+e[Me+2],2)+22232)/1e3,Me+=2,r.data.Vrms=n(256*e[Me+1]+e[Me+2],2)/10,Me+=2,
r.data.Vrms_min=n(256*e[Me+1]+e[Me+2],2)/10,Me+=2,r.data.Vrms_max=n(256*e[Me+1]+e[Me+2],2)/10,Me+=2,
r.data.Vpeak=n(256*e[Me+1]+e[Me+2],2)/10,Me+=2,r.data.Vpeak_min=n(256*e[Me+1]+e[Me+2],2)/10,Me+=2,
r.data.Vpeak_max=n(256*e[Me+1]+e[Me+2],2)/10,Me+=2,r.data.over_voltage=n(256*e[Me+1]+e[Me+2],2),Me+=2,
r.data.sag_voltage=n(256*e[Me+1]+e[Me+2],2),Me+=2,r.data.brownout_number=n(256*e[Me+1]+e[Me+2],2)}if(32783===y){
var Ce=z+1;if(0===g){var je=r.data.last={};je.NbTriggedAcq=o(e,Ce,"U32"),Ce+=4,je.Mean_X_G=o(e,Ce,"U16")/100,Ce+=2,
je.Max_X_G=o(e,Ce,"U16")/100,Ce+=2,je.Dt_X_ms=o(e,Ce,"U16"),Ce+=2,je.Mean_Y_G=o(e,Ce,"U16")/100,Ce+=2,
je.Max_Y_G=o(e,Ce,"U16")/100,Ce+=2,je.Dt_Y_ms=o(e,Ce,"U16"),Ce+=2,je.Mean_Z_G=o(e,Ce,"U16")/100,Ce+=2,
je.Max_Z_G=o(e,Ce,"U16")/100,Ce+=2,je.Dt_Z_ms=o(e,Ce,"U16")}else if(1===g||2===g||3===g){
var ke=1===g?"Stats_X":2===g?"Stats_Y":"Stats_Z",Ae=r.data[ke]={};Ae.NbAcq=o(e,Ce,"U16"),Ce+=2,
Ae.MinMean_G=o(e,Ce,"U16")/100,Ce+=2,Ae.MinMax_G=o(e,Ce,"U16")/100,Ce+=2,Ae.MinDt=o(e,Ce,"U16"),Ce+=2,
Ae.MeanMean_G=o(e,Ce,"U16")/100,Ce+=2,Ae.MeanMax_G=o(e,Ce,"U16")/100,Ce+=2,Ae.MeanDt=o(e,Ce,"U16"),Ce+=2,
Ae.MaxMean_G=o(e,Ce,"U16")/100,Ce+=2,Ae.MaxMax_G=o(e,Ce,"U16")/100,Ce+=2,Ae.MaxDt=o(e,Ce,"U16"),Ce+=2
}else if(32768===g){var Fe=r.data.params={};Fe.WaitFreq_Hz=o(e,Ce,"U16")/10,Ce+=2,Fe.AcqFreq_Hz=o(e,Ce,"U16")/10,Ce+=2
;var qe=o(e,Ce,"U16");Ce+=2,32768&qe&&(qe=60*(-32769&qe)),Fe.NewWaitDelay_s=32768&qe?qe=60*(-32769&qe):qe,
Fe.MaxAcqDuration_ms=o(e,Ce,"U16"),Ce+=2,Fe.Threshold_X_G=o(e,Ce,"U16")/100,Ce+=2,Fe.Threshold_Y_G=o(e,Ce,"U16")/100,
Ce+=2,Fe.Threshold_Z_G=o(e,Ce,"U16")/100,Ce+=2,Fe.OverThrsh_Dt_ms=o(e,Ce,"U16"),Ce+=2,Fe.UnderThrsh_Dt_ms=o(e,Ce,"U16"),
Ce+=2,Fe.Range_G=o(e,Ce,"U16")/100,Ce+=2,Fe.FilterSmoothCoef=o(e,Ce,"U8"),Ce+=1,Fe.FilterGainCoef=o(e,Ce,"U8"),Ce+=1,
Fe=r.data.Params.working_modes={},Fe.SignalEachAcq=128&e[Ce]?"true":"false",Fe.RstAftStdRpt_X=1&e[Ce]?"true":"false",
Fe.RstAftStdRpt_Y=2&e[Ce]?"true":"false",Fe.RstAftStdRpt_7=4&e[Ce]?"true":"false"}}var He=Object.keys(r.data)[0]
;if(void 0===r.data[He]){throw new c("bad payload1")}if(e.length<=7){throw new c("bad payload2")}}if(7===b){d=1,
g=256*e[6]+e[7],r.zclheader.attID=s(g,4),r.zclheader.status=e[4],r.zclheader.report_parameters={};var Ve=_(e[5])
;r.zclheader.report_parameters.new_mode_configuration=Ve[0],
"0"===Ve[2]&&"0"===Ve[3]&&(r.zclheader.report_parameters.cause_request="none"),
"0"===Ve[2]&&"1"===Ve[3]&&(r.zclheader.report_parameters.cause_request="short"),
"1"===Ve[2]&&"0"===Ve[3]&&(r.zclheader.report_parameters.cause_request="long"),
"1"===Ve[2]&&"1"===Ve[3]&&(r.zclheader.report_parameters.cause_request="reserved"),
r.zclheader.report_parameters.secured_if_alarm=Ve[4],r.zclheader.report_parameters.secured=Ve[5],
r.zclheader.report_parameters.no_hearde_port=Ve[6],r.zclheader.report_parameters.batch=Ve[7]}if(9===b){d=1,
g=256*e[6]+e[7],r.zclheader.attID=s(g,4),r.zclheader.status=e[4],r.zclheader.report_parameters={};var Re=_(e[5])
;if(r.zclheader.report_parameters.new_mode_configuration=Re[0],
"0"===Re[2]&&"0"===Re[3]&&(r.zclheader.report_parameters.cause_request="none"),
"0"===Re[2]&&"1"===Re[3]&&(r.zclheader.report_parameters.cause_request="short"),
"1"===Re[2]&&"0"===Re[3]&&(r.zclheader.report_parameters.cause_request="long"),
"1"===Re[2]&&"1"===Re[3]&&(r.zclheader.report_parameters.cause_request="reserved"),
r.zclheader.report_parameters.secured_if_alarm=Re[4],r.zclheader.report_parameters.secured=Re[5],
r.zclheader.report_parameters.no_hearde_port=Re[6],r.zclheader.report_parameters.batch=Re[7],
r.zclheader.attribut_type=e[8],r.zclheader.min={},128&~e[9]?(r.zclheader.min.value=256*e[9]+e[10],
r.zclheader.min.unit="seconds"):(r.zclheader.min.value=256*(e[9]-128)+e[10],r.zclheader.min.unit="minutes"),
r.zclheader.max={},
128&~e[11]?(r.zclheader.max.value=256*e[11]+e[12],r.zclheader.max.unit="seconds"):(r.zclheader.max.value=256*(e[11]-128)+e[12],
r.zclheader.max.unit="minutes"),r.lora.payload="",80===y&&6===g){var Be=e[13]/5,Ge=0;for(;Be>0;){
r.zclheader.modepower=e[14+5*Ge],r.zclheader.powersource=e[15+5*Ge],r.zclheader.delta=256*e[16+5*Ge]+e[17+5*Ge],
r.zclheader.changedpowersource=e[18+5*Ge],Ge++,Be--}}}if(0===d){throw new c("bad payload3")}}else{r.batch={},
r.batch.report="batch"}}return r}(d,e.fPort,t);if(void 0!==u.zclheader){
if(void 0!==u.zclheader.alarmmsg&&(r=u.zclheader.alarmmsg),7===d[1]){return{data:u.zclheader,warning:r}}if(9===d[1]){
return{data:u.zclheader,warning:r}}if(1===d[1]){if(void 0===u.zclheader.data){var f=[],m=!0,v=0;for(;m;){
var g=Object.keys(u.data)[v];if(void 0===g){m=!1;break}f.push({variable:g,value:u.data[g],date:e.recvTime}),v++}return{
data:f,type:"standard",warning:r}}return{data:{variable:"read reporting configuration response status",
value:u.zclheader.data,date:e.recvTime},warning:r}}}if(void 0!==u.zclheader){if(void 0!==a){
var b=u.zclheader.endpoint,y=!0,h=0,z=[],w="";for(;y;){var S=Object.keys(u.data)[h];if(void 0===S){y=!1;break}
void 0===a[S]?z.push({variable:S,value:u.data[S],date:e.recvTime}):(w=a[S][b],"NA"===w?z.push({variable:w,value:"NA",
date:e.recvTime}):z.push({variable:w,value:u.data[S],date:e.recvTime})),h++}return{data:z,type:"standard",warning:r}}
throw new c("bad decoding")}return{type:u.batch.report,payload:u.lora.payload}}}}},a={},t=function t(r){var n=a[r]
;if(void 0!==n){return n.exports}var i=a[r]={exports:{}};return e[r].call(i.exports,i,i.exports,t),i.exports}(396)
;driver=t}();"undefined"!=typeof exports&&"undefined"!=typeof module&&module.exports&&(exports.driver=driver);

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
