//permet de visualiser le décodage d'un payload dans la console
function strToDecimalArray(str){
    let hexArray = [];
    for (let i=0; i<str.length; i+=2) {
        hexArray.push(parseInt(str.substring(i, i+2), 16));
    }
    return hexArray;
}
let argv= process.argv.slice(2);


let bytes = [];
bytes = strToDecimalArray(argv[2]);

let date = argv[3];

let input = {
    bytes: bytes,
    fPort: Number(argv[1]),
    recvTime: date,
};

let file = argv[0];
let main = require("../distrib/"+file.toString()+"/main.js");

let output = main.driver.decodeUplink(input);
console.log(output)