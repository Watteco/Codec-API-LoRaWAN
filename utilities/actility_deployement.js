/**
 * Script to copy and deploy files for Actility devices, with optional filtering based on a regex pattern.
 *
 * Usage:
 *  - Run without filter to process all devices:
 *      node actility_deployments.js <watteco_path> <actility_path>
 *
 *  - Run with a filter to process specific devices (use a regex pattern):
 *      node actility_deployments.js <watteco_path> <actility_path> "flash'o|intens'o|vaqa'o"
 *
 * Parameters:
 *  - watteco_path: Path to the Watteco directory.
 *  - actility_path: Path to the Actility deployment directory.
 *  - devices_to_process (optional): A regex pattern to match device names.
 *
 * Behavior:
 *  - If a regex pattern is provided, only devices matching the pattern will be processed.
 *  - If no devices match the pattern, the script exits with a message.
 *  - Without a regex pattern, all devices in the list are processed.
 */

const fs = require('fs');
const tools = require("./_CommonTools.js");

let argv = process.argv.slice(2);

let watteco_path = argv[0];
console.log("Watteco path:", watteco_path);

let actility_path = argv[1];
console.log("Actility path:", actility_path);

// Get devices to be processed
const { devices, actility_devices } = tools.getDevices(process.argv[2]);
if (devices.length === 0) process.exit(0); 

// Copy common codec files
fs.copyFile(`${watteco_path}/codec/standard.js`, `${actility_path}/vendors/watteco/drivers/standard.js`, (err) => {
    if (err) throw err;
    console.log('standard.js was copied to destination');
});

fs.copyFile(`${watteco_path}/codec/batch.js`, `${actility_path}/vendors/watteco/drivers/batch.js`, (err) => {
    if (err) throw err;
    console.log('batch.js was copied to destination');
});

fs.copyFile(`${watteco_path}/codec/decode_uplink.js`, `${actility_path}/vendors/watteco/drivers/decode_uplink.js`, (err) => {
    if (err) throw err;
    console.log('decode_uplink.js was copied to destination');
});

// Copy files for each filtered device
for (let i in devices) {
    fs.copyFile(
        `${watteco_path}/devices/${devices[i]}/${devices[i]}.js`,
        `${actility_path}/vendors/watteco/drivers/${actility_devices[i]}_v4/${devices[i]}.js`,
        (err) => {
            if (err) throw err;
            console.log(`${devices[i]}.js was copied to destination`);
        }
    );

    fs.copyFile(
        `${watteco_path}/devices/${devices[i]}/main.js`,
        `${actility_path}/vendors/watteco/drivers/${actility_devices[i]}_v4/main.js`,
        (err) => {
            if (err) throw err;
            console.log('main.js was copied to destination');
        }
    );

    fs.copyFile(
        `${watteco_path}/devices/${devices[i]}/examples.json`,
        `${actility_path}/vendors/watteco/drivers/${actility_devices[i]}_v4/examples.json`,
        (err) => {
            if (err) throw err;
            console.log('examples.json was copied to destination');
        }
    );

    fs.copyFile(
        `${watteco_path}/devices/${devices[i]}/metadata.json`,
        `${actility_path}/vendors/watteco/drivers/${actility_devices[i]}_v4/metadata.json`,
        (err) => {
            if (err) throw err;
            console.log('metadata.json was copied to destination');
        }
    );

    fs.copyFile(
        `${watteco_path}/devices/${devices[i]}/uplink.schema.json`,
        `${actility_path}/vendors/watteco/drivers/${actility_devices[i]}_v4/uplink.schema.json`,
        (err) => {
            if (err) throw err;
            console.log('uplink.schema.json was copied to destination');
        }
    );
}
