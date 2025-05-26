//permet de visualiser le décodage d'un payload dans la console
let argv= process.argv.slice(2);

let bytes = argv[2];
let date = argv[3];

let input = {
    bytes: bytes,
    fPort: Number(argv[1]),
    recvTime: date,
};

let file = argv[0];
let driver = require("../devices/"+file.toString()+"/"+file.toString()+".js");

let output = driver.decodeUplink(input);
//console.log(output);
console.log(JSON.stringify(output, null, 2));