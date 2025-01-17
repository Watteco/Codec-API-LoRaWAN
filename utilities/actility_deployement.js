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
 * 
 * Uasage example: 
 *   Launch from utilities directory: node .\actility_deployement.js .. ..\..\_ForkActility\device-catalog\ "atm'o" 
 * 
 */

const fs = require('fs').promises; // Use promises API for fs
const tools = require("./_CommonTools.js");

async function updateRequireDecodeUplinkFile(filePath) {
  // Ensure the file exists before attempting to read it
  try {
    if (!(await fs.stat(filePath)).isFile()) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Read the content of the file
    const data = await fs.readFile(filePath, 'utf8');

    // Replace occurrences of "../../codec/decode_uplink" and "../../codec/decode_uplink.js"
    let modifiedData = data.replace(/(?:\.\.\/\.\.\/codec\/decode_uplink(?:\.js)?)/g, '../decode.js');

    // Write the modified content back to the file
    await fs.writeFile(filePath, modifiedData, 'utf8');
  } catch (err) {
    console.error(`Error in updateRequireDecodeUplinkFile: ${err.message}`);
    process.exit(1); // Exit the script immediately on error
  }
}

async function removeDriverExport(filePath) {
  // Ensure the file exists before attempting to read it
  try {
    if (!(await fs.stat(filePath)).isFile()) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Read the content of the file
    const data = await fs.readFile(filePath, 'utf8');

    // Regular expression to match 'exports.driver = driver' with or without a semicolon at the end
    const regex = /exports\.driver\s*=\s*driver\s*(?:;\s*)?$/m;

    // Remove the line if it exists (with or without semicolon)
    let modifiedData = data.replace(regex, '').trim();

    // Write the modified content back to the file
    await fs.writeFile(filePath, modifiedData, 'utf8');
  } catch (err) {
    console.error(`Error in removeDriverExport: ${err.message}`);
    process.exit(1); // Exit the script immediately on error
  }
}

async function copyAndDeployFiles(watteco_path, actility_path, devices, actility_devices) {
  try {
    // Copy common codec files
    console.log(`Processing standard.js ...`);
    await fs.copyFile(`${watteco_path}/codec/standard.js`, `${actility_path}/vendors/watteco/drivers/standard.js`);

    console.log(`Processing batch.js ...`);
    await fs.copyFile(`${watteco_path}/codec/batch.js`, `${actility_path}/vendors/watteco/drivers/batch.js`);

    console.log(`Processing decode_uplink.js ...`);
    await fs.copyFile(`${watteco_path}/codec/decode_uplink.js`, `${actility_path}/vendors/watteco/drivers/decode.js`);

    // Copy and process device-specific files sequentially
    for (let i in devices) {
      const device = devices[i];
      const actilityDevicePath = `${actility_path}/vendors/watteco/drivers/${actility_devices[i]}`;
    
      try {
        // Copy device-specific files sequentially without creating intermediate variables
        
        console.log(`Processing ${device} ...`);

        await fs.copyFile(`${watteco_path}/devices/${device}/${device}.js`, `${actilityDevicePath}/${device}.js`);
        await updateRequireDecodeUplinkFile(`${actilityDevicePath}/${device}.js`);
    
        await fs.copyFile(`${watteco_path}/devices/${device}/main.js`, `${actilityDevicePath}/main.js`);
        await removeDriverExport(`${actilityDevicePath}/main.js`);
    
        await fs.copyFile(`${watteco_path}/devices/${device}/examples.json`, `${actilityDevicePath}/examples.json`);
    
        await fs.copyFile(`${watteco_path}/devices/${device}/metadata.json`, `${actilityDevicePath}/metadata.json`);
    
        await fs.copyFile(`${watteco_path}/devices/${device}/uplink.schema.json`, `${actilityDevicePath}/uplink.schema.json`);
    
        // Not ready to deliver actility, to many differences
        // await fs.copyFile(`${watteco_path}/devices/${device}/package.json`, `${actilityDevicePath}/package.json`);
        // await fs.copyFile(`${watteco_path}/devices/${device}/package-lock.json`, `${actilityDevicePath}/package-lock.json`);
    
        await fs.copyFile(`${watteco_path}/devices/${device}/webpack.config.js`, `${actilityDevicePath}/webpack.config.js`);

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

    let actility_path = argv[1];
    console.log("Actility path:", actility_path);

    let sensorFilter = argv[2];
    console.log("Sensor filter:", sensorFilter);

    // Get devices to be processed
    const { devices, actility_devices } = tools.getDevices(sensorFilter);
    if (devices.length === 0) process.exit(0);

    // Start the copy and deployment process
    await copyAndDeployFiles(watteco_path, actility_path, devices, actility_devices);
  } catch (err) {
    console.error('Error in script execution:', err.message);
    process.exit(1); // Exit the script immediately on error
  }
}

// Run the main function
main();
