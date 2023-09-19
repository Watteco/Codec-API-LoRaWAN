const {execSync} = require('child_process')
let devices = ["atm'o","clos'o","flash'o","in'o","inclin'o","indoor_temperature","intens'o","lev'o","modbus","monit'o","move'o","outdoor_temperature","pilot_wire","press'o","pulse_sens'o_atex","pulse_sens'o","remote_temperature_2","remote_temperature","smartplug","th","tics'o","toran'o_atex","triphas'o","vaqa'o_lt","vaqa'o_plus","vaqa'o","ventil'o"]

for (let i in devices){
    let command ="npm --prefix ../devices/"+devices[i]+" run rebuild "
    console.log(command)
    execSync(command)
    console.log("test")
}