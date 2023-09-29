const {execSync} = require('child_process')
const fs = require("fs");
let devices = ["atm'o","clos'o","flash'o","in'o","inclin'o","indoor_temperature","intens'o","lev'o","modbus","monit'o","move'o","outdoor_temperature","pilot_wire","press'o","pulse_sens'o_atex","pulse_sens'o","remote_temperature_2","remote_temperature","smartplug","th","tics'o","toran'o_atex","triphas'o","vaqa'o_lt","vaqa'o_plus","vaqa'o","ventil'o"]

let flag=0
while(flag===0){

    fs.copyFile("../codec/standard.js", "../devices/standard.js", (err) => {
        if (err) throw err;

    })
    console.log('standard.js was copied to destination')
    fs.copyFile("../codec/batch.js", "../devices/batch.js", (err) => {
        if (err) throw err;

    })
    console.log('batch.js was copied to destination');
    fs.copyFile("../codec/decode_uplink.js", "../devices/decode_uplink.js", (err) => {
        if (err) throw err;

    })
    console.log('decode_uplink.js was copied to destination');
    flag=1
}

for (let i in devices){
    let command ="npm --prefix ../devices/"+devices[i]+" run rebuild "
    console.log(command)
    execSync(command)
    let command2 = "echo exports.driver=driver >> ../devices/"+devices[i]+"/main.js"
    console.log(command2)
    execSync(command2)
}