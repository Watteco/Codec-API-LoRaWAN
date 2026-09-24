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

const fs = require('fs').promises; // Use promises API for fs
const path = require('path');
const tools = require("./_CommonTools.js");

const MANUFACTURER_IMPL_VERSION_COMMENT = "# Version of the manufacturer's own codec/decoder implementation, when provided by the manufacturer";

async function updateManufacturerImplVersion(driverYamlPath, manufacturerImplVersion) {
  if (typeof manufacturerImplVersion !== 'string' || manufacturerImplVersion.trim() === '') {
    throw new Error('manufacturerImplVersion must be a non-empty string');
  }

  const version = manufacturerImplVersion.trim();
  const data = await fs.readFile(driverYamlPath, 'utf8');
  const newline = data.includes('\r\n') ? '\r\n' : '\n';
  const lines = data.split(/\r?\n/);
  const fieldPattern = /^manufacturerImplVersion\s*:/;
  const existingFieldIndex = lines.findIndex(line => fieldPattern.test(line));

  if (existingFieldIndex !== -1) {
    const inlineComment = lines[existingFieldIndex].match(/\s+#.*$/)?.[0] || '';
    lines[existingFieldIndex] = `manufacturerImplVersion: ${version}${inlineComment}`;
  } else {
    const existingCommentIndex = lines.findIndex(line => line.trim() === MANUFACTURER_IMPL_VERSION_COMMENT);
    if (existingCommentIndex !== -1) {
      lines.splice(existingCommentIndex + 1, 0, `manufacturerImplVersion: ${version}`);
    } else {
      const preferredAnchorPatterns = [
        /^manufacturerSpecVersion\s*:/,
        /^packageVersion\s*:/,
      ];
      let anchorIndex = -1;

      for (const anchorPattern of preferredAnchorPatterns) {
        anchorIndex = lines.findIndex(line => anchorPattern.test(line));
        if (anchorIndex !== -1) break;
      }

      const newLines = [MANUFACTURER_IMPL_VERSION_COMMENT, `manufacturerImplVersion: ${version}`];
      if (anchorIndex !== -1) {
        lines.splice(anchorIndex + 1, 0, ...newLines);
      } else {
        if (lines.at(-1) === '') lines.pop();
        lines.push(...newLines, '');
      }
    }
  }

  await fs.writeFile(driverYamlPath, lines.join(newline), 'utf8');
}

function normalizeExampleValue(value) {
  if (Array.isArray(value)) return value.map(normalizeExampleValue);

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map(key => [key, normalizeExampleValue(value[key])])
    );
  }

  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    const timestamp = new Date(value);
    if (!Number.isNaN(timestamp.getTime())) return timestamp.toISOString();
  }

  return value;
}

function comparableExample(example, includeOutput) {
  const comparable = {
    type: example.type,
    input: example.input,
  };
  if (includeOutput) comparable.output = example.output;
  return JSON.stringify(normalizeExampleValue(comparable));
}

async function synchronizeExamples(sourcePath, destinationPath) {
  const sourceExamples = JSON.parse(await fs.readFile(sourcePath, 'utf8'));
  if (!Array.isArray(sourceExamples)) {
    throw new Error(`Expected an array of examples in ${sourcePath}`);
  }

  let destinationExamples;
  try {
    destinationExamples = JSON.parse(await fs.readFile(destinationPath, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    await fs.copyFile(sourcePath, destinationPath);
    return { added: sourceExamples.length, updated: 0, preserved: 0, removed: 0 };
  }

  if (!Array.isArray(destinationExamples)) {
    throw new Error(`Expected an array of examples in ${destinationPath}`);
  }

  const destinationByInput = new Map();
  for (const example of destinationExamples) {
    const key = comparableExample(example, false);
    if (destinationByInput.has(key)) {
      throw new Error(`Duplicate Actility example identity in ${destinationPath}`);
    }
    destinationByInput.set(key, example);
  }

  const sourceKeys = new Set();
  const synchronizedExamples = [];
  let added = 0;
  let updated = 0;
  let preserved = 0;

  for (const sourceExample of sourceExamples) {
    const key = comparableExample(sourceExample, false);
    if (sourceKeys.has(key)) {
      throw new Error(`Duplicate source example identity in ${sourcePath}`);
    }
    sourceKeys.add(key);

    const destinationExample = destinationByInput.get(key);
    if (!destinationExample) {
      synchronizedExamples.push(sourceExample);
      added++;
    } else if (
      comparableExample(sourceExample, true) === comparableExample(destinationExample, true)
    ) {
      // Preserve Actility-owned points, BACnet and Modbus fields when the
      // input/output behavior is unchanged. Timestamp precision is ignored.
      synchronizedExamples.push(destinationExample);
      preserved++;
    } else {
      // Actility enrichments describe the previous output and must not survive
      // a behavior change. They can be regenerated during review of the MR.
      synchronizedExamples.push(sourceExample);
      updated++;
    }
  }

  const removed = destinationExamples.length - [...destinationByInput.keys()]
    .filter(key => sourceKeys.has(key)).length;

  if (added > 0 || updated > 0 || removed > 0) {
    await fs.writeFile(destinationPath, `${JSON.stringify(synchronizedExamples, null, 2)}\n`, 'utf8');
  }

  return { added, updated, preserved, removed };
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
  const currentVersionMajorMinor = "v1.1";

  try {
    // Copy and process device-specific files sequentially
    for (let i in devices) {
      const device = devices[i];
      const devicePath = path.join(watteco_path, 'devices', device);
      const actilityDevicePath = path.join(
        actility_path,
        'vendors',
        'watteco',
        'drivers',
        `${actility_devices[i]}_${currentVersionMajorMinor}`
      );

      try {
        console.log(`Processing ${device} ...`);

        // Actility keeps the readable device implementation in main.js and
        // uses the self-contained bundle in index.js as the executable entrypoint.
        const actilityMainPath = path.join(actilityDevicePath, 'main.js');
        await fs.copyFile(path.join(devicePath, `${device}.js`), actilityMainPath);
        await updateRequireDecodeUplinkFile(actilityMainPath, `_${currentVersionMajorMinor}`);

        await fs.copyFile(path.join(devicePath, 'main.js'), path.join(actilityDevicePath, 'index.js'));

        const actilityExamplesPath = path.join(actilityDevicePath, 'examples.json');
        const exampleChanges = await synchronizeExamples(
          path.join(devicePath, 'examples.json'),
          actilityExamplesPath
        );
        console.log(
          `Synchronized examples in '${actilityExamplesPath}' ` +
          `(added: ${exampleChanges.added}, updated: ${exampleChanges.updated}, ` +
          `preserved: ${exampleChanges.preserved}, removed: ${exampleChanges.removed})`
        );
        if (exampleChanges.added > 0 || exampleChanges.updated > 0) {
          console.warn(
            `  - ${exampleChanges.added + exampleChanges.updated} example(s) need Actility points/BACnet/Modbus enrichment.`
          );
        }

        const packageJsonPath = path.join(devicePath, 'package.json');
        const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
        const driverYamlPath = path.join(actilityDevicePath, 'driver.yaml');
        await updateManufacturerImplVersion(driverYamlPath, packageJson.version);
        console.log(`Updated manufacturerImplVersion to ${packageJson.version} in '${driverYamlPath}'`);

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

module.exports = {
  copyAndDeployFiles,
  synchronizeExamples,
  updateManufacturerImplVersion,
};

// Run the main function when this file is executed directly
if (require.main === module) main();
