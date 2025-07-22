/**
 * Script to copy and deploy files for Actility devices, with optional filtering based on a regex pattern.
 *
 * Usage:
 *  - Run without filter to process all devices:
 *      node actility_deployment.js <watteco_path> <actility_path>
 *
 *  - Run with a filter to process specific devices (use a regex pattern):
 *      node actility_deployment.js <watteco_path> <actility_path> "flash'o|intens'o|vaqa'o"
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
 *   Launch from utilities directory: node .\actility_deployment.js .. ..\..\_ForkActility\device-catalog\ "atm'o" 
 * 
 */

const fs1 = require('fs'); // Use promises API for fs
const fs = require('fs').promises; // Use promises API for fs
const path = require('path'); 
const tools = require("./_CommonTools.js");

function syncMetadataToPackage(directoryPath) {
  const metadataJsonPath = path.join(directoryPath, 'metadata.json');
  const packageJsonPath = path.join(directoryPath, 'package.json');

  // Check if package.json exists
  if (!fs1.existsSync(packageJsonPath)) {
    console.error(`File not found: ${packageJsonPath}`);
    return;
  }

  // Check if metadata.json exists
  if (!fs1.existsSync(metadataJsonPath)) {
    console.error(`File not found: ${metadataJsonPath}`);
    return;
  }
  // Read package.json and metadata.json files
  const packageJson = JSON.parse(fs1.readFileSync(packageJsonPath, 'utf8'));
  const metadataJson = JSON.parse(fs1.readFileSync(metadataJsonPath, 'utf8'));

  // Get the current version from package.json
  let currentVersion = metadataJson.version || '0.0.0';
  let currentName = metadataJson.name || packageJson.name || 'unknown';
  let currentDescription = metadataJson.description || packageJson.description || '';

  // Synchronize the version in package.json if necessary
  if ((packageJson.version !== currentVersion) || (currentName !== packageJson.name) || (currentDescription !== packageJson.description)) {
    packageJson.name = currentName;
    packageJson.version = currentVersion;
    packageJson.description = currentDescription;
    fs1.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
    console.log(`Version & name synchronized in package.json to: ${currentVersion}`);
  }
}


async function updateRequireDecodeUplinkFile(filePath, currentVersionMajorMinor) {
  // Ensure the file exists before attempting to read it
  try {
    if (!(await fs.stat(filePath)).isFile()) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Read the content of the file
    const data = await fs.readFile(filePath, 'utf8');

    // Replace occurrences of "../../codec/decode_uplink" and "../../codec/decode_uplink.js" with the current version
    let modifiedData = data.replace(/(?:\.\.\/\.\.\/codec\/decode_uplink(?:\.js)?)/g, `../../codec${currentVersionMajorMinor}/decode_uplink.js`);

    // Write the modified content back to the file
    await fs.writeFile(filePath, modifiedData, 'utf8');
  } catch (err) {
    console.error(`Error in updateRequireDecodeUplinkFile: ${err.message}`);
    process.exit(1); // Exit the script immediately on error
  }
}

async function copyAndDeployFiles(watteco_path, actility_path, devices, actility_devices) {
  // TODO: Update variables below according current sources version and actility version
  let currentVersionMajorMinor = "v1.1"
  let actilityVersion = "v5"

  try {
    // Copy common codec files ["standard.js", batch.js,convert_tools.js, tic.js, decode_uplink.js]
    const filesToCopy = ["standard.js", "batch.js", "convert_tools.js", "tic.js", "decode_uplink.js", "encode_downlink.js"];
    const sourceDir = `${watteco_path}/codec`;
    const destDir = `${actility_path}/vendors/watteco/codec_${currentVersionMajorMinor}`;
    console.log(`Coping files from '${sourceDir}' to '${destDir}'`);
    filesToCopy.forEach(file => {
      const sourceFilePath = path.join(sourceDir, file);
      const destFilePath = path.join(destDir, file);
      fs.copyFile(sourceFilePath, destFilePath);
        //console.log(`Copied: ${file}`);
    });

    // Copy and process device-specific files sequentially
    for (let i in devices) {
      const device = devices[i];
      const actilityDevicePath = `${actility_path}/vendors/watteco/drivers/${actility_devices[i]}_${currentVersionMajorMinor}`;
    
      try {
        // Copy device-specific files sequentially without creating intermediate variables
        
        console.log(`Processing ${device} ...`);

        await fs.copyFile(`${watteco_path}/devices/${device}/${device}.js`, `${actilityDevicePath}/${device}.js`);
        await updateRequireDecodeUplinkFile(`${actilityDevicePath}/${device}.js`,`_${currentVersionMajorMinor}`);
    
        await fs.copyFile(`${watteco_path}/devices/${device}/main.js`, `${actilityDevicePath}/main.js`);
    
        await fs.copyFile(`${watteco_path}/devices/${device}/examples.json`, `${actilityDevicePath}/examples.json`);
    
        await fs.copyFile(`${watteco_path}/devices/${device}/metadata.json`, `${actilityDevicePath}/metadata.json`);
        let actilityDriverName = device.replace(/_/g, '-').replace(/'/g, '') + `_${actilityVersion}`; /* ie: "pulse_sens'o_atex" becomes "pulse-senso-atex_v5" */
        tools.updateJSON_name_description(`${actilityDevicePath}/metadata.json`, `${actilityDriverName}`, `Driver for ${device} sensor`);
    
        await fs.copyFile(`${watteco_path}/devices/${device}/uplink.schema.json`, `${actilityDevicePath}/uplink.schema.json`);
    
        // Not ready to deliver actility, to many differences with package.json and driver-example-spec.js from actility
        // await fs.copyFile(`${watteco_path}/devices/${device}/package.json`, `${actilityDevicePath}/package.json`);
        // await fs.copyFile(`${watteco_path}/devices/${device}/driver-example-spec.js`, `${actilityDevicePath}/driver-example-spec.js`);
        // await fs.copyFile(`${watteco_path}/devices/${device}/package-lock.json`, `${actilityDevicePath}/package-lock.json`);
      
        //await fs.copyFile(`${watteco_path}/devices/${device}/webpack.config.js`, `${actilityDevicePath}/webpack.config.js`);
        
        // Only sync metata version description and name to package version and name in actility directory
        syncMetadataToPackage(actilityDevicePath);

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
    const { devices, actility_devices, ttn_devices} = tools.getDevices(sensorFilter);
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
