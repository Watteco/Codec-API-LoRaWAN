let watteco = require("./decode_minimized.js")

function strToDecimalArray(str){
    let hexArray = [];
    for (let i=0; i<str.length; i+=2) {
        hexArray.push(parseInt(str.substring(i, i+2), 16));
    }
    return hexArray;
}

let batch_param = [2, [{ taglbl: 0, resol: 10, sampletype: 7, lblname: "temperature", divide: 100 },
    { taglbl: 1, resol: 100, sampletype: 6, lblname: "humidity", divide: 100 },
    { taglbl: 2, resol: 1, sampletype: 6, lblname: "battery_voltage", divide: 1000 },
    { taglbl: 3, resol: 1, sampletype: 1, lblname: "open_case", divide: 1 }]];


let argv= process.argv.slice(2);

let bytes = [];
bytes = strToDecimalArray(argv[1]);

let date = argv[2];

let input = {
    bytes: bytes,
    fPort: Number(argv[0]),
    recvTime: date,

};
console.log(input);
function decodeUplink(input) {
    return result = watteco.watteco_decodeUplink(input,batch_param);

}
let a = decodeUplink(input);
console.log(a)