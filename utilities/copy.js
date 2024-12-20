/**
 * Script to copy files to distrib directory for devices, with optional filtering based on a regex pattern.
 *
 * Usage:
 *  - Run without filter to copy files for all devices:
 *      node script.js
 *
 *  - Run with a filter to copy files for specific devices (use a regex pattern):
 *      node script.js "flash'o|intens'o|vaqa'o"
 *
 * Parameters:
 *  - devices_to_process (optional): A regex pattern to match device names.
 *
 * Behavior:
 *  - If a regex pattern is provided, only devices matching the pattern will be processed.
 *  - If no devices match the pattern, the script exits with a message.
 *  - Without a regex pattern, files for all devices in the list are copied.
 */

const fs = require('fs');
tools=require("./_CommonTools.js");

// Get devices to be processed
const { devices, actility_devices } = tools.getDevices(process.argv[2]);
if (devices.length === 0) process.exit(0); 

// Copy files for each filtered device
for (let i in devices) {
    let source = `../devices/${devices[i]}`;
    let dest = `../distrib/${devices[i]}`;

    try {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
            console.log(`Directory created: ${dest}`);
        } else {
            console.log(`Directory already exists: ${dest}`);
        }
    } catch (err) {
        console.error(`Error creating directory: ${err.message}`);
    }

    fs.copyFile(`${source}/examples.json`, `${dest}/examples.json`, (err) => {
        if (err) throw err;
        console.log('examples.json was copied to destination');
    });
    fs.copyFile(`${source}/metadata.json`, `${dest}/metadata.json`, (err) => {
        if (err) throw err;
        console.log('metadata.json was copied to destination');
    });
    fs.copyFile(`${source}/uplink.schema.json`, `${dest}/uplink.schema.json`, (err) => {
        if (err) throw err;
        console.log('uplink.schema.json was copied to destination');
    });
    fs.copyFile(`${source}/main.js`, `${dest}/main.js`, (err) => {
        if (err) throw err;
        console.log('main.js was copied to destination');
    });
}
