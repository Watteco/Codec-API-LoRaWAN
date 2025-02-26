"use strict";function _readOnlyError(e){throw new TypeError('"'+e+'" is read-only')}function _defineProperties(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,_toPropertyKey(r.key),r)}}function _createClass(e,t,a){return t&&_defineProperties(e.prototype,t),a&&_defineProperties(e,a),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){var t=_toPrimitive(e,"string");return"symbol"==_typeof(t)?t:t+""}function _toPrimitive(e,t){if("object"!=_typeof(e)||!e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var r=a.call(e,t||"default");if("object"!=_typeof(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _callSuper(e,t,a){return t=_getPrototypeOf(t),_possibleConstructorReturn(e,_isNativeReflectConstruct()?Reflect.construct(t,a||[],_getPrototypeOf(e).constructor):t.apply(e,a))}function _possibleConstructorReturn(e,t){if(t&&("object"==_typeof(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(e)}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_setPrototypeOf(e,t)}function _wrapNativeSuper(e){var t="function"==typeof Map?new Map:void 0;return _wrapNativeSuper=function(e){if(null===e||!_isNativeFunction(e))return e;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,a)}function a(){return _construct(e,arguments,_getPrototypeOf(this).constructor)}return a.prototype=Object.create(e.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),_setPrototypeOf(a,e)},_wrapNativeSuper(e)}function _construct(e,t,a){if(_isNativeReflectConstruct())return Reflect.construct.apply(null,arguments);var r=[null];r.push.apply(r,t);var n=new(e.bind.apply(e,r));return a&&_setPrototypeOf(n,a.prototype),n}function _isNativeReflectConstruct(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(_isNativeReflectConstruct=function(){return!!e})()}function _isNativeFunction(e){try{return-1!==Function.toString.call(e).indexOf("[native code]")}catch(t){return"function"==typeof e}}function _setPrototypeOf(e,t){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},_setPrototypeOf(e,t)}function _getPrototypeOf(e){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},_getPrototypeOf(e)}function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}var driver;!function(){var e={652:function(e){var t=[];t[0]=0,t[1]=1,t[2]=4,t[3]=4,t[4]=8,t[5]=8,t[6]=16,t[7]=16,t[8]=24,t[9]=24,t[10]=32,t[11]=32,t[12]=32;var a=[[{sz:2,lbl:0},{sz:2,lbl:1},{sz:2,lbl:3},{sz:3,lbl:5},{sz:4,lbl:9},{sz:5,lbl:17},{sz:6,lbl:33},{sz:7,lbl:65},{sz:8,lbl:129},{sz:10,lbl:512},{sz:11,lbl:1026},{sz:11,lbl:1027},{sz:11,lbl:1028},{sz:11,lbl:1029},{sz:11,lbl:1030},{sz:11,lbl:1031}],[{sz:7,lbl:111},{sz:5,lbl:26},{sz:4,lbl:12},{sz:3,lbl:3},{sz:3,lbl:7},{sz:2,lbl:2},{sz:2,lbl:0},{sz:3,lbl:2},{sz:6,lbl:54},{sz:9,lbl:443},{sz:9,lbl:441},{sz:10,lbl:885},{sz:10,lbl:884},{sz:10,lbl:880},{sz:11,lbl:1763},{sz:11,lbl:1762}],[{sz:4,lbl:9},{sz:3,lbl:5},{sz:2,lbl:0},{sz:2,lbl:1},{sz:2,lbl:3},{sz:5,lbl:17},{sz:6,lbl:33},{sz:7,lbl:65},{sz:8,lbl:129},{sz:10,lbl:512},{sz:11,lbl:1026},{sz:11,lbl:1027},{sz:11,lbl:1028},{sz:11,lbl:1029},{sz:11,lbl:1030},{sz:11,lbl:1031}]];function r(e,t,a,r){return{uncompressSamples:[{data_relative_timestamp:r,data:{value:s(e,t),label:a}}],codingType:0,codingTable:0,resolution:null}}function n(e,t){for(var a=0;a<e.length;a++)if(e[a].taglbl===t.lbl)return a;throw new Error("Batch : Cannot find i1 in argList")}function i(e,t){if(t){var a=e.getNextBifromHi(1);return o(e,t,a)}return e.getNextSample(10)}function o(e,t,a){return a>14?e.getNextSample(10):a>0?function(e,t,a){return e.getNextSample(10,a)+t+Math.pow(2,a)-1}(e,t,a):t}function s(e,t){var a=e.getNextSample(t);return 12===t?function(e){var t=2147483648&e?-1:1,a=(e>>23&255)-127,r=8388607&e;if(128===a)return t*(r?Number.NaN:Number.POSITIVE_INFINITY);if(-127===a){if(0===r)return 0*t;a=-126,r/=1<<22}else r=(r|1<<23)/(1<<23);return t*r*Math.pow(2,a)}(a):a}function d(e,t,a,r,n){var i=e.getNextSample(6,n);return 0===a?function(e,t,a,r){return e>=Math.pow(2,r-1)?e*t+a:(e+1-Math.pow(2,r))*t+a}(i,r,t,n):1===a?(i+Math.pow(2,n)-1)*r+t:t-(i+(Math.pow(2,n)-1))*r}Math.trunc=Math.trunc||function(e){return isNaN(e)?NaN:e>0?Math.floor(e):Math.ceil(e)},e.exports={normalisation_batch:function(e){for(var s=e.date,l=function(e,s,l,c){var _=function(){for(var e=[],t=0;t<16;)e.push({codingType:0,codingTable:0,resolution:null,uncompressSamples:[]}),t+=1;return{batch_counter:0,batch_relative_timestamp:0,series:e}}(),p=function(e){function r(e,t,a){var r=t,n=a-1;if(8*e.length<r+a)throw new Error("Batch : Verify that dest buf is large enough");for(var i=0,o=0;a>0;)e[r>>3]&1<<(7&r)&&(o|=1<<n-i),a--,i++,r++;return o}return{i1:0,byteArray:e,getNextSample:function(e,a){var r=a||t[e],n=this.i1;if(this.i1+=r,12===e&&32!==r)throw new Error("Batch : Mauvais sampletype");var i=0,o=Math.trunc((r-1)/8)+1,s=r%8;for(0===s&&o>0&&(s=8);o>0;){for(var d=0;s>0;){var l=n>>3;this.byteArray[l]&1<<(7&n)&&(i|=1<<8*(o-1)+d),s--,d++,n+=1}o--,s=8}if((3==e||5==e||7==e||9==e)&&i&1<<r-1)for(var c=r;c<32;c++)i|=1<<c,r++;return i},getNextBifromHi:function(e){for(var t=2;t<12;t++)for(var n=r(this.byteArray,this.i1,t),i=0;i<a[e].length;i++)if(a[e][i].sz==t&&n==a[e][i].lbl)return this.i1+=t,i;throw new Error("Bi not found in HUFF table")}}}(function(e){for(var t=[];e.length>=2;)t.push(parseInt(e.substring(0,2),16)),e=e.substring(2,e.length);return t}(l)),u=function(e){for(var t=e.toString(2);t.length<8;)t="0"+t;return{isCommonTimestamp:parseInt(t[t.length-2],2),hasSample:!parseInt(t[t.length-3],2),batch_req:parseInt(t[t.length-4],2),nb_of_type_measure:parseInt(t.substring(0,4),2)}}(p.getNextSample(4));_.batch_counter=p.getNextSample(4,3),p.getNextSample(4,1);var f=function(e,t,a,o,s){for(var d=0,l=0,c=0;c<o.nb_of_type_measure;c++){var _={size:s,lbl:t.getNextSample(4,s)},p=n(a,_);0===c&&(l=p),d=i(t,d),e.series[p]=r(t,a[p].sampletype,_.lbl,d),o.hasSample&&(e.series[p].codingType=t.getNextSample(4,2),e.series[p].codingTable=t.getNextSample(4,2))}return{last_timestamp:d,i1_of_the_first_sample:l}}(_,p,s,u,e),m=f.last_timestamp,v=f.i1_of_the_first_sample;return u.hasSample&&(m=function(e,t,a,r,i,s,l){return s.isCommonTimestamp?function(e,t,a,r,i,o){for(var s=t.getNextSample(4,8),l={},c=function(e,t,a,r){for(var n=[],i=0,o=t.getNextSample(4,2),s=0;s<a;s++){var d=t.getNextBifromHi(o);if(d<=14)if(0===s)n.push(e.series[r].uncompressSamples[0].data_relative_timestamp);else{var l=n[s-1];d>0?n.push(t.getNextSample(10,d)+l+Math.pow(2,d)-1):n.push(l)}else n.push(t.getNextSample(10));i=n[s]}return{timestampCommon:n,lastTimestamp:i}}(e,t,s,a),_=c.timestampCommon,p=c.lastTimestamp,u=0;u<i.nb_of_type_measure;u++){var f=1;l.lbl=t.getNextSample(4,o);for(var m=n(r,l),v=0;v<s;v++)if(t.getNextSample(4,1)){var g=t.getNextBifromHi(e.series[m].codingTable),y={data_relative_timestamp:0,data:{}};if(g<=14){var h=e.series[m].uncompressSamples[e.series[m].uncompressSamples.length-1].data.value;if(g>0)y.data.value=d(t,h,e.series[m].codingType,r[m].resol,g);else{if(f){f=0;continue}y.data.value=h}}else y.data.value=t.getNextSample(r[m].sampletype);y.data_relative_timestamp=_[v],e.series[m].uncompressSamples.push(y)}}return p}(e,t,a,r,s,l):function(e,t,a,r,i,s){for(var l={},c=0;c<i.nb_of_type_measure;c++){l.lbl=t.getNextSample(4,s);var _=n(a,l),p=t.getNextSample(4,8);if(p)for(var u=t.getNextSample(4,2),f=0;f<p;f++){var m=e.series[_].uncompressSamples[e.series[_].uncompressSamples.length-1].data_relative_timestamp,v={data_relative_timestamp:0,data:{}},g=t.getNextBifromHi(u);if(v.data_relative_timestamp=o(t,m,g),v.data_relative_timestamp>r&&(r=v.data_relative_timestamp),(g=t.getNextBifromHi(e.series[_].codingTable))<=14){var y=e.series[_].uncompressSamples[e.series[_].uncompressSamples.length-1].data.value;v.data.value=g>0?d(t,y,e.series[_].codingType,a[_].resol,g):y}else v.data.value=t.getNextSample(a[_].sampletype);e.series[_].uncompressSamples.push(v)}}return r}(e,t,r,i,s,l)}(_,p,v,s,m,u,e)),_.batch_relative_timestamp=i(p,m),function(e,t,a){var r={batch_counter:e.batch_counter,batch_relative_timestamp:e.batch_relative_timestamp};return a&&(r.batch_absolute_timestamp=a),r.dataset=e.series.reduce((function(r,n,i){return r.concat(n.uncompressSamples.map((function(r){var n,o,s,d={data_relative_timestamp:r.data_relative_timestamp,data:{value:t[i].divide?r.data.value/t[i].divide:r.data.value,label:t[i].taglbl}};return t[i].lblname&&(d.data.label_name=t[i].lblname),a&&(d.data_absolute_timestamp=(n=a,o=e.batch_relative_timestamp,s=r.data_relative_timestamp,new Date(new Date(n).getTime()-1e3*(o-s)).toISOString())),d})))}),[]),r}(_,s,c)}(e.batch1,e.batch2,e.payload,s),c=[],_=0;_<l.dataset.length;_++){var p=l.dataset[_],u={variable:p.data.label_name,value:p.data.value,date:p.data_absolute_timestamp};c.push(u)}return c}}},839:function(e){e.exports={UintToInt:function(e,t){if(t<1||t>4)throw new Error("Unsupported Size");return 1===t&&(128&e)>0?e-=256:2===t&&(32768&e)>0?e-=65536:3===t&&(8388608&e)>0?e-=16777216:4===t&&(2147483648&e)>0&&(e-=4294967296),e},Bytes2Float32:function(e){var t=2147483648&e?-1:1,a=(e>>23&255)-127,r=8388607&e;if(128===a)return t*(r?Number.NaN:Number.POSITIVE_INFINITY);if(-127===a){if(0===r)return 0;a=-126,r/=1<<23}else r=(r|1<<23)/(1<<23);return t*r*Math.pow(2,a)},BytesToInt64:function(e,t,a,r){void 0===r&&(r=!1);var n,i,o="U"!=a.substr(0,1),s=parseInt(a.substr(1,2),10)/8,d=s;r?(n=-1,i=t+s-1):(n=1,i=t);for(var l=0,c=i;d>0;c+=n,d--)l=(l<<8)+e[c];return o&&s<8&&128&e[i]&&(l-=1<<8*s),l},decimalToHex:function(e,t){var a=e.toString(16).toUpperCase();for(t=null!=t?t:2;a.length<t;)a="0"+a;return"0x"+a},zeroPad:function(e,t){for(var a=String(e);a.length<t;)a="0"+a;return a},BytesToHexStr:function(e){for(var t="",a=0;a<e.length;a++){var r=e[a].toString(16).toUpperCase();1===r.length&&(r="0"+r),t+=r}return t}}},793:function(e,t,a){var r=a(907),n=a(652);function i(e){var t,a=null==(t=e)?{}:Array.isArray(t)?{samples:t}:"object"==_typeof(t)?t:"string"==typeof t||"number"==typeof t?{value:t}:{};if(!a.samples||!Array.isArray(a.samples))return a;var r=a.samples,n={};r.forEach((function(e){if("object"==_typeof(e)&&e.variable&&void 0!==e.value&&e.date){var t=e.variable,a=e.value,r=e.date;(!n[t]||new Date(r)>new Date(n[t].date))&&(n[t]={value:a,date:r})}}));var i={};for(var o in a)a.hasOwnProperty(o)&&(i[o]=a[o]);for(var s in n)n.hasOwnProperty(s)&&!i.hasOwnProperty(s)&&(i[s]=n[s].value);return i}e.exports={watteco_decodeUplink:function(e,t,a){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;e.bytes,e.fPort;var s=e.recvTime;try{var d=r.normalisation_standard(e,a,o),l=d.payload;if("batch"!==d.type)return{data:i(d.data),warnings:d.warning};var c={batch1:t[0],batch2:t[1],payload:l,date:s};try{return{data:i(n.normalisation_batch(c)),warnings:[]}}catch(e){return{errors:e.message,warnings:[]}}}catch(e){return{errors:e.message,warnings:[]}}}}},907:function(e,t,a){var r=a(839),n=r.UintToInt,i=r.Bytes2Float32,o=r.BytesToInt64,s=r.decimalToHex,d=r.zeroPad,l=(r.BytesToHexStr,function(){function e(t){var a;return _classCallCheck(this,e),(a=_callSuper(this,e,[t])).name="ValidationError",a}return _inherits(e,_wrapNativeSuper(Error)),_createClass(e)}()),c={16:{name:"boolean",size:1},8:{name:"general8",size:1},9:{name:"general16",size:2},10:{name:"general24",size:3},11:{name:"general32",size:4},24:{name:"bitmap8",size:1},25:{name:"bitmap16",size:2},32:{name:"uint8",size:1},33:{name:"uint16",size:2},34:{name:"uint24",size:3},35:{name:"uint32",size:4},40:{name:"int8",size:1},41:{name:"int16",size:2},43:{name:"int32",size:4},48:{name:"enum8",size:1},66:{name:"char string",size:1},65:{name:"bytes string",size:1},67:{name:"long bytes string",size:2},76:{name:"structured ordered sequence",size:2},57:{name:"single",size:4}},_={32778:{0:{0:{divider:1,function_type:"int",name:"positive_active_energy",size:4},1:{divider:1,function_type:"int",name:"negative_active_energy",size:4},2:{divider:1,function_type:"int",name:"positive_reactive_energy",size:4},3:{divider:1,function_type:"int",name:"negative_reactive_energy",size:4},4:{divider:1,function_type:"int",name:"positive_active_power",size:4},5:{divider:1,function_type:"int",name:"negative_active_power",size:4},6:{divider:1,function_type:"int",name:"positive_reactive_power",size:4},7:{divider:1,function_type:"int",name:"negative_reactive_power",size:4}}},32784:{0:{0:{divider:1,function_type:"int",name:"active_energy_a",size:4},1:{divider:1,function_type:"int",name:"reactive_energy_a",size:4},2:{divider:1,function_type:"int",name:"active_energy_b",size:4},3:{divider:1,function_type:"int",name:"reactive_energy_b",size:4},4:{divider:1,function_type:"int",name:"active_energy_c",size:4},5:{divider:1,function_type:"int",name:"reactive_energy_c",size:4},6:{divider:1,function_type:"int",name:"active_energy_abc",size:4},7:{divider:1,function_type:"int",name:"reactive_energy_abc",size:4}},1:{0:{divider:1,function_type:"int",name:"active_power_a",size:4},1:{divider:1,function_type:"int",name:"reactive_power_a",size:4},2:{divider:1,function_type:"int",name:"active_power_b",size:4},3:{divider:1,function_type:"int",name:"reactive_power_b",size:4},4:{divider:1,function_type:"int",name:"active_power_c",size:4},5:{divider:1,function_type:"int",name:"reactive_power_c",size:4},6:{divider:1,function_type:"int",name:"active_power_abc",size:4},7:{divider:1,function_type:"int",name:"reactive_power_abc",size:4}}},32779:{0:{0:{divider:10,function_type:"int",name:"Vrms",size:2},1:{divider:10,function_type:"int",name:"Irms",size:2},2:{divider:1,function_type:"int",name:"angle",size:2}}},32781:{0:{0:{divider:10,function_type:"int",name:"Vrms_a",size:2},1:{divider:10,function_type:"int",name:"Irms_a",size:2},2:{divider:1,function_type:"int",name:"angle_a",size:2},3:{divider:10,function_type:"int",name:"Vrms_b",size:2},4:{divider:10,function_type:"int",name:"Irms_b",size:2},5:{divider:1,function_type:"int",name:"angle_b",size:2},6:{divider:10,function_type:"int",name:"Vrms_c",size:2},7:{divider:10,function_type:"int",name:"Irms_c",size:2},8:{divider:1,function_type:"int",name:"angle_c",size:2}}},32850:{0:{0:{divider:1e3,function_type:"int",name:"frequency",size:2},1:{divider:1e3,function_type:"int",name:"frequency_min",size:2},2:{divider:1e3,function_type:"int",name:"frequency_max",size:2},3:{divider:10,function_type:"int",name:"Vrms",size:2},4:{divider:10,function_type:"int",name:"Vrms_min",size:2},5:{divider:10,function_type:"int",name:"Vrms_max",size:2},6:{divider:10,function_type:"int",name:"Vpeak",size:2},7:{divider:10,function_type:"int",name:"Vpeak_min",size:2},8:{divider:10,function_type:"int",name:"Vpeak_max",size:2},9:{divider:1,function_type:"int",name:"over_voltage",size:2},10:{divider:1,function_type:"int",name:"sag_voltage",size:2}}},32773:{0:{0:{divider:1,function_type:"none",name:"pin_state_1",size:1},1:{divider:1,function_type:"none",name:"pin_state_2",size:1},2:{divider:1,function_type:"none",name:"pin_state_3",size:1},3:{divider:1,function_type:"none",name:"pin_state_4",size:1},4:{divider:1,function_type:"none",name:"pin_state_5",size:1},5:{divider:1,function_type:"none",name:"pin_state_6",size:1},6:{divider:1,function_type:"none",name:"pin_state_7",size:1},7:{divider:1,function_type:"none",name:"pin_state_8",size:1},8:{divider:1,function_type:"none",name:"pin_state_9",size:1},9:{divider:1,function_type:"none",name:"pin_state_10",size:1}}},80:{6:{0:{divider:1e3,function_type:"none",name:"power_modes",size:2},1:{divider:1e3,function_type:"none",name:"current_power_source",size:2},2:{divider:1e3,function_type:"none",name:"constant_power",size:2},3:{divider:1e3,function_type:"none",name:"rechargeable_battery",size:2},4:{divider:1e3,function_type:"none",name:"disposable_battery",size:2},5:{divider:1e3,function_type:"none",name:"solar_harvesting",size:2},6:{divider:1e3,function_type:"none",name:"TIC_harvesting",size:2}}}};function p(e){var t="",a=e.toString(2);return t+=d(a,8)}function u(e,t,a,r,o,s,d,l,p,u){if(138===e||10==e){var f=c[d],m=p,v=f.size,g=f.name;void 0===m&&(m="single"===g?"float":"int8"===g||"int16"===g||"int32"===g?"int":"none");var y=function(e,t,a,r,o,s,d,l,c){var p={reportCauses:[],causesMessages:[]};138===e&&p.causesMessages.push("alarm triggered");var u=o;if(u>=r.length)return p;var f=!1,m=3&(r[o]>>=4);if(2==m)f=!0;else if(1!=m)throw new Error("Alarm decoding: Unexpected cause type. (ReportParams byte = ".concat(r[o],")"));if(++u>=r.length)throw new Error("Alarm decoding: Unexpected end of causes.)");function v(e,t,a){if(u+t-1>=r.length)throw new Error("Alarm decoding: Unexpected end of data while reading value.");for(var o=0,s=0;s<t;s++)o=o<<8|r[u++];if("int"===e)o=n(o,t);else{if("float"!==e)throw new Error("Alarm decoding: Unknown type kind: "+e);if(4!==t)throw new Error("Alarm decoding: Invalid float size. Only 4 bytes are supported.");o=i(o)}return o/a}for(;u<r.length;){var g={};if(u>=r.length)throw new Error("Alarm decoding: Unexpected end of data before reading CSD.");var y=r[u++];g.criterionIndex=7&y;var h=y>>3&3;g.mode=1===h?"delta":2===h?"threshold":"unused",g.hasFallen=!!(32&y),g.hasExceeded=!!(64&y),g.isAlarm=!!(128&y);var b=void 0,z=void 0,w=void 0,x=void 0,S=void 0,N=void 0,U=void 0,I=g.hasExceeded&&g.hasFallen?"exceed&fall":g.hasExceeded?"exceed":g.hasFallen?"fall":"",T=null;if(f){if(u>=r.length)throw new Error("Alarm decoding: Unexpected end of data before reading FI.");var P=s,O=d,A=l;if(g.fieldIndex=0,null!=c&&!0===c&&(T=r[u++],g.fieldIndex=T,_[t]&&_[t][a]&&_[t][a][T])){var E=_[t][a][T];P=E.function_type||s,O=E.size||d,A=E.divider||l,N=E.name||"FieldUndef !"}b=v(P,O,A),"threshold"===g.mode&&(z=v(P,O,A))}if("threshold"===g.mode&&f){if(u>=r.length)throw new Error("Alarm decoding: Unexpected end of data before reading Occ.");var C=r[u++];if(w=C,C>0&&128&C){if(u+3>=r.length)throw new Error("Alarm decoding: Invalid OccH or OccL read.");x=r[u++]<<8|r[u++],S=r[u++]<<8|r[u++]}}p.reportCauses.push(g),f?(U="threshold"===g.mode?void 0!==x?"cause:{alarm:".concat(g.isAlarm,", criterion_index: ").concat(g.criterionIndex,", mode: threshold, crossing: ").concat(I,", value: ").concat(b,", gap: ").concat(z,", occurences_up: ").concat(x,", occurences_down: ").concat(S):"cause:{alarm:".concat(g.isAlarm,", criterion_index: ").concat(g.criterionIndex,", mode: threshold, crossing: ").concat(I,", value: ").concat(b,", gap: ").concat(z,", occurences: ").concat(w):"cause:{alarm:".concat(g.isAlarm,", criterion_index: ").concat(g.criterionIndex,", mode: delta, value: ").concat(b),N&&(U+=", field: ".concat(N)),U+="}"):(U="cause:{alarm:".concat(g.isAlarm,", criterion_index: ").concat(g.criterionIndex,", mode: ").concat(g.mode),"threshold"===g.mode&&(U+=", crossing: ".concat(I)),U+="}"),p.causesMessages.push(U)}if(u!==r.length)throw new Error("Alarm decoding: Remaining unprocessed bytes detected. Expected ".concat(r.length,", but stopped at ").concat(u,"."));return p}(e,t,a,r,s,m,v,l,u);o.zclheader.alarmmsg=y.causesMessages}}e.exports={normalisation_standard:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=[],d=e.bytes,c=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r={},d=0;r.lora={},r.lora.port=t;var c=e.length,_="";r.lora.payload="";for(var f=0;f<c;f++){1===(_=e[f].toString(16).toUpperCase()).length&&(_="0"+_),r.lora.payload+=_;var m=new Date;r.lora.date=m.toISOString()}if(125===t)if(0==!(1&e[0])){r.zclheader={},r.zclheader.report="standard";var v,g,y=-1;if(r.zclheader.endpoint=(224&e[0])>>5|(6&e[0])<<2,v=e[1],r.zclheader.cmdID=s(v,2),g=256*e[2]+e[3],r.zclheader.clustID=s(g,4),10===v||138===v||1===v){d=1,r.data={},y=256*e[4]+e[5],r.zclheader.attID=s(y,4);var h=e[4],b=0;if(10!==v&&138!==v||(b=7),138===v&&(r.zclheader.alarm=1),1===v&&(b=8,r.zclheader.status=e[6]),83===g||84===g||85===g||86===g||87===g){if("function"!=typeof a)throw new l("TIC_Decode function not found");r.data=a(g,y,e.slice(b+1))}if(0===g&&2===y){r.data.firmware="";for(var z=0;z<3;z++)r.data.firmware+=String(e[b+z]),z<2&&(r.data.firmware+=".");var w=256*e[b+3]*256+256*e[b+4]+e[b+5];r.data.firmware+="."+w.toString()}if(0===g&&3===y){var x=e[b];r.data.kernel="";for(var S=0;S<x;S++)r.data.kernel+=String.fromCharCode(e[b+1+S])}if(0===g&&4===y){var N=e[b];r.data.manufacturer="";for(var U=0;U<N;U++)r.data.manufacturer+=String.fromCharCode(e[b+1+U])}if(0===g&&5===y){var I=e[b];r.data.model="";for(var T=0;T<I;T++)r.data.model+=String.fromCharCode(e[b+1+T])}if(0===g&&6===y){var P=e[b];r.data.date="";for(var O=0;O<P;O++)r.data.date+=String.fromCharCode(e[b+1+O])}if(0===g&&16===y){var A=e[b];r.data.position="";for(var E=0;E<A;E++)r.data.position+=String.fromCharCode(e[b+1+E])}if(0===g&&32769===y){var C=e[b];r.data.application_name="";for(var M=0;M<C;M++)r.data.application_name+=String.fromCharCode(e[b+1+M])}if(1026===g&&0===y){var q=e[b-1];r.data.temperature=n(256*e[b]+e[b+1],2)/100,u(v,g,y,e,r,b+2,q,100,"int")}if(1026===g&&1===y&&(r.data.min_temperature=n(256*e[b]+e[b+1],2)/100),1026===g&&2===y&&(r.data.max_temperature=n(256*e[b]+e[b+1],2)/100),1029===g&&0===y){var D=e[b-1];r.data.humidity=(256*e[b]+e[b+1])/100,u(v,g,y,e,r,b+2,D,100,"none")}if(1029===g&&1===y&&(r.data.min_humidity=(256*e[b]+e[b+1])/100),1029===g&&2===y&&(r.data.max_humidity=(256*e[b]+e[b+1])/100),15===g&&1026===y){var k=e[b-1];r.data.index=256*e[b]*256*256+256*e[b+1]*256+256*e[b+2]+e[b+3],u(v,g,y,e,r,b+4,k,1,"none")}if(15===g&&85===y){var V=e[b-1];r.data.pin_state=!!e[b],u(v,g,y,e,r,b+1,V,1,"none")}if(15===g&&84===y&&(0===e[b]&&(r.data.polarity="normal"),1===e[b]&&(r.data.polarity="reverse")),15===g&&1024===y&&(0===e[b]&&(r.data.edge_selection="none"),1===e[b]&&(r.data.edge_selection="falling edge"),2===e[b]&&(r.data.edge_selection="rising edge"),3===e[b]&&(r.data.edge_selection="both edges"),5===e[b]&&(r.data.edge_selection="polling and falling edge"),6===e[b]&&(r.data.edge_selection="polling and rising edge"),7===e[b]&&(r.data.edge_selection="polling and both edges")),15===g&&1025===y&&(r.data.debounce_period=e[b]),15===g&&1027===y&&(r.data.poll_period=e[b]),15===g&&1028===y&&(r.data.force_notify=e[b]),19===g&&85===y){var H=e[b-1];r.data.output_value=e[b],u(v,g,y,e,r,b+1,H,1,"none")}if(6===g&&0===y){var B=e[b];r.data.output=1===B?"ON":"OFF"}if(32776===g&&0===y){var F=e[b-1];r.data.differential_pressure=256*e[b]+e[b+1],u(v,g,y,e,r,b+2,F,1,"none")}if(32773===g&&0===y){var j=e[b-1];r.data.pin_state_1=!(1&~e[b+1]),r.data.pin_state_2=!(2&~e[b+1]),r.data.pin_state_3=!(4&~e[b+1]),r.data.pin_state_4=!(8&~e[b+1]),r.data.pin_state_5=!(16&~e[b+1]),r.data.pin_state_6=!(32&~e[b+1]),r.data.pin_state_7=!(64&~e[b+1]),r.data.pin_state_8=!(128&~e[b+1]),r.data.pin_state_9=!(1&~e[b]),r.data.pin_state_10=!(2&~e[b]),u(v,g,y,e,r,b+2,j,100,"none")}if(32774===g&&0===y&&(r.data.speed=256*e[b]*256+256*e[b+1]+e[b+2]),32774===g&&1===y&&(r.data.data_bit=e[b]),32774===g&&2===y&&(r.data.parity=e[b]),32774===g&&3===y&&(r.data.stop_bit=e[b]),12===g&&85===y){var R=e[b-1];r.data.analog=i(256*e[b]*256*256+256*e[b+1]*256+256*e[b+2]+e[b+3]),u(v,g,y,e,r,b+4,R,1,"float")}if(12===g&&256===y&&(5===e[b+1]&&(r.data.type="ppm"),255===e[b+1]&&0===e[b+3]&&(r.data.type="mA"),255===e[b+1]&&1===e[b+3]&&(r.data.type="mV")),12===g&&32771===y&&(r.data.power_duration=256*e[b]+e[b+1]),12===g&&32772===y){var G={},Y=p(e[b]),X=p(e[b+1]),Z=2*Y[0]+Y[1];0===Z&&(G.mode="idle"),1===Z&&(G.mode="chock"),2===Z&&(G.mode="click");var K=8*Y[2]+4*Y[3]+2*Y[4]+Y[5];0===K&&(G.frequency="idle"),1===K&&(G.frequency="1Hz"),2===K&&(G.frequency="10Hz"),3===K&&(G.frequency="25Hz"),4===K&&(G.frequency="50Hz"),5===K&&(G.frequency="100Hz"),6===K&&(G.frequency="200Hz"),7===K&&(G.frequency="400Hz"),8===K&&(G.frequency="1620Hz"),9===K&&(G.frequency="5376Hz"),G.range={};var L=2*Y[6]+Y[7];0===L&&(G.range.precision="+/- 2g",G.range.value=16),1===L&&(G.range.precision="+/- 4g",G.range.value=32),2===L&&(G.range.precision="+/- 8g",G.range.value=64),3===L&&(G.range.precision="+/- 16g",G.range.value=128);var W=128*X[0]+64*X[1]+32*X[2]+16*X[3]+8*X[4]+4*X[5]+2*X[6]+X[7];G.threshold=W*G.range.value}if(32775===g&&1===y){r.data.modbus_payload="";for(var J=e[b],Q=0;Q<J;Q++)_=e[b+Q+1].toString(16).toUpperCase(),0===Q?r.data.modbus_slaveID=e[b+Q+1]:1===Q?r.data.modbus_fnctID=e[b+Q+1]:2===Q?r.data.modbus_datasize=e[b+Q+1]:r.data.modbus_payload+=_}if(32777===g&&0===y){var $=e[b+2]<<8|e[b+3];r.data.modbus_frame_series_sent=e[b+1],r.data.modbus_frame_number_in_serie=(57344&$)>>13,r.data.modbus_last_frame_of_serie=(7168&$)>>10;for(var ee=0;ee<=9;ee++)r.data["modbus_EP".concat(ee)]=!!($&1<<ee);function je(e,t,a,r,n,i){if(!0===e){if(0===a&&(n.data["modbus_slaveID_EP".concat(i)]=r[t],n.data["modbus_fnctID_EP".concat(i)]=r[t+1],n.data["modbus_datasize_EP".concat(i)]=r[t+2],t+=3),n.data["modbus_payload_EP".concat(i)]="",void 0===r[t])return n;for(var o=0;o<n.data["modbus_datasize_EP".concat(i)];o++){var s=r[t+o].toString(16).toUpperCase();1===s.length&&(s="0"+s),n.data["modbus_payload_EP".concat(i)]+=s}t+=n.data["modbus_datasize_EP".concat(i)]}return t}for(var te=b+4,ae=0;ae<=9;ae++)te=je(r.data["modbus_EP".concat(ae)],te,0,e,r,ae)}if(82===g&&0===y&&(r.data.active_energy=n(256*e[b+1]*256+256*e[b+2]+e[b+3],3),r.data.reactive_energy=n(256*e[b+4]*256+256*e[b+5]+e[b+6],3),r.data.nb_samples=256*e[b+7]+e[b+8],r.data.active_power=n(256*e[b+9]+e[b+10],2),r.data.reactive_power=n(256*e[b+11]+e[b+12],2)),32772===g&&0===y&&(1===e[b]&&(r.data.message_type="confirmed"),0===e[b]&&(r.data.message_type="unconfirmed")),32772===g&&1===y&&(r.data.nb_retry=e[b]),32772===g&&2===y&&(r.data.automatic_association={},r.data.automatic_association.period_in_minutes=256*e[b+1]+e[b+2],r.data.automatic_association.nb_err_frames=256*e[b+3]+e[b+4]),32772===g&&3===y&&(r.data.data_rate=e[b+2]),32772===g&&4===y){r.data.ABP_dev_address="";for(var re=0;re<4;re++)r.data.ABP_dev_address+=String(e[b+1+re]),re<3&&(r.data.ABP_dev_address+=".")}if(32772===g&&5===y){r.data.OTA_app_EUI="";for(var ne=0;ne<8;ne++)r.data.OTA_app_EUI+=String(e[b+1+ne]),ne<7&&(r.data.OTA_app_EUI+=".")}if(80===g&&4===y){e[b],e[b+1];for(var ie={},oe=e[b+2],se=0;se<oe;se++){var de={};de.endpoint=e[b+3+7*se];var le=e[b+4+7*se];de.input_clusters=[];for(var ce=0;ce<le;ce++)de.input_clusters[ce]=s(256*e[b+5+7*se+2*ce]+e[b+6+7*se+2*ce],4);var _e=e[b+5+7*se+2*le];de.output_clusters=[];for(var pe=0;pe<_e;pe++)de.output_clusters[pe]=s(256*e[b+6+7*se+2*pe]+e[b+7+7*se+2*pe],4);ie[se]=de}r.data.configuration=ie}if(80===g&&6===y){var ue=b+3,fe=e[b-1];1&~e[b+2]||(r.data.main_or_external_voltage=(256*e[ue]+e[ue+1])/1e3,ue+=2),2&~e[b+2]||(r.data.rechargeable_battery_voltage=(256*e[ue]+e[ue+1])/1e3,ue+=2),4&~e[b+2]||(r.data.disposable_battery_voltage=(256*e[ue]+e[ue+1])/1e3,ue+=2),8&~e[b+2]||(r.data.solar_harvesting_voltage=(256*e[ue]+e[ue+1])/1e3,ue+=2),16&~e[b+2]||(r.data.tic_harvesting_voltage=(256*e[ue]+e[ue+1])/1e3,ue+=2),u(v,g,y,e,r,ue+1,fe,1e3,"multistate",!0)}if(80===g&&255===h){var me="action "+e[5].toString();r.data[me]="";for(var ve=e[b+1],ge="none",ye=0;ye<ve;ye++)ge+=String.fromCharCode(e[b+1+ye]);r.data[me]=ge}if(32778===g&&0===y){var he=b,be=e[he-1];r.data.positive_active_energy=n(256*e[he+1]*256*256+256*e[he+2]*256+256*e[he+3]+e[he+4],4),he+=4,r.data.negative_active_energy=n(256*e[he+1]*256*256+256*e[he+2]*256+256*e[he+3]+e[he+4],4),he+=4,r.data.positive_reactive_energy=n(256*e[he+1]*256*256+256*e[he+2]*256+256*e[he+3]+e[he+4],4),he+=4,r.data.negative_reactive_energy=n(256*e[he+1]*256*256+256*e[he+2]*256+256*e[he+3]+e[he+4],4),he+=4,r.data.positive_active_power=n(256*e[he+1]*256*256+256*e[he+2]*256+256*e[he+3]+e[he+4],4),he+=4,r.data.negative_active_power=n(256*e[he+1]*256*256+256*e[he+2]*256+256*e[he+3]+e[he+4],4),he+=4,r.data.positive_reactive_power=n(256*e[he+1]*256*256+256*e[he+2]*256+256*e[he+3]+e[he+4],4),he+=4,r.data.negative_reactive_power=n(256*e[he+1]*256*256+256*e[he+2]*256+256*e[he+3]+e[he+4],4),u(v,g,y,e,r,he+5,be,1,"multistate",!0)}if(32784===g&&0===y){var ze=e[b-1];r.data.active_energy_a=n(256*e[b+1]*256*256+256*e[b+2]*256+256*e[b+3]+e[b+4]),r.data.reactive_energy_a=n(256*e[b+5]*256*256+256*e[b+6]*256+256*e[b+7]+e[b+8]),r.data.active_energy_b=n(256*e[b+9]*256*256+256*e[b+10]*256+256*e[b+11]+e[b+12]),r.data.reactive_energy_b=n(256*e[b+13]*256*256+256*e[b+14]*256+256*e[b+15]+e[b+16]),r.data.active_energy_c=n(256*e[b+17]*256*256+256*e[b+18]*256+256*e[b+19]+e[b+20]),r.data.reactive_energy_c=n(256*e[b+21]*256*256+256*e[b+22]*256+256*e[b+23]+e[b+24]),r.data.active_energy_abc=n(256*e[b+25]*256*256+256*e[b+26]*256+256*e[b+27]+e[b+28]),r.data.reactive_energy_abc=n(256*e[b+29]*256*256+256*e[b+30]*256+256*e[b+31]+e[b+32]),u(v,g,y,e,r,b+33,ze,1,"multistate",!0)}else if(32784===g&&1===y){var we=e[b-1];r.data.active_power_a=n(256*e[b+1]*256*256+256*e[b+2]*256+256*e[b+3]+e[b+4]),r.data.reactive_power_a=n(256*e[b+5]*256*256+256*e[b+6]*256+256*e[b+7]+e[b+8]),r.data.active_power_b=n(256*e[b+9]*256*256+256*e[b+10]*256+256*e[b+11]+e[b+12]),r.data.reactive_power_b=n(256*e[b+13]*256*256+256*e[b+14]*256+256*e[b+15]+e[b+16]),r.data.active_power_c=n(256*e[b+17]*256*256+256*e[b+18]*256+256*e[b+19]+e[b+20]),r.data.reactive_power_c=n(256*e[b+21]*256*256+256*e[b+22]*256+256*e[b+23]+e[b+24]),r.data.active_power_abc=n(256*e[b+25]*256*256+256*e[b+26]*256+256*e[b+27]+e[b+28]),r.data.reactive_power_abc=n(256*e[b+29]*256*256+256*e[b+30]*256+256*e[b+31]+e[b+32]),u(v,g,y,e,r,b+33,we,1,"multistate",!0)}if(32779===g&&0===y){var xe=b,Se=e[xe-1];r.data.Vrms=n(256*e[xe+1]+e[xe+2],2)/10,xe+=2,r.data.Irms=n(256*e[xe+1]+e[xe+2],2)/10,xe+=2,r.data.angle=n(256*e[xe+1]+e[xe+2],2),u(v,g,y,e,r,xe+3,Se,1,"multistate",!0)}if(32781===g&&0===y){var Ne=e[b-1];r.data.Vrms_a=n(256*e[b+1]+e[b+2],2)/10,r.data.Irms_a=n(256*e[b+3]+e[b+4],2)/10,r.data.angle_a=n(256*e[b+5]+e[b+6],2),r.data.Vrms_b=n(256*e[b+7]+e[b+8],2)/10,r.data.Irms_b=n(256*e[b+9]+e[b+10],2)/10,r.data.angle_b=n(256*e[b+11]+e[b+12],2),r.data.Vrms_c=n(256*e[b+13]+e[b+14],2)/10,r.data.Irms_c=n(256*e[b+15]+e[b+16],2)/10,r.data.angle_c=n(256*e[b+17]+e[b+18],2),u(v,g,y,e,r,b+19,Ne,1,"multistate",!0)}if(32780===g&&0===y){var Ue=e[b-1];r.data.concentration=256*e[b]+e[b+1],u(v,g,y,e,r,b+2,Ue,1,"none")}if(32780===g&&1===y&&(r.data.analog=e[b]),32780===g&&2===y&&(r.data.analog=e[b]),1024===g&&0===y){var Ie=e[b-1];r.data.illuminance=256*e[b]+e[b+1],u(v,g,y,e,r,b+2,Ie,1,"none")}if(1027===g&&0===y){var Te=e[b-1];r.data.pressure=n(256*e[b]+e[b+1],2),u(v,g,y,e,r,b+2,Te,1,"int")}if(1030===g&&0===y){var Pe=e[b-1];r.data.occupancy=!!e[b],u(v,g,y,e,r,b+1,Pe,1,"none")}if(32850===g&&0===y){var Oe=b;r.data.frequency=(n(256*e[Oe+1]+e[Oe+2],2)+22232)/1e3,Oe+=2,r.data.frequency_min=(n(256*e[Oe+1]+e[Oe+2],2)+22232)/1e3,Oe+=2,r.data.frequency_max=(n(256*e[Oe+1]+e[Oe+2],2)+22232)/1e3,Oe+=2,r.data.Vrms=n(256*e[Oe+1]+e[Oe+2],2)/10,Oe+=2,r.data.Vrms_min=n(256*e[Oe+1]+e[Oe+2],2)/10,Oe+=2,r.data.Vrms_max=n(256*e[Oe+1]+e[Oe+2],2)/10,Oe+=2,r.data.Vpeak=n(256*e[Oe+1]+e[Oe+2],2)/10,Oe+=2,r.data.Vpeak_min=n(256*e[Oe+1]+e[Oe+2],2)/10,Oe+=2,r.data.Vpeak_max=n(256*e[Oe+1]+e[Oe+2],2)/10,Oe+=2,r.data.over_voltage=n(256*e[Oe+1]+e[Oe+2],2),Oe+=2,r.data.sag_voltage=n(256*e[Oe+1]+e[Oe+2],2)}if(32783===g){var Ae=b+1;if(0===y){var Ee=r.data.last={};Ee.NbTriggedAcq=o(e,Ae,"U32"),Ae+=4,Ee.Mean_X_G=o(e,Ae,"U16")/100,Ae+=2,Ee.Max_X_G=o(e,Ae,"U16")/100,Ae+=2,Ee.Dt_X_ms=o(e,Ae,"U16"),Ae+=2,Ee.Mean_Y_G=o(e,Ae,"U16")/100,Ae+=2,Ee.Max_Y_G=o(e,Ae,"U16")/100,Ae+=2,Ee.Dt_Y_ms=o(e,Ae,"U16"),Ae+=2,Ee.Mean_Z_G=o(e,Ae,"U16")/100,Ae+=2,Ee.Max_Z_G=o(e,Ae,"U16")/100,Ae+=2,Ee.Dt_Z_ms=o(e,Ae,"U16")}else if(1===y||2===y||3===y){var Ce=1===y?"Stats_X":2===y?"Stats_Y":"Stats_Z",Me=r.data[Ce]={};Me.NbAcq=o(e,Ae,"U16"),Ae+=2,Me.MinMean_G=o(e,Ae,"U16")/100,Ae+=2,Me.MinMax_G=o(e,Ae,"U16")/100,Ae+=2,Me.MinDt=o(e,Ae,"U16"),Ae+=2,Me.MeanMean_G=o(e,Ae,"U16")/100,Ae+=2,Me.MeanMax_G=o(e,Ae,"U16")/100,Ae+=2,Me.MeanDt=o(e,Ae,"U16"),Ae+=2,Me.MaxMean_G=o(e,Ae,"U16")/100,Ae+=2,Me.MaxMax_G=o(e,Ae,"U16")/100,Ae+=2,Me.MaxDt=o(e,Ae,"U16"),Ae+=2}else if(32768===y){var qe=r.data.params={};qe.WaitFreq_Hz=o(e,Ae,"U16")/10,Ae+=2,qe.AcqFreq_Hz=o(e,Ae,"U16")/10;var De=o(e,Ae+=2,"U16");Ae+=2,32768&De&&(De=60*(-32769&De)),qe.NewWaitDelay_s=32768&De?De=60*(-32769&De):De,qe.MaxAcqDuration_ms=o(e,Ae,"U16"),Ae+=2,qe.Threshold_X_G=o(e,Ae,"U16")/100,Ae+=2,qe.Threshold_Y_G=o(e,Ae,"U16")/100,Ae+=2,qe.Threshold_Z_G=o(e,Ae,"U16")/100,Ae+=2,qe.OverThrsh_Dt_ms=o(e,Ae,"U16"),Ae+=2,qe.UnderThrsh_Dt_ms=o(e,Ae,"U16"),Ae+=2,qe.Range_G=o(e,Ae,"U16")/100,Ae+=2,qe.FilterSmoothCoef=o(e,Ae,"U8"),Ae+=1,qe.FilterGainCoef=o(e,Ae,"U8"),Ae+=1,(qe=r.data.Params.working_modes={}).SignalEachAcq=128&e[Ae]?"true":"false",qe.RstAftStdRpt_X=1&e[Ae]?"true":"false",qe.RstAftStdRpt_Y=2&e[Ae]?"true":"false",qe.RstAftStdRpt_7=4&e[Ae]?"true":"false"}}var ke=Object.keys(r.data)[0];if(void 0===r.data[ke])throw new l("bad payload1");if(e.length<=7)throw new l("bad payload2")}if(7===v){d=1,y=256*e[6]+e[7],r.zclheader.attID=s(y,4),r.zclheader.status=e[4],r.zclheader.report_parameters={};var Ve=p(e[5]);r.zclheader.report_parameters.new_mode_configuration=Ve[0],"0"===Ve[2]&&"0"===Ve[3]&&(r.zclheader.report_parameters.cause_request="none"),"0"===Ve[2]&&"1"===Ve[3]&&(r.zclheader.report_parameters.cause_request="short"),"1"===Ve[2]&&"0"===Ve[3]&&(r.zclheader.report_parameters.cause_request="long"),"1"===Ve[2]&&"1"===Ve[3]&&(r.zclheader.report_parameters.cause_request="reserved"),r.zclheader.report_parameters.secured_if_alarm=Ve[4],r.zclheader.report_parameters.secured=Ve[5],r.zclheader.report_parameters.no_hearde_port=Ve[6],r.zclheader.report_parameters.batch=Ve[7]}if(9===v){d=1,y=256*e[6]+e[7],r.zclheader.attID=s(y,4),r.zclheader.status=e[4],r.zclheader.report_parameters={};var He=p(e[5]);if(r.zclheader.report_parameters.new_mode_configuration=He[0],"0"===He[2]&&"0"===He[3]&&(r.zclheader.report_parameters.cause_request="none"),"0"===He[2]&&"1"===He[3]&&(r.zclheader.report_parameters.cause_request="short"),"1"===He[2]&&"0"===He[3]&&(r.zclheader.report_parameters.cause_request="long"),"1"===He[2]&&"1"===He[3]&&(r.zclheader.report_parameters.cause_request="reserved"),r.zclheader.report_parameters.secured_if_alarm=He[4],r.zclheader.report_parameters.secured=He[5],r.zclheader.report_parameters.no_hearde_port=He[6],r.zclheader.report_parameters.batch=He[7],r.zclheader.attribut_type=e[8],r.zclheader.min={},128&~e[9]?(r.zclheader.min.value=256*e[9]+e[10],r.zclheader.min.unit="seconds"):(r.zclheader.min.value=256*(e[9]-128)+e[10],r.zclheader.min.unit="minutes"),r.zclheader.max={},128&~e[11]?(r.zclheader.max.value=256*e[11]+e[12],r.zclheader.max.unit="seconds"):(r.zclheader.max.value=256*(e[11]-128)+e[12],r.zclheader.max.unit="minutes"),r.lora.payload="",80===g&&6===y)for(var Be=e[13]/5,Fe=0;Be>0;)r.zclheader.modepower=e[14+5*Fe],r.zclheader.powersource=e[15+5*Fe],r.zclheader.delta=256*e[16+5*Fe]+e[17+5*Fe],r.zclheader.changedpowersource=e[18+5*Fe],Fe++,Be--}if(0===d)throw new l("bad payload3")}else r.batch={},r.batch.report="batch";return r}(d,e.fPort,a);if(void 0!==c.zclheader){if(void 0!==c.zclheader.alarmmsg&&(r=c.zclheader.alarmmsg),7===d[1])return{data:c.zclheader,warning:r};if(9===d[1])return{data:c.zclheader,warning:r};if(1===d[1]){if(void 0===c.zclheader.data){for(var _=[],f=!0,m=0;f;){var v=Object.keys(c.data)[m];if(void 0===v){f=!1;break}_.push({variable:v,value:c.data[v],date:e.recvTime}),m++}return{data:_,type:"standard",warning:r}}return{data:{variable:"read reporting configuration response status",value:c.zclheader.data,date:e.recvTime},warning:r}}}if(void 0!==c.zclheader){if(void 0!==t){for(var g=c.zclheader.endpoint,y=!0,h=0,b=[],z="";y;){var w=Object.keys(c.data)[h];if(void 0===w){y=!1;break}void 0===t[w]?b.push({variable:w,value:c.data[w],date:e.recvTime}):"NA"===(z=t[w][g])?b.push({variable:z,value:"NA",date:e.recvTime}):b.push({variable:z,value:c.data[w],date:e.recvTime}),h++}return{data:b,type:"standard",warning:r}}throw new l("bad decoding")}return{type:c.batch.report,payload:c.lora.payload}}}},174:function(e,t,a){var r=a(793),n=[4,[{taglbl:0,resol:1,sampletype:10,lblname:"index_1",divide:1},{taglbl:1,resol:1,sampletype:10,lblname:"index_2",divide:1},{taglbl:2,resol:1,sampletype:10,lblname:"index_3",divide:1},{taglbl:3,resol:1,sampletype:1,lblname:"pin_state_1",divide:1},{taglbl:4,resol:1,sampletype:1,lblname:"pin_state_2",divide:1},{taglbl:5,resol:1,sampletype:1,lblname:"pin_state_3",divide:1},{taglbl:6,resol:100,sampletype:6,lblname:"battery_voltage",divide:1e3},{taglbl:7,resol:1,sampletype:6,lblname:"multi_state",divide:100}]],i={index:["index_1","index_2","index_3"],pin_state:["pin_state_1","pin_state_2","pin_state_3"],pin_state_4:["NA"],pin_state_5:["NA"],pin_state_6:["NA"],pin_state_7:["NA"],pin_state_8:["NA"],pin_state_9:["NA"],pin_state_10:["NA"]};function o(e){return r.watteco_decodeUplink(e,n,i)}t.decodeUplink=o,("undefined"!=typeof globalThis?globalThis:this).decodeUplink=o}},t={},a=function a(r){var n=t[r];if(void 0!==n)return n.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,a),i.exports}(174);driver=a}(),"undefined"!=typeof exports&&"undefined"!=typeof module&&module.exports&&(exports.driver=driver);