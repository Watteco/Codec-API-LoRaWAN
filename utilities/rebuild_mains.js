/**
 * Script to build distributed devices by optionally filtering them using a regex pattern.
 *
 * Usage:
 *  - Run without filter to process all devices:
 *      node rebuild_main.js
 *
 *  - Run with a filter to process specific devices (use a regex pattern):
 *      node rebuild_main.js "flash'o|intens'o|vaqa'o"
 *
 * Parameters:
 *  - devices_to_process (optional): A regex pattern to match device names.
 *
 * Behavior:
 *  - If a regex pattern is provided, only devices matching the pattern will be processed.
 *  - If no devices match the pattern, the script exits with a message.
 *  - Without a regex pattern, all devices in the list are processed.
 */

const { execSync } = require('child_process');
const fs = require("fs");

tools=require("./_CommonTools.js");

// Get devices to be processed
const { devices, actility_devices } = tools.getDevices(process.argv[2]);
if (devices.length === 0) process.exit(0); 

// Execute commands for each filtered device
for (let i in devices) {
    let command = `npm --prefix ../devices/${devices[i]} run rebuild`;
    console.log(command);
    execSync(command);

    let command2 = `echo exports.driver=driver >> ../devices/${devices[i]}/main.js`;
    console.log(command2);
    execSync(command2);
}
