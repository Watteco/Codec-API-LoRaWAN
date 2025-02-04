/**
 * Script to copy and deploy files for Watteco devices, with optional filtering based on a regex pattern.
 *
 * Usage:
 *  - Run without filter to process all devices:
 *      node wattec_deployments.js <watteco_path>
 *
 *  - Run with a filter to process specific devices (use a regex pattern):
 *      node watteco_deployments.js <watteco_path> ["flash'o|intens'o|vaqa'o"]
 *
 * Parameters:
 *  - watteco_path: Path to the Watteco directory. (watteco_path/distrib is used as target)
 *  - devices_to_process (optional): A regex pattern to match device names.
 *
 * Behavior:
 *  - If a regex pattern is provided, only devices matching the pattern will be processed.
 *  - If no devices match the pattern, the script exits with a message.
 *  - Without a regex pattern, all devices in the list are processed.
 * 
 * Uasage example: 
 *   Launch from utilities directory: node .\watteco_deployment.js "atm'o" 
 * 
 */

const fs = require("fs");
const path = require("path");
const tools = require("./_CommonTools.js");

async function copyAndDeployFiles(watteco_path, distrib_path, devices) {
  try {

    // Copy and process device-specific files sequentially
    for (let i in devices) {
      const device = devices[i];
      distribDevicePath = `${distrib_path}/${device}`;
      try {
        if (!fs.existsSync(distribDevicePath)) {
            fs.mkdirSync(distribDevicePath, { recursive: true });
            console.log(`Directory created: ${distribDevicePath}`);
        }

        // Copy device-specific files sequentially without creating intermediate variables
        
        console.log(`Processing ${device} ...`);
    
        fs.copyFileSync(`${watteco_path}/devices/${device}/main.js`, `${distribDevicePath}/main.js`);
    
        fs.copyFileSync(`${watteco_path}/devices/${device}/examples.json`, `${distribDevicePath}/examples.json`);
    
        fs.copyFileSync(`${watteco_path}/devices/${device}/metadata.json`, `${distribDevicePath}/metadata.json`);
        tools.updateJSON_name_description(`${distribDevicePath}/metadata.json`, `${device}`, `Driver for ${device} sensor`);
    
        fs.copyFileSync(`${watteco_path}/devices/${device}/uplink.schema.json`, `${distribDevicePath}/uplink.schema.json`);

      } catch (err) {
        console.error(`Error processing device ${device}: ${err.message}`);
        process.exit(1); // Exit the script immediately on error
      }
    }
  } catch (err) {
    console.error(`Error in copyAndDeployFiles: ${err.message}`);
    process.exit(1); // Exit the script immediately on error
  }
}

async function main() {
  try {
    let argv = process.argv.slice(2);

    let watteco_path = argv[0];
    console.log("Watteco path:", watteco_path);

    let distrib_path = `${watteco_path}/distrib`;
    console.log("Distrib path:", `${distrib_path}`);

    let sensorFilter = argv[1];
    console.log("Sensor filter:", sensorFilter);

    // Get devices to be processed
    const { devices, actility_devices, ttn_devices} = tools.getDevices(sensorFilter);
    if (devices.length === 0) process.exit(0);

    // Start the copy and deployment process
    copyAndDeployFiles(watteco_path, distrib_path, devices);

    // Generate the DRIVERS.md file in distrib directory
    tools.generateDeviceDriverInfoMarkdown(path.join("..","devices"),path.join("..","distrib", "DRIVERS.md") );
  } catch (err) {
    console.error('Error in script execution:', err.message);
    process.exit(1); // Exit the script immediately on error
  }
}

// Run the main function
main();
