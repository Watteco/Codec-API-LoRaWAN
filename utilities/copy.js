const fs = require('fs');
let devices = ["atm'o","clos'o","flash'o","in'o","inclin'o","indoor_temperature","intens'o","lev'o","modbus","monit'o","move'o","outdoor_temperature","pilot_wire","press'o","pulse_sens'o_atex","pulse_sens'o","remote_temperature_2","remote_temperature","smartplug","th","tics'o","toran'o_atex","triphas'o","vaqa'o_lt","vaqa'o_plus","vaqa'o","ventil'o"]

for (let i in devices){
    let source = "../devices/"+devices[i]
    let dest = "../distrib/"+devices[i]
    fs.copyFile(source+"/examples.json", dest+"/examples.json", (err) => {
        if (err) throw err;
        console.log('examples.json was copied to destination');
    })
    fs.copyFile(source+"/metadata.json", dest+"/metadata.json", (err) => {
        if (err) throw err;
        console.log('metadata.json was copied to destination');
    })
    fs.copyFile(source+"/uplink.schema.json", dest+"/uplink.schema.json", (err) => {
        if (err) throw err;
        console.log('uplink.schema.json was copied to destination');
    })
    fs.copyFile(source+"/main.js", dest+"/main.js", (err) => {
        if (err) throw err;
        console.log('main.js was copied to destination');
    })
}