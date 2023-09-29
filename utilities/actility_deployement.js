const fs = require('fs');
let actility_devices = ["atm'o","clos'o","flash'o","in'o","inclin'o","indoor-temperature","intens'o","lev'o","modbus","monit'o","move'o","outdoor-temperature","pilot-wire","press'o","pulse-sens'o-atex","pulse-sens'o","remote-temperature2","remote-temperature","smartplug","th","tics'o","toran'o-atex","triphas'o","vaqa'o-lt","vaqa'o-plus","vaqa'o","ventil'o"]
let devices = ["atm'o","clos'o","flash'o","in'o","inclin'o","indoor_temperature","intens'o","lev'o","modbus","monit'o","move'o","outdoor_temperature","pilot_wire","press'o","pulse_sens'o_atex","pulse_sens'o","remote_temperature_2","remote_temperature","smartplug","th","tics'o","toran'o_atex","triphas'o","vaqa'o_lt","vaqa'o_plus","vaqa'o","ventil'o"]
let argv= process.argv.slice(2);

let watteco_path = argv[0]
console.log(watteco_path)
let actility_path = argv[1]
console.log(actility_path)

fs.copyFile(watteco_path+"/codec/standard.js", actility_path+"/vendors/watteco/drivers/standard.js", (err) => {
    if (err) throw err;
    console.log('standard.js was copied to destination');
})
fs.copyFile(watteco_path+"/codec/batch.js", actility_path+"/vendors/watteco/drivers/batch.js", (err) => {
    if (err) throw err;
    console.log('batch.js was copied to destination');
})
fs.copyFile(watteco_path+"/codec/decode_uplink.js", actility_path+"/vendors/watteco/drivers/decode_uplink.js", (err) => {
    if (err) throw err;
    console.log('decode_uplink.js was copied to destination');
})

for (let i in devices){
    fs.copyFile(watteco_path+"/devices/"+devices[i]+"/"+devices[i]+".js", actility_path+"/vendors/watteco/drivers/"+actility_devices[i]+"_v4/"+devices[i]+".js", (err) => {
        if (err) throw err;
        console.log(devices[i]+'.js was copied to destination');
    })
    fs.copyFile(watteco_path+"/devices/"+devices[i]+"/main.js", actility_path+"/vendors/watteco/drivers/"+actility_devices[i]+"_v4/main.js", (err) => {
        if (err) throw err;
        console.log('main.js was copied to destination');
    })
    fs.copyFile(watteco_path+"/devices/"+devices[i]+"/examples.json", actility_path+"/vendors/watteco/drivers/"+actility_devices[i]+"_v4/examples.json", (err) => {
        if (err) throw err;
        console.log('examples.json was copied to destination');
    })
    fs.copyFile(watteco_path+"/devices/"+devices[i]+"/metadata.json", actility_path+"/vendors/watteco/drivers/"+actility_devices[i]+"_v4/metadata.json", (err) => {
        if (err) throw err;
        console.log('metadata.json was copied to destination');
    })
    fs.copyFile(watteco_path+"/devices/"+devices[i]+"/uplink.schema.json", actility_path+"/vendors/watteco/drivers/"+actility_devices[i]+"_v4/uplink.schema.json", (err) => {
        if (err) throw err;
        console.log('uplink.schema.json was copied to destination');
    })
}