/**
 * Script to test devices by optionally filtering them using a regex pattern.
 *
 * Usage:
 *  - Run without filter to test all devices:
 *      node script.js
 *
 *  - Run with a filter to test specific devices (use a regex pattern):
 *      node script.js "flash'o|intens'o|vaqa'o"
 *
 *  - Run with "." as filter to use the current directory name as the filter:
 *      node rebuild_main.js .
 *
 * Parameters:
 *  - filter (optional): A regex pattern to match device names. If "." is used, it will take the current directory name
 *
 * Behavior:
 *  - If a regex pattern is provided, only devices matching the pattern will be tested.
 *  - If no devices match the pattern, the script exits with a message.
 *  - Without a regex pattern, all devices in the list are tested.
 */

const { execSync } = require('child_process');

const path = require('path');
tools=require("./_CommonTools.js");

let filter = process.argv[2];

if (filter === '.') {
    filter = path.basename(process.cwd());
}

// Get devices to be processed
const { devices, actility_devices, ttn_devices} = tools.getDevices(filter);
if (devices.length === 0) process.exit(0); 

// Execute test commands for each filtered device
for (let i in devices) {
        
    console.log(`Testing ${devices[i]} ...`);
    let devicePath = path.join(__dirname, `../devices/${devices[i]}`);
    let command = `npm --prefix ${devicePath} run test`;
    //console.log(command);
    execSync(command);
}
