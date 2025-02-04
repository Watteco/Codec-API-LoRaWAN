"use strict";function _readOnlyError(e){throw new TypeError('"'+e+'" is read-only')}function _defineProperties(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,_toPropertyKey(r.key),r)}}function _createClass(e,t,a){return t&&_defineProperties(e.prototype,t),a&&_defineProperties(e,a),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){var t=_toPrimitive(e,"string");return"symbol"==_typeof(t)?t:t+""}function _toPrimitive(e,t){if("object"!=_typeof(e)||!e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var r=a.call(e,t||"default");if("object"!=_typeof(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _callSuper(e,t,a){return t=_getPrototypeOf(t),_possibleConstructorReturn(e,_isNativeReflectConstruct()?Reflect.construct(t,a||[],_getPrototypeOf(e).constructor):t.apply(e,a))}function _possibleConstructorReturn(e,t){if(t&&("object"==_typeof(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(e)}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_setPrototypeOf(e,t)}function _wrapNativeSuper(e){var t="function"==typeof Map?new Map:void 0;return _wrapNativeSuper=function(e){if(null===e||!_isNativeFunction(e))return e;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,a)}function a(){return _construct(e,arguments,_getPrototypeOf(this).constructor)}return a.prototype=Object.create(e.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),_setPrototypeOf(a,e)},_wrapNativeSuper(e)}function _construct(e,t,a){if(_isNativeReflectConstruct())return Reflect.construct.apply(null,arguments);var r=[null];r.push.apply(r,t);var n=new(e.bind.apply(e,r));return a&&_setPrototypeOf(n,a.prototype),n}function _isNativeReflectConstruct(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(_isNativeReflectConstruct=function(){return!!e})()}function _isNativeFunction(e){try{return-1!==Function.toString.call(e).indexOf("[native code]")}catch(t){return"function"==typeof e}}function _setPrototypeOf(e,t){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},_setPrototypeOf(e,t)}function _getPrototypeOf(e){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},_getPrototypeOf(e)}function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}var driver;!function(){var e={24:function(e){var t=[];t[0]=0,t[1]=1,t[2]=4,t[3]=4,t[4]=8,t[5]=8,t[6]=16,t[7]=16,t[8]=24,t[9]=24,t[10]=32,t[11]=32,t[12]=32;var a=[[{sz:2,lbl:0},{sz:2,lbl:1},{sz:2,lbl:3},{sz:3,lbl:5},{sz:4,lbl:9},{sz:5,lbl:17},{sz:6,lbl:33},{sz:7,lbl:65},{sz:8,lbl:129},{sz:10,lbl:512},{sz:11,lbl:1026},{sz:11,lbl:1027},{sz:11,lbl:1028},{sz:11,lbl:1029},{sz:11,lbl:1030},{sz:11,lbl:1031}],[{sz:7,lbl:111},{sz:5,lbl:26},{sz:4,lbl:12},{sz:3,lbl:3},{sz:3,lbl:7},{sz:2,lbl:2},{sz:2,lbl:0},{sz:3,lbl:2},{sz:6,lbl:54},{sz:9,lbl:443},{sz:9,lbl:441},{sz:10,lbl:885},{sz:10,lbl:884},{sz:10,lbl:880},{sz:11,lbl:1763},{sz:11,lbl:1762}],[{sz:4,lbl:9},{sz:3,lbl:5},{sz:2,lbl:0},{sz:2,lbl:1},{sz:2,lbl:3},{sz:5,lbl:17},{sz:6,lbl:33},{sz:7,lbl:65},{sz:8,lbl:129},{sz:10,lbl:512},{sz:11,lbl:1026},{sz:11,lbl:1027},{sz:11,lbl:1028},{sz:11,lbl:1029},{sz:11,lbl:1030},{sz:11,lbl:1031}]];function r(e,t,a,r){return{uncompressSamples:[{data_relative_timestamp:r,data:{value:s(e,t),label:a}}],codingType:0,codingTable:0,resolution:null}}function n(e,t){for(var a=0;a<e.length;a++)if(e[a].taglbl===t.lbl)return a;throw new Error("Batch : Cannot find i1 in argList")}function i(e,t){if(t){var a=e.getNextBifromHi(1);return o(e,t,a)}return e.getNextSample(10)}function o(e,t,a){return a>14?e.getNextSample(10):a>0?function(e,t,a){return e.getNextSample(10,a)+t+Math.pow(2,a)-1}(e,t,a):t}function s(e,t){var a=e.getNextSample(t);return 12===t?function(e){var t=2147483648&e?-1:1,a=(e>>23&255)-127,r=8388607&e;if(128===a)return t*(r?Number.NaN:Number.POSITIVE_INFINITY);if(-127===a){if(0===r)return 0*t;a=-126,r/=1<<22}else r=(r|1<<23)/(1<<23);return t*r*Math.pow(2,a)}(a):a}function d(e,t,a,r,n){var i=e.getNextSample(6,n);return 0===a?function(e,t,a,r){return e>=Math.pow(2,r-1)?e*t+a:(e+1-Math.pow(2,r))*t+a}(i,r,t,n):1===a?(i+Math.pow(2,n)-1)*r+t:t-(i+(Math.pow(2,n)-1))*r}Math.trunc=Math.trunc||function(e){return isNaN(e)?NaN:e>0?Math.floor(e):Math.ceil(e)},e.exports={normalisation_batch:function(e){for(var s=e.date,c=function(e,s,c,l){var _=function(){for(var e=[],t=0;t<16;)e.push({codingType:0,codingTable:0,resolution:null,uncompressSamples:[]}),t+=1;return{batch_counter:0,batch_relative_timestamp:0,series:e}}(),u=function(e){function r(e,t,a){var r=t,n=a-1;if(8*e.length<r+a)throw new Error("Batch : Verify that dest buf is large enough");for(var i=0,o=0;a>0;)e[r>>3]&1<<(7&r)&&(o|=1<<n-i),a--,i++,r++;return o}return{i1:0,byteArray:e,getNextSample:function(e,a){var r=a||t[e],n=this.i1;if(this.i1+=r,12===e&&32!==r)throw new Error("Batch : Mauvais sampletype");var i=0,o=Math.trunc((r-1)/8)+1,s=r%8;for(0===s&&o>0&&(s=8);o>0;){for(var d=0;s>0;){var c=n>>3;this.byteArray[c]&1<<(7&n)&&(i|=1<<8*(o-1)+d),s--,d++,n+=1}o--,s=8}if((3==e||5==e||7==e||9==e)&&i&1<<r-1)for(var l=r;l<32;l++)i|=1<<l,r++;return i},getNextBifromHi:function(e){for(var t=2;t<12;t++)for(var n=r(this.byteArray,this.i1,t),i=0;i<a[e].length;i++)if(a[e][i].sz==t&&n==a[e][i].lbl)return this.i1+=t,i;throw new Error("Bi not found in HUFF table")}}}(function(e){for(var t=[];e.length>=2;)t.push(parseInt(e.substring(0,2),16)),e=e.substring(2,e.length);return t}(c)),p=function(e){for(var t=e.toString(2);t.length<8;)t="0"+t;return{isCommonTimestamp:parseInt(t[t.length-2],2),hasSample:!parseInt(t[t.length-3],2),batch_req:parseInt(t[t.length-4],2),nb_of_type_measure:parseInt(t.substring(0,4),2)}}(u.getNextSample(4));_.batch_counter=u.getNextSample(4,3),u.getNextSample(4,1);var f=function(e,t,a,o,s){for(var d=0,c=0,l=0;l<o.nb_of_type_measure;l++){var _={size:s,lbl:t.getNextSample(4,s)},u=n(a,_);0===l&&(c=u),d=i(t,d),e.series[u]=r(t,a[u].sampletype,_.lbl,d),o.hasSample&&(e.series[u].codingType=t.getNextSample(4,2),e.series[u].codingTable=t.getNextSample(4,2))}return{last_timestamp:d,i1_of_the_first_sample:c}}(_,u,s,p,e),m=f.last_timestamp,v=f.i1_of_the_first_sample;return p.hasSample&&(m=function(e,t,a,r,i,s,c){return s.isCommonTimestamp?function(e,t,a,r,i,o){for(var s=t.getNextSample(4,8),c={},l=function(e,t,a,r){for(var n=[],i=0,o=t.getNextSample(4,2),s=0;s<a;s++){var d=t.getNextBifromHi(o);if(d<=14)if(0===s)n.push(e.series[r].uncompressSamples[0].data_relative_timestamp);else{var c=n[s-1];d>0?n.push(t.getNextSample(10,d)+c+Math.pow(2,d)-1):n.push(c)}else n.push(t.getNextSample(10));i=n[s]}return{timestampCommon:n,lastTimestamp:i}}(e,t,s,a),_=l.timestampCommon,u=l.lastTimestamp,p=0;p<i.nb_of_type_measure;p++){var f=1;c.lbl=t.getNextSample(4,o);for(var m=n(r,c),v=0;v<s;v++)if(t.getNextSample(4,1)){var g=t.getNextBifromHi(e.series[m].codingTable),y={data_relative_timestamp:0,data:{}};if(g<=14){var h=e.series[m].uncompressSamples[e.series[m].uncompressSamples.length-1].data.value;if(g>0)y.data.value=d(t,h,e.series[m].codingType,r[m].resol,g);else{if(f){f=0;continue}y.data.value=h}}else y.data.value=t.getNextSample(r[m].sampletype);y.data_relative_timestamp=_[v],e.series[m].uncompressSamples.push(y)}}return u}(e,t,a,r,s,c):function(e,t,a,r,i,s){for(var c={},l=0;l<i.nb_of_type_measure;l++){c.lbl=t.getNextSample(4,s);var _=n(a,c),u=t.getNextSample(4,8);if(u)for(var p=t.getNextSample(4,2),f=0;f<u;f++){var m=e.series[_].uncompressSamples[e.series[_].uncompressSamples.length-1].data_relative_timestamp,v={data_relative_timestamp:0,data:{}},g=t.getNextBifromHi(p);if(v.data_relative_timestamp=o(t,m,g),v.data_relative_timestamp>r&&(r=v.data_relative_timestamp),(g=t.getNextBifromHi(e.series[_].codingTable))<=14){var y=e.series[_].uncompressSamples[e.series[_].uncompressSamples.length-1].data.value;v.data.value=g>0?d(t,y,e.series[_].codingType,a[_].resol,g):y}else v.data.value=t.getNextSample(a[_].sampletype);e.series[_].uncompressSamples.push(v)}}return r}(e,t,r,i,s,c)}(_,u,v,s,m,p,e)),_.batch_relative_timestamp=i(u,m),function(e,t,a){var r={batch_counter:e.batch_counter,batch_relative_timestamp:e.batch_relative_timestamp};return a&&(r.batch_absolute_timestamp=a),r.dataset=e.series.reduce((function(r,n,i){return r.concat(n.uncompressSamples.map((function(r){var n,o,s,d={data_relative_timestamp:r.data_relative_timestamp,data:{value:t[i].divide?r.data.value/t[i].divide:r.data.value,label:t[i].taglbl}};return t[i].lblname&&(d.data.label_name=t[i].lblname),a&&(d.data_absolute_timestamp=(n=a,o=e.batch_relative_timestamp,s=r.data_relative_timestamp,new Date(new Date(n).getTime()-1e3*(o-s)).toISOString())),d})))}),[]),r}(_,s,l)}(e.batch1,e.batch2,e.payload,s),l=[],_=0;_<c.dataset.length;_++){var u=c.dataset[_],p={variable:u.data.label_name,value:u.data.value,date:u.data_absolute_timestamp};l.push(p)}return l}}},787:function(e){e.exports={UintToInt:function(e,t){if(t<1||t>4)throw new Error("Unsupported Size");return 1===t&&(128&e)>0?e-=256:2===t&&(32768&e)>0?e-=65536:3===t&&(8388608&e)>0?e-=16777216:4===t&&(2147483648&e)>0&&(e-=4294967296),e},Bytes2Float32:function(e){var t=2147483648&e?-1:1,a=(e>>23&255)-127,r=8388607&e;if(128===a)return t*(r?Number.NaN:Number.POSITIVE_INFINITY);if(-127===a){if(0===r)return 0;a=-126,r/=1<<23}else r=(r|1<<23)/(1<<23);return t*r*Math.pow(2,a)},BytesToInt64:function(e,t,a,r){void 0===r&&(r=!1);var n,i,o="U"!=a.substr(0,1),s=parseInt(a.substr(1,2),10)/8,d=s;r?(n=-1,i=t+s-1):(n=1,i=t);for(var c=0,l=i;d>0;l+=n,d--)c=(c<<8)+e[l];return o&&s<8&&128&e[i]&&(c-=1<<8*s),c},decimalToHex:function(e,t){var a=e.toString(16).toUpperCase();for(t=null!=t?t:2;a.length<t;)a="0"+a;return"0x"+a},zeroPad:function(e,t){for(var a=String(e);a.length<t;)a="0"+a;return a},BytesToHexStr:function(e){for(var t="",a=0;a<e.length;a++){var r=e[a].toString(16).toUpperCase();1===r.length&&(r="0"+r),t+=r}return t}}},338:function(e,t,a){var r=a(295),n=a(24);function i(e){var t,a=null==(t=e)?{}:Array.isArray(t)?{samples:t}:"object"==_typeof(t)?t:"string"==typeof t||"number"==typeof t?{value:t}:{};if(!a.samples||!Array.isArray(a.samples))return a;var r=a.samples,n={};r.forEach((function(e){if("object"==_typeof(e)&&e.variable&&void 0!==e.value&&e.date){var t=e.variable,a=e.value,r=e.date;(!n[t]||new Date(r)>new Date(n[t].date))&&(n[t]={value:a,date:r})}}));var i={};for(var o in a)a.hasOwnProperty(o)&&(i[o]=a[o]);for(var s in n)n.hasOwnProperty(s)&&!i.hasOwnProperty(s)&&(i[s]=n[s].value);return i}e.exports={watteco_decodeUplink:function(e,t,a){e.bytes,e.fPort;var o=e.recvTime;try{var s=r.normalisation_standard(e,a),d=s.payload;if("batch"!==s.type)return{data:i(s.data),warnings:s.warning};var c={batch1:t[0],batch2:t[1],payload:d,date:o};try{return{data:i(n.normalisation_batch(c)),warnings:[]}}catch(e){return{errors:e.message,warnings:[]}}}catch(e){return{errors:e.message,warnings:[]}}}}},295:function(e,t,a){var r=a(787),n=r.UintToInt,i=r.Bytes2Float32,o=r.BytesToInt64,s=r.decimalToHex,d=r.zeroPad,c=(r.BytesToHexStr,function(){function e(t){var a;return _classCallCheck(this,e),(a=_callSuper(this,e,[t])).name="ValidationError",a}return _inherits(e,_wrapNativeSuper(Error)),_createClass(e)}()),l={16:{name:"boolean",size:1},8:{name:"general8",size:1},9:{name:"general16",size:2},10:{name:"general24",size:3},11:{name:"general32",size:4},24:{name:"bitmap8",size:1},25:{name:"bitmap16",size:2},32:{name:"uint8",size:1},33:{name:"uint16",size:2},34:{name:"uint24",size:3},35:{name:"uint32",size:4},40:{name:"int8",size:1},41:{name:"int16",size:2},43:{name:"int32",size:4},48:{name:"enum8",size:1},66:{name:"char string",size:1},65:{name:"bytes string",size:1},67:{name:"long bytes string",size:2},76:{name:"structured ordered sequence",size:2},57:{name:"single",size:4}},_={32778:{0:{0:{divider:1,function_type:"int",name:"positive_active_energy",size:4},1:{divider:1,function_type:"int",name:"negative_active_energy",size:4},2:{divider:1,function_type:"int",name:"positive_reactive_energy",size:4},3:{divider:1,function_type:"int",name:"negative_reactive_energy",size:4},4:{divider:1,function_type:"int",name:"positive_active_power",size:4},5:{divider:1,function_type:"int",name:"negative_active_power",size:4},6:{divider:1,function_type:"int",name:"positive_reactive_power",size:4},7:{divider:1,function_type:"int",name:"negative_reactive_power",size:4}}},32784:{0:{0:{divider:1,function_type:"int",name:"active_energy_a",size:4},1:{divider:1,function_type:"int",name:"reactive_energy_a",size:4},2:{divider:1,function_type:"int",name:"active_energy_b",size:4},3:{divider:1,function_type:"int",name:"reactive_energy_b",size:4},4:{divider:1,function_type:"int",name:"active_energy_c",size:4},5:{divider:1,function_type:"int",name:"reactive_energy_c",size:4},6:{divider:1,function_type:"int",name:"active_energy_abc",size:4},7:{divider:1,function_type:"int",name:"reactive_energy_abc",size:4}},1:{0:{divider:1,function_type:"int",name:"active_power_a",size:4},1:{divider:1,function_type:"int",name:"reactive_power_a",size:4},2:{divider:1,function_type:"int",name:"active_power_b",size:4},3:{divider:1,function_type:"int",name:"reactive_power_b",size:4},4:{divider:1,function_type:"int",name:"active_power_c",size:4},5:{divider:1,function_type:"int",name:"reactive_power_c",size:4},6:{divider:1,function_type:"int",name:"active_power_abc",size:4},7:{divider:1,function_type:"int",name:"reactive_power_abc",size:4}}},32779:{0:{0:{divider:10,function_type:"int",name:"Vrms",size:2},1:{divider:10,function_type:"int",name:"Irms",size:2},2:{divider:1,function_type:"int",name:"angle",size:2}}},32781:{0:{0:{divider:10,function_type:"int",name:"Vrms_a",size:2},1:{divider:10,function_type:"int",name:"Irms_a",size:2},2:{divider:1,function_type:"int",name:"angle_a",size:2},3:{divider:10,function_type:"int",name:"Vrms_b",size:2},4:{divider:10,function_type:"int",name:"Irms_b",size:2},5:{divider:1,function_type:"int",name:"angle_b",size:2},6:{divider:10,function_type:"int",name:"Vrms_c",size:2},7:{divider:10,function_type:"int",name:"Irms_c",size:2},8:{divider:1,function_type:"int",name:"angle_c",size:2}}},32850:{0:{0:{divider:1e3,function_type:"int",name:"frequency",size:2},1:{divider:1e3,function_type:"int",name:"frequency_min",size:2},2:{divider:1e3,function_type:"int",name:"frequency_max",size:2},3:{divider:10,function_type:"int",name:"Vrms",size:2},4:{divider:10,function_type:"int",name:"Vrms_min",size:2},5:{divider:10,function_type:"int",name:"Vrms_max",size:2},6:{divider:10,function_type:"int",name:"Vpeak",size:2},7:{divider:10,function_type:"int",name:"Vpeak_min",size:2},8:{divider:10,function_type:"int",name:"Vpeak_max",size:2},9:{divider:1,function_type:"int",name:"over_voltage",size:2},10:{divider:1,function_type:"int",name:"sag_voltage",size:2}}},32773:{0:{0:{divider:1,function_type:"none",name:"pin_state_1",size:1},1:{divider:1,function_type:"none",name:"pin_state_2",size:1},2:{divider:1,function_type:"none",name:"pin_state_3",size:1},3:{divider:1,function_type:"none",name:"pin_state_4",size:1},4:{divider:1,function_type:"none",name:"pin_state_5",size:1},5:{divider:1,function_type:"none",name:"pin_state_6",size:1},6:{divider:1,function_type:"none",name:"pin_state_7",size:1},7:{divider:1,function_type:"none",name:"pin_state_8",size:1},8:{divider:1,function_type:"none",name:"pin_state_9",size:1},9:{divider:1,function_type:"none",name:"pin_state_10",size:1}}},80:{6:{0:{divider:1e3,function_type:"none",name:"power_modes",size:2},1:{divider:1e3,function_type:"none",name:"current_power_source",size:2},2:{divider:1e3,function_type:"none",name:"constant_power",size:2},3:{divider:1e3,function_type:"none",name:"rechargeable_battery",size:2},4:{divider:1e3,function_type:"none",name:"disposable_battery",size:2},5:{divider:1e3,function_type:"none",name:"solar_harvesting",size:2},6:{divider:1e3,function_type:"none",name:"TIC_harvesting",size:2}}}};function u(e){var t="",a=e.toString(2);return t+=d(a,8)}function p(e,t,a,r,o,s,d,c,u,p){if(138===e||10==e){var f=l[d],m=u,v=f.size,g=f.name;void 0===m&&(m="single"===g?"float":"int8"===g||"int16"===g||"int32"===g?"int":"none");var y=function(e,t,a,r,o,s,d,c,l){var u={reportCauses:[],causesMessages:[]};138===e&&u.causesMessages.push("alarm triggered");var p=o;if(p>=r.length)return u;var f=!1,m=3&(r[o]>>=4);if(2==m)f=!0;else if(1!=m)throw new Error("Alarm decoding: Unexpected cause type. (ReportParams byte = ".concat(r[o],")"));if(++p>=r.length)throw new Error("Alarm decoding: Unexpected end of causes.)");function v(e,t,a){if(p+t-1>=r.length)throw new Error("Alarm decoding: Unexpected end of data while reading value.");for(var o=0,s=0;s<t;s++)o=o<<8|r[p++];if("int"===e)o=n(o,t);else{if("float"!==e)throw new Error("Alarm decoding: Unknown type kind: "+e);if(4!==t)throw new Error("Alarm decoding: Invalid float size. Only 4 bytes are supported.");o=i(o)}return o/a}for(;p<r.length;){var g={};if(p>=r.length)throw new Error("Alarm decoding: Unexpected end of data before reading CSD.");var y=r[p++];g.criterionIndex=7&y;var h=y>>3&3;g.mode=1===h?"delta":2===h?"threshold":"unused",g.hasFallen=!!(32&y),g.hasExceeded=!!(64&y),g.isAlarm=!!(128&y);var b=void 0,z=void 0,w=void 0,x=void 0,S=void 0,N=void 0,I=void 0,U=g.hasExceeded&&g.hasFallen?"exceed&fall":g.hasExceeded?"exceed":g.hasFallen?"fall":"",T=null;if(f){if(p>=r.length)throw new Error("Alarm decoding: Unexpected end of data before reading FI.");var P=s,O=d,C=c;if(g.fieldIndex=0,null!=l&&!0===l&&(T=r[p++],g.fieldIndex=T,_[t]&&_[t][a]&&_[t][a][T])){var E=_[t][a][T];P=E.function_type||s,O=E.size||d,C=E.divider||c,N=E.name||"FieldUndef !"}b=v(P,O,C),"threshold"===g.mode&&(z=v(P,O,C))}if("threshold"===g.mode&&f){if(p>=r.length)throw new Error("Alarm decoding: Unexpected end of data before reading Occ.");var M=r[p++];if(w=M,M>0&&128&M){if(p+3>=r.length)throw new Error("Alarm decoding: Invalid OccH or OccL read.");x=r[p++]<<8|r[p++],S=r[p++]<<8|r[p++]}}u.reportCauses.push(g),f?(I="threshold"===g.mode?void 0!==x?"cause:{alarm:".concat(g.isAlarm,", criterion_index: ").concat(g.criterionIndex,", mode: threshold, crossing: ").concat(U,", value: ").concat(b,", gap: ").concat(z,", occurences_up: ").concat(x,", occurences_down: ").concat(S):"cause:{alarm:".concat(g.isAlarm,", criterion_index: ").concat(g.criterionIndex,", mode: threshold, crossing: ").concat(U,", value: ").concat(b,", gap: ").concat(z,", occurences: ").concat(w):"cause:{alarm:".concat(g.isAlarm,", criterion_index: ").concat(g.criterionIndex,", mode: delta, value: ").concat(b),N&&(I+=", field: ".concat(N)),I+="}"):(I="cause:{alarm:".concat(g.isAlarm,", criterion_index: ").concat(g.criterionIndex,", mode: ").concat(g.mode),"threshold"===g.mode&&(I+=", crossing: ".concat(U)),I+="}"),u.causesMessages.push(I)}if(p!==r.length)throw new Error("Alarm decoding: Remaining unprocessed bytes detected. Expected ".concat(r.length,", but stopped at ").concat(p,"."));return u}(e,t,a,r,s,m,v,c,p);o.zclheader.alarmmsg=y.causesMessages}}e.exports={normalisation_standard:function(e,t){var a=[],r=e.bytes,d=function(e,t){var a={},r=0;a.lora={},a.lora.port=t;var d=e.length,l="";a.lora.payload="";for(var _=0;_<d;_++){1===(l=e[_].toString(16).toUpperCase()).length&&(l="0"+l),a.lora.payload+=l;var f=new Date;a.lora.date=f.toISOString()}if(125===t)if(0==!(1&e[0])){a.zclheader={},a.zclheader.report="standard";var m,v,g=-1;if(a.zclheader.endpoint=(224&e[0])>>5|(6&e[0])<<2,m=e[1],a.zclheader.cmdID=s(m,2),v=256*e[2]+e[3],a.zclheader.clustID=s(v,4),10===m||138===m||1===m){r=1,a.data={},g=256*e[4]+e[5],a.zclheader.attID=s(g,4);var y=e[4],h=0;if(10!==m&&138!==m||(h=7),138===m&&(a.zclheader.alarm=1),1===m&&(h=8,a.zclheader.status=e[6]),83===v||84===v||85===v||86===v||87===v){if("function"!=typeof globalThis.TIC_Decode)throw new c("TIC_Decode function not found");a.data=globalThis.TIC_Decode(v,g,e.slice(h+1))}if(0===v&&2===g){a.data.firmware="";for(var b=0;b<3;b++)a.data.firmware+=String(e[h+b]),b<2&&(a.data.firmware+=".");var z=256*e[h+3]*256+256*e[h+4]+e[h+5];a.data.firmware+="."+z.toString()}if(0===v&&3===g){var w=e[h];a.data.kernel="";for(var x=0;x<w;x++)a.data.kernel+=String.fromCharCode(e[h+1+x])}if(0===v&&4===g){var S=e[h];a.data.manufacturer="";for(var N=0;N<S;N++)a.data.manufacturer+=String.fromCharCode(e[h+1+N])}if(0===v&&5===g){var I=e[h];a.data.model="";for(var U=0;U<I;U++)a.data.model+=String.fromCharCode(e[h+1+U])}if(0===v&&6===g){var T=e[h];a.data.date="";for(var P=0;P<T;P++)a.data.date+=String.fromCharCode(e[h+1+P])}if(0===v&&16===g){var O=e[h];a.data.position="";for(var C=0;C<O;C++)a.data.position+=String.fromCharCode(e[h+1+C])}if(0===v&&32769===g){var E=e[h];a.data.application_name="";for(var M=0;M<E;M++)a.data.application_name+=String.fromCharCode(e[h+1+M])}if(1026===v&&0===g){var A=e[h-1];a.data.temperature=n(256*e[h]+e[h+1],2)/100,p(m,v,g,e,a,h+2,A,100,"int")}if(1026===v&&1===g&&(a.data.min_temperature=n(256*e[h]+e[h+1],2)/100),1026===v&&2===g&&(a.data.max_temperature=n(256*e[h]+e[h+1],2)/100),1029===v&&0===g){var q=e[h-1];a.data.humidity=(256*e[h]+e[h+1])/100,p(m,v,g,e,a,h+2,q,100,"none")}if(1029===v&&1===g&&(a.data.min_humidity=(256*e[h]+e[h+1])/100),1029===v&&2===g&&(a.data.max_humidity=(256*e[h]+e[h+1])/100),15===v&&1026===g){var D=e[h-1];a.data.index=256*e[h]*256*256+256*e[h+1]*256+256*e[h+2]+e[h+3],p(m,v,g,e,a,h+4,D,1,"none")}if(15===v&&85===g){var V=e[h-1];a.data.pin_state=!!e[h],p(m,v,g,e,a,h+1,V,1,"none")}if(15===v&&84===g&&(0===e[h]&&(a.data.polarity="normal"),1===e[h]&&(a.data.polarity="reverse")),15===v&&1024===g&&(0===e[h]&&(a.data.edge_selection="none"),1===e[h]&&(a.data.edge_selection="falling edge"),2===e[h]&&(a.data.edge_selection="rising edge"),3===e[h]&&(a.data.edge_selection="both edges"),5===e[h]&&(a.data.edge_selection="polling and falling edge"),6===e[h]&&(a.data.edge_selection="polling and rising edge"),7===e[h]&&(a.data.edge_selection="polling and both edges")),15===v&&1025===g&&(a.data.debounce_period=e[h]),15===v&&1027===g&&(a.data.poll_period=e[h]),15===v&&1028===g&&(a.data.force_notify=e[h]),19===v&&85===g){var k=e[h-1];a.data.output_value=e[h],p(m,v,g,e,a,h+1,k,1,"none")}if(6===v&&0===g){var H=e[h];a.data.output=1===H?"ON":"OFF"}if(32776===v&&0===g){var B=e[h-1];a.data.differential_pressure=256*e[h]+e[h+1],p(m,v,g,e,a,h+2,B,1,"none")}if(32773===v&&0===g){var F=e[h-1];a.data.pin_state_1=!(1&~e[h+1]),a.data.pin_state_2=!(2&~e[h+1]),a.data.pin_state_3=!(4&~e[h+1]),a.data.pin_state_4=!(8&~e[h+1]),a.data.pin_state_5=!(16&~e[h+1]),a.data.pin_state_6=!(32&~e[h+1]),a.data.pin_state_7=!(64&~e[h+1]),a.data.pin_state_8=!(128&~e[h+1]),a.data.pin_state_9=!(1&~e[h]),a.data.pin_state_10=!(2&~e[h]),p(m,v,g,e,a,h+2,F,100,"none")}if(32774===v&&0===g&&(a.data.speed=256*e[h]*256+256*e[h+1]+e[h+2]),32774===v&&1===g&&(a.data.data_bit=e[h]),32774===v&&2===g&&(a.data.parity=e[h]),32774===v&&3===g&&(a.data.stop_bit=e[h]),12===v&&85===g){var j=e[h-1];a.data.analog=i(256*e[h]*256*256+256*e[h+1]*256+256*e[h+2]+e[h+3]),p(m,v,g,e,a,h+4,j,1,"float")}if(12===v&&256===g&&(5===e[h+1]&&(a.data.type="ppm"),255===e[h+1]&&0===e[h+3]&&(a.data.type="mA"),255===e[h+1]&&1===e[h+3]&&(a.data.type="mV")),12===v&&32771===g&&(a.data.power_duration=256*e[h]+e[h+1]),12===v&&32772===g){var R={},G=u(e[h]),Y=u(e[h+1]),X=2*G[0]+G[1];0===X&&(R.mode="idle"),1===X&&(R.mode="chock"),2===X&&(R.mode="click");var Z=8*G[2]+4*G[3]+2*G[4]+G[5];0===Z&&(R.frequency="idle"),1===Z&&(R.frequency="1Hz"),2===Z&&(R.frequency="10Hz"),3===Z&&(R.frequency="25Hz"),4===Z&&(R.frequency="50Hz"),5===Z&&(R.frequency="100Hz"),6===Z&&(R.frequency="200Hz"),7===Z&&(R.frequency="400Hz"),8===Z&&(R.frequency="1620Hz"),9===Z&&(R.frequency="5376Hz"),R.range={};var K=2*G[6]+G[7];0===K&&(R.range.precision="+/- 2g",R.range.value=16),1===K&&(R.range.precision="+/- 4g",R.range.value=32),2===K&&(R.range.precision="+/- 8g",R.range.value=64),3===K&&(R.range.precision="+/- 16g",R.range.value=128);var L=128*Y[0]+64*Y[1]+32*Y[2]+16*Y[3]+8*Y[4]+4*Y[5]+2*Y[6]+Y[7];R.threshold=L*R.range.value}if(32775===v&&1===g){a.data.modbus_payload="";for(var W=e[h],J=0;J<W;J++)l=e[h+J+1].toString(16).toUpperCase(),0===J?a.data.modbus_slaveID=e[h+J+1]:1===J?a.data.modbus_fnctID=e[h+J+1]:2===J?a.data.modbus_datasize=e[h+J+1]:a.data.modbus_payload+=l}if(32777===v&&0===g){var Q=e[h+2]<<8|e[h+3];a.data.modbus_frame_series_sent=e[h+1],a.data.modbus_frame_number_in_serie=(57344&Q)>>13,a.data.modbus_last_frame_of_serie=(7168&Q)>>10;for(var $=0;$<=9;$++)a.data["modbus_EP".concat($)]=!!(Q&1<<$);function Fe(e,t,a,r,n,i){if(!0===e){if(0===a&&(n.data["modbus_slaveID_EP".concat(i)]=r[t],n.data["modbus_fnctID_EP".concat(i)]=r[t+1],n.data["modbus_datasize_EP".concat(i)]=r[t+2],t+=3),n.data["modbus_payload_EP".concat(i)]="",void 0===r[t])return n;for(var o=0;o<n.data["modbus_datasize_EP".concat(i)];o++){var s=r[t+o].toString(16).toUpperCase();1===s.length&&(s="0"+s),n.data["modbus_payload_EP".concat(i)]+=s}t+=n.data["modbus_datasize_EP".concat(i)]}return t}for(var ee=h+4,te=0;te<=9;te++)ee=Fe(a.data["modbus_EP".concat(te)],ee,0,e,a,te)}if(82===v&&0===g&&(a.data.active_energy=n(256*e[h+1]*256+256*e[h+2]+e[h+3],3),a.data.reactive_energy=n(256*e[h+4]*256+256*e[h+5]+e[h+6],3),a.data.nb_samples=256*e[h+7]+e[h+8],a.data.active_power=n(256*e[h+9]+e[h+10],2),a.data.reactive_power=n(256*e[h+11]+e[h+12],2)),32772===v&&0===g&&(1===e[h]&&(a.data.message_type="confirmed"),0===e[h]&&(a.data.message_type="unconfirmed")),32772===v&&1===g&&(a.data.nb_retry=e[h]),32772===v&&2===g&&(a.data.automatic_association={},a.data.automatic_association.period_in_minutes=256*e[h+1]+e[h+2],a.data.automatic_association.nb_err_frames=256*e[h+3]+e[h+4]),32772===v&&3===g&&(a.data.data_rate=e[h+2]),32772===v&&4===g){a.data.ABP_dev_address="";for(var ae=0;ae<4;ae++)a.data.ABP_dev_address+=String(e[h+1+ae]),ae<3&&(a.data.ABP_dev_address+=".")}if(32772===v&&5===g){a.data.OTA_app_EUI="";for(var re=0;re<8;re++)a.data.OTA_app_EUI+=String(e[h+1+re]),re<7&&(a.data.OTA_app_EUI+=".")}if(80===v&&4===g){e[h],e[h+1];for(var ne={},ie=e[h+2],oe=0;oe<ie;oe++){var se={};se.endpoint=e[h+3+7*oe];var de=e[h+4+7*oe];se.input_clusters=[];for(var ce=0;ce<de;ce++)se.input_clusters[ce]=s(256*e[h+5+7*oe+2*ce]+e[h+6+7*oe+2*ce],4);var le=e[h+5+7*oe+2*de];se.output_clusters=[];for(var _e=0;_e<le;_e++)se.output_clusters[_e]=s(256*e[h+6+7*oe+2*_e]+e[h+7+7*oe+2*_e],4);ne[oe]=se}a.data.configuration=ne}if(80===v&&6===g){var ue=h+3,pe=e[h-1];1&~e[h+2]||(a.data.main_or_external_voltage=(256*e[ue]+e[ue+1])/1e3,ue+=2),2&~e[h+2]||(a.data.rechargeable_battery_voltage=(256*e[ue]+e[ue+1])/1e3,ue+=2),4&~e[h+2]||(a.data.disposable_battery_voltage=(256*e[ue]+e[ue+1])/1e3,ue+=2),8&~e[h+2]||(a.data.solar_harvesting_voltage=(256*e[ue]+e[ue+1])/1e3,ue+=2),16&~e[h+2]||(a.data.tic_harvesting_voltage=(256*e[ue]+e[ue+1])/1e3,ue+=2),p(m,v,g,e,a,ue+1,pe,1e3,"multistate",!0)}if(80===v&&255===y){var fe="action "+e[5].toString();a.data[fe]="";for(var me=e[h+1],ve="none",ge=0;ge<me;ge++)ve+=String.fromCharCode(e[h+1+ge]);a.data[fe]=ve}if(32778===v&&0===g){var ye=h,he=e[ye-1];a.data.positive_active_energy=n(256*e[ye+1]*256*256+256*e[ye+2]*256+256*e[ye+3]+e[ye+4],4),ye+=4,a.data.negative_active_energy=n(256*e[ye+1]*256*256+256*e[ye+2]*256+256*e[ye+3]+e[ye+4],4),ye+=4,a.data.positive_reactive_energy=n(256*e[ye+1]*256*256+256*e[ye+2]*256+256*e[ye+3]+e[ye+4],4),ye+=4,a.data.negative_reactive_energy=n(256*e[ye+1]*256*256+256*e[ye+2]*256+256*e[ye+3]+e[ye+4],4),ye+=4,a.data.positive_active_power=n(256*e[ye+1]*256*256+256*e[ye+2]*256+256*e[ye+3]+e[ye+4],4),ye+=4,a.data.negative_active_power=n(256*e[ye+1]*256*256+256*e[ye+2]*256+256*e[ye+3]+e[ye+4],4),ye+=4,a.data.positive_reactive_power=n(256*e[ye+1]*256*256+256*e[ye+2]*256+256*e[ye+3]+e[ye+4],4),ye+=4,a.data.negative_reactive_power=n(256*e[ye+1]*256*256+256*e[ye+2]*256+256*e[ye+3]+e[ye+4],4),p(m,v,g,e,a,ye+5,he,1,"multistate",!0)}if(32784===v&&0===g){var be=e[h-1];a.data.active_energy_a=n(256*e[h+1]*256*256+256*e[h+2]*256+256*e[h+3]+e[h+4]),a.data.reactive_energy_a=n(256*e[h+5]*256*256+256*e[h+6]*256+256*e[h+7]+e[h+8]),a.data.active_energy_b=n(256*e[h+9]*256*256+256*e[h+10]*256+256*e[h+11]+e[h+12]),a.data.reactive_energy_b=n(256*e[h+13]*256*256+256*e[h+14]*256+256*e[h+15]+e[h+16]),a.data.active_energy_c=n(256*e[h+17]*256*256+256*e[h+18]*256+256*e[h+19]+e[h+20]),a.data.reactive_energy_c=n(256*e[h+21]*256*256+256*e[h+22]*256+256*e[h+23]+e[h+24]),a.data.active_energy_abc=n(256*e[h+25]*256*256+256*e[h+26]*256+256*e[h+27]+e[h+28]),a.data.reactive_energy_abc=n(256*e[h+29]*256*256+256*e[h+30]*256+256*e[h+31]+e[h+32]),p(m,v,g,e,a,h+33,be,1,"multistate",!0)}else if(32784===v&&1===g){var ze=e[h-1];a.data.active_power_a=n(256*e[h+1]*256*256+256*e[h+2]*256+256*e[h+3]+e[h+4]),a.data.reactive_power_a=n(256*e[h+5]*256*256+256*e[h+6]*256+256*e[h+7]+e[h+8]),a.data.active_power_b=n(256*e[h+9]*256*256+256*e[h+10]*256+256*e[h+11]+e[h+12]),a.data.reactive_power_b=n(256*e[h+13]*256*256+256*e[h+14]*256+256*e[h+15]+e[h+16]),a.data.active_power_c=n(256*e[h+17]*256*256+256*e[h+18]*256+256*e[h+19]+e[h+20]),a.data.reactive_power_c=n(256*e[h+21]*256*256+256*e[h+22]*256+256*e[h+23]+e[h+24]),a.data.active_power_abc=n(256*e[h+25]*256*256+256*e[h+26]*256+256*e[h+27]+e[h+28]),a.data.reactive_power_abc=n(256*e[h+29]*256*256+256*e[h+30]*256+256*e[h+31]+e[h+32]),p(m,v,g,e,a,h+33,ze,1,"multistate",!0)}if(32779===v&&0===g){var we=h,xe=e[we-1];a.data.Vrms=n(256*e[we+1]+e[we+2],2)/10,we+=2,a.data.Irms=n(256*e[we+1]+e[we+2],2)/10,we+=2,a.data.angle=n(256*e[we+1]+e[we+2],2),p(m,v,g,e,a,we+3,xe,1,"multistate",!0)}if(32781===v&&0===g){var Se=e[h-1];a.data.Vrms_a=n(256*e[h+1]+e[h+2],2)/10,a.data.Irms_a=n(256*e[h+3]+e[h+4],2)/10,a.data.angle_a=n(256*e[h+5]+e[h+6],2),a.data.Vrms_b=n(256*e[h+7]+e[h+8],2)/10,a.data.Irms_b=n(256*e[h+9]+e[h+10],2)/10,a.data.angle_b=n(256*e[h+11]+e[h+12],2),a.data.Vrms_c=n(256*e[h+13]+e[h+14],2)/10,a.data.Irms_c=n(256*e[h+15]+e[h+16],2)/10,a.data.angle_c=n(256*e[h+17]+e[h+18],2),p(m,v,g,e,a,h+19,Se,1,"multistate",!0)}if(32780===v&&0===g){var Ne=e[h-1];a.data.concentration=256*e[h]+e[h+1],p(m,v,g,e,a,h+2,Ne,1,"none")}if(32780===v&&1===g&&(a.data.analog=e[h]),32780===v&&2===g&&(a.data.analog=e[h]),1024===v&&0===g){var Ie=e[h-1];a.data.illuminance=256*e[h]+e[h+1],p(m,v,g,e,a,h+2,Ie,1,"none")}if(1027===v&&0===g){var Ue=e[h-1];a.data.pressure=n(256*e[h]+e[h+1],2),p(m,v,g,e,a,h+2,Ue,1,"int")}if(1030===v&&0===g){var Te=e[h-1];a.data.occupancy=!!e[h],p(m,v,g,e,a,h+1,Te,1,"none")}if(32850===v&&0===g){var Pe=h;a.data.frequency=(n(256*e[Pe+1]+e[Pe+2],2)+22232)/1e3,Pe+=2,a.data.frequency_min=(n(256*e[Pe+1]+e[Pe+2],2)+22232)/1e3,Pe+=2,a.data.frequency_max=(n(256*e[Pe+1]+e[Pe+2],2)+22232)/1e3,Pe+=2,a.data.Vrms=n(256*e[Pe+1]+e[Pe+2],2)/10,Pe+=2,a.data.Vrms_min=n(256*e[Pe+1]+e[Pe+2],2)/10,Pe+=2,a.data.Vrms_max=n(256*e[Pe+1]+e[Pe+2],2)/10,Pe+=2,a.data.Vpeak=n(256*e[Pe+1]+e[Pe+2],2)/10,Pe+=2,a.data.Vpeak_min=n(256*e[Pe+1]+e[Pe+2],2)/10,Pe+=2,a.data.Vpeak_max=n(256*e[Pe+1]+e[Pe+2],2)/10,Pe+=2,a.data.over_voltage=n(256*e[Pe+1]+e[Pe+2],2),Pe+=2,a.data.sag_voltage=n(256*e[Pe+1]+e[Pe+2],2)}if(32783===v){var Oe=h+1;if(0===g){var Ce=a.data.last={};Ce.NbTriggedAcq=o(e,Oe,"U32"),Oe+=4,Ce.Mean_X_G=o(e,Oe,"U16")/100,Oe+=2,Ce.Max_X_G=o(e,Oe,"U16")/100,Oe+=2,Ce.Dt_X_ms=o(e,Oe,"U16"),Oe+=2,Ce.Mean_Y_G=o(e,Oe,"U16")/100,Oe+=2,Ce.Max_Y_G=o(e,Oe,"U16")/100,Oe+=2,Ce.Dt_Y_ms=o(e,Oe,"U16"),Oe+=2,Ce.Mean_Z_G=o(e,Oe,"U16")/100,Oe+=2,Ce.Max_Z_G=o(e,Oe,"U16")/100,Oe+=2,Ce.Dt_Z_ms=o(e,Oe,"U16")}else if(1===g||2===g||3===g){var Ee=1===g?"Stats_X":2===g?"Stats_Y":"Stats_Z",Me=a.data[Ee]={};Me.NbAcq=o(e,Oe,"U16"),Oe+=2,Me.MinMean_G=o(e,Oe,"U16")/100,Oe+=2,Me.MinMax_G=o(e,Oe,"U16")/100,Oe+=2,Me.MinDt=o(e,Oe,"U16"),Oe+=2,Me.MeanMean_G=o(e,Oe,"U16")/100,Oe+=2,Me.MeanMax_G=o(e,Oe,"U16")/100,Oe+=2,Me.MeanDt=o(e,Oe,"U16"),Oe+=2,Me.MaxMean_G=o(e,Oe,"U16")/100,Oe+=2,Me.MaxMax_G=o(e,Oe,"U16")/100,Oe+=2,Me.MaxDt=o(e,Oe,"U16"),Oe+=2}else if(32768===g){var Ae=a.data.params={};Ae.WaitFreq_Hz=o(e,Oe,"U16")/10,Oe+=2,Ae.AcqFreq_Hz=o(e,Oe,"U16")/10;var qe=o(e,Oe+=2,"U16");Oe+=2,32768&qe&&(qe=60*(-32769&qe)),Ae.NewWaitDelay_s=32768&qe?qe=60*(-32769&qe):qe,Ae.MaxAcqDuration_ms=o(e,Oe,"U16"),Oe+=2,Ae.Threshold_X_G=o(e,Oe,"U16")/100,Oe+=2,Ae.Threshold_Y_G=o(e,Oe,"U16")/100,Oe+=2,Ae.Threshold_Z_G=o(e,Oe,"U16")/100,Oe+=2,Ae.OverThrsh_Dt_ms=o(e,Oe,"U16"),Oe+=2,Ae.UnderThrsh_Dt_ms=o(e,Oe,"U16"),Oe+=2,Ae.Range_G=o(e,Oe,"U16")/100,Oe+=2,Ae.FilterSmoothCoef=o(e,Oe,"U8"),Oe+=1,Ae.FilterGainCoef=o(e,Oe,"U8"),Oe+=1,(Ae=a.data.Params.working_modes={}).SignalEachAcq=128&e[Oe]?"true":"false",Ae.RstAftStdRpt_X=1&e[Oe]?"true":"false",Ae.RstAftStdRpt_Y=2&e[Oe]?"true":"false",Ae.RstAftStdRpt_7=4&e[Oe]?"true":"false"}}var De=Object.keys(a.data)[0];if(void 0===a.data[De])throw new c("bad payload1");if(e.length<=7)throw new c("bad payload2")}if(7===m){r=1,g=256*e[6]+e[7],a.zclheader.attID=s(g,4),a.zclheader.status=e[4],a.zclheader.report_parameters={};var Ve=u(e[5]);a.zclheader.report_parameters.new_mode_configuration=Ve[0],"0"===Ve[2]&&"0"===Ve[3]&&(a.zclheader.report_parameters.cause_request="none"),"0"===Ve[2]&&"1"===Ve[3]&&(a.zclheader.report_parameters.cause_request="short"),"1"===Ve[2]&&"0"===Ve[3]&&(a.zclheader.report_parameters.cause_request="long"),"1"===Ve[2]&&"1"===Ve[3]&&(a.zclheader.report_parameters.cause_request="reserved"),a.zclheader.report_parameters.secured_if_alarm=Ve[4],a.zclheader.report_parameters.secured=Ve[5],a.zclheader.report_parameters.no_hearde_port=Ve[6],a.zclheader.report_parameters.batch=Ve[7]}if(9===m){r=1,g=256*e[6]+e[7],a.zclheader.attID=s(g,4),a.zclheader.status=e[4],a.zclheader.report_parameters={};var ke=u(e[5]);if(a.zclheader.report_parameters.new_mode_configuration=ke[0],"0"===ke[2]&&"0"===ke[3]&&(a.zclheader.report_parameters.cause_request="none"),"0"===ke[2]&&"1"===ke[3]&&(a.zclheader.report_parameters.cause_request="short"),"1"===ke[2]&&"0"===ke[3]&&(a.zclheader.report_parameters.cause_request="long"),"1"===ke[2]&&"1"===ke[3]&&(a.zclheader.report_parameters.cause_request="reserved"),a.zclheader.report_parameters.secured_if_alarm=ke[4],a.zclheader.report_parameters.secured=ke[5],a.zclheader.report_parameters.no_hearde_port=ke[6],a.zclheader.report_parameters.batch=ke[7],a.zclheader.attribut_type=e[8],a.zclheader.min={},128&~e[9]?(a.zclheader.min.value=256*e[9]+e[10],a.zclheader.min.unit="seconds"):(a.zclheader.min.value=256*(e[9]-128)+e[10],a.zclheader.min.unit="minutes"),a.zclheader.max={},128&~e[11]?(a.zclheader.max.value=256*e[11]+e[12],a.zclheader.max.unit="seconds"):(a.zclheader.max.value=256*(e[11]-128)+e[12],a.zclheader.max.unit="minutes"),a.lora.payload="",80===v&&6===g)for(var He=e[13]/5,Be=0;He>0;)a.zclheader.modepower=e[14+5*Be],a.zclheader.powersource=e[15+5*Be],a.zclheader.delta=256*e[16+5*Be]+e[17+5*Be],a.zclheader.changedpowersource=e[18+5*Be],Be++,He--}if(0===r)throw new c("bad payload3")}else a.batch={},a.batch.report="batch";return a}(r,e.fPort);if(void 0!==d.zclheader){if(void 0!==d.zclheader.alarmmsg&&(a=d.zclheader.alarmmsg),7===r[1])return{data:d.zclheader,warning:a};if(9===r[1])return{data:d.zclheader,warning:a};if(1===r[1]){if(void 0===d.zclheader.data){for(var l=[],_=!0,f=0;_;){var m=Object.keys(d.data)[f];if(void 0===m){_=!1;break}l.push({variable:m,value:d.data[m],date:e.recvTime}),f++}return{data:l,type:"standard",warning:a}}return{data:{variable:"read reporting configuration response status",value:d.zclheader.data,date:e.recvTime},warning:a}}}if(void 0!==d.zclheader){if(void 0!==t){for(var v=d.zclheader.endpoint,g=!0,y=0,h=[],b="";g;){var z=Object.keys(d.data)[y];if(void 0===z){g=!1;break}void 0===t[z]?h.push({variable:z,value:d.data[z],date:e.recvTime}):"NA"===(b=t[z][v])?h.push({variable:b,value:"NA",date:e.recvTime}):h.push({variable:b,value:d.data[z],date:e.recvTime}),y++}return{data:h,type:"standard",warning:a}}throw new c("bad decoding")}return{type:d.batch.report,payload:d.lora.payload}}}}},t={};function a(r){var n=t[r];if(void 0!==n)return n.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,a),i.exports}var r={};(function(){var e=r,t=a(338),n=[3,[{taglbl:0,resol:.02,sampletype:12,lblname:"0-100_mV",divide:1},{taglbl:1,resol:17,sampletype:12,lblname:"0-70_V",divide:1},{taglbl:2,resol:100,sampletype:6,lblname:"battery_voltage",divide:1e3},{taglbl:3,resol:100,sampletype:6,lblname:"external_level",divide:1e3}]],i={analog:["0-100_mV","0-70_V"]};e.decodeUplink=function(e){return t.watteco_decodeUplink(e,n,i)}})(),driver=r}(),"undefined"!=typeof exports&&"undefined"!=typeof module&&module.exports&&(exports.driver=driver);