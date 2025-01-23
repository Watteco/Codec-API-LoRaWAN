/**
 * Script to copy and deploy files for TTN devices, with optional filtering based on a regex pattern.
 *
 * Usage:
 *  - Run without filter to process all devices:
 *      node ttn_deployment.js <watteco_path> <ttn_path>
 *
 *  - Run with a filter to process specific devices (use a regex pattern):
 *      node ttn_deployment.js <watteco_path> <ttn_path> "flash'o|intens'o|vaqa'o"
 *
 * Parameters:
 *  - watteco_path: Path to the Watteco directory.
 *  - ttn_path: Path to the ttn deployment directory.
 *  - devices_to_process (optional): A regex pattern to match device names.
 *
 * Behavior:
 *  - If a regex pattern is provided, only devices matching the pattern will be processed.
 *  - If no devices match the pattern, the script exits with a message.
 *  - Without a regex pattern, all devices in the list are processed.
 * 
 * Uasage example: 
 *   Launch from utilities directory: node .\ttn_deployment.js .. ..\..\_ForkTTN\device-catalog\ "atm'o" 
 * 
 */

const fs1 = require('fs');
const fs = require('fs').promises; // Use promises API for fs
const tools = require("./_CommonTools.js");
const yaml = require('js-yaml');

/**
 * Ensures a device exists in the 'endDevices' list of a YAML file.
 * Adds the device if missing, sorts the list, and updates the file.
 *
 * @param {string} filePath - Path to the YAML file.
 * @param {string} deviceName - Device name to ensure in the list.
 */
function ensureDeviceInYaml(filePath, deviceName) {
  try {
    const fileContent = fs1.readFileSync(filePath, 'utf8');
    let data = yaml.load(fileContent);
    if (!data.endDevices || !Array.isArray(data.endDevices)) {
      data.endDevices = [];
    }
    if (!data.endDevices.includes(deviceName)) {
      data.endDevices.push(deviceName);
    }
    data.endDevices.sort();
    const updatedYaml = yaml.dump(data);
    fs1.writeFileSync(filePath, updatedYaml, 'utf8');
    // console.log(`Device '${deviceName}' ensured in ${filePath}`);
  } catch (err) {
    console.error(`Error processing the file: ${err.message}`);
  }
}


function createTTNCodecYAML(JSONExamplesInputFile,ttnDevicePath,ttnDevice) {
  // Read the JSON file
  const jsonData = JSON.parse(fs1.readFileSync(JSONExamplesInputFile, 'utf8'));

  // Transform the JSON data
  const yamlData = {
    uplinkDecoder: {
      fileName: `${ttnDevice}.js`,
      examples: jsonData.map((example) => {
        return {
          description: example.description,
          input: {
            // Convert bytes into an array of hex values
            bytes: `[${example.input.bytes.match(/.{1,2}/g).map((byte) => `0x${byte.toLowerCase()}`).join(', ')}]`,
            fPort: example.input.fPort,
            recvTime: example.input.recvTime,
          },
          output: {
            data: Array.isArray(example.output.data)
              ? { samples: example.output.data.map(item => ({
                  variable: item.variable,
                  value: item.value,
                  date: item.date,
                })) }
              : example.output.data, // If not an array, just use the data as is
            warnings: example.output.warnings || [],
          },
        };
      }),
    }
  };

  // Write the YAML file
  let  yamlFile = `${ttnDevicePath}/${ttnDevice}-codec.yaml`
  fs1.writeFileSync(yamlFile, yaml.dump(yamlData, {
    noRefs: true,          // Prevent duplicate references
    lineWidth: -1,         // Ensure arrays are always in a single line
    quotingType: "'",      // Use single quotes for strings
  }).replace(/'?\[(.*?)\]'?/g, '[$1]')); // Remove quotes around arrays

}

async function copyAndDeployFiles(watteco_path, ttn_path, devices, ttn_devices) {
  try {

    // Copy and process device-specific files sequentially
    for (let i in devices) {
      const device = devices[i];
      const ttnDevicePath = `${ttn_path}/vendor/watteco`;
    
      try {
        // Copy device-specific files sequentially without creating intermediate variables
        
        console.log(`Processing ${device} ...`);

        let ttn_device =  ttn_devices[i];

        // Make specific adaptation for some device name for ttn (TTN sensor names must be longer tha 3 chars)
        // and in th case it make the same kind of name than "indoor-temperature" for "indoor-temperature-humidity"
        if (ttn_device == "th") ttn_device = "indoor-temperature-humidity";

        // Create the effective codec js file from main.js of watteco
        await fs.copyFile(`${watteco_path}/devices/${device}/main.js`, `${ttnDevicePath}/${ttn_device}.js`);
    
        // Create <device>.png from png file in the Watteco device
        let devicePurged = device.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        let pngWattecoFilePath= `${watteco_path}/devices/${device}/watteco-${devicePurged}-sensor.png`;
        await fs.copyFile(pngWattecoFilePath, `${ttnDevicePath}/${ttn_device}.png`);

        // Create <device>-codec.yaml with examples from examples.json
        createTTNCodecYAML(`${watteco_path}/devices/${device}/examples.json`, `${ttnDevicePath}`, `${ttn_device}`);
        
        // Then ensure device is well defined in index.yaml
        ensureDeviceInYaml(`${ttnDevicePath}/index.yaml`, ttn_device);


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

    let ttn_path = argv[1];
    console.log("TTN path:", ttn_path);

    let sensorFilter = argv[2];
    console.log("Sensor filter:", sensorFilter);

    // Get devices to be processed
    const { devices, actility_devices, ttn_devices} = tools.getDevices(sensorFilter);
    if (devices.length === 0) process.exit(0);

    // Start the copy and deployment process
    await copyAndDeployFiles(watteco_path, ttn_path, devices, ttn_devices);
  } catch (err) {
    console.error('Error in script execution:', err.message);
    process.exit(1); // Exit the script immediately on error
  }
}

// Run the main function
main();
