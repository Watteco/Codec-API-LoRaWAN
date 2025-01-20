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
 * Parameters:
 *  - devices_to_process (optional): A regex pattern to match device names.
 *
 * Behavior:
 *  - If a regex pattern is provided, only devices matching the pattern will be tested.
 *  - If no devices match the pattern, the script exits with a message.
 *  - Without a regex pattern, all devices in the list are tested.
 */

const { execSync } = require('child_process');

tools=require("./_CommonTools.js");

// Get devices to be processed
const { devices, actility_devices } = tools.getDevices(process.argv[2]);
if (devices.length === 0) process.exit(0); 

// Execute test commands for each filtered device
for (let i in devices) {
        
    console.log(`Testing ${devices[i]} ...`);
    let command = `npm --prefix ../devices/${devices[i]} run test`;
    //console.log(command);
    execSync(command);
}
