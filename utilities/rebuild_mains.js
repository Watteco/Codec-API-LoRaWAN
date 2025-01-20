/**
 * Script to build distributed devices by optionally filtering them using a regex pattern.
 * the script also allow to update "version" field from package.json and keep "version" from metadata synchronised
 *
 * Usage:
 *  - Run without filter and without version argument to process all devices:
 *      node rebuild_main.js
 *
 *  - Run with a filter to process specific devices (use a regex pattern):
 *      node rebuild_main.js "flash'o|intens'o|vaqa'o"
 *
 *  - Run with a version argument to update the version in package.json and metadata.json:
 *      node rebuild_main.js -v patch
 *      node rebuild_main.js --version "1.2.3"
 *      node rebuild_main.js "atm'o" --version major
 *
 * Parameters:
 *  - -v or --version (optional): A version type or custom version (major, minor, patch, or x.y.z).
 *  - filter (optional): A regex pattern to match device names.
 *
 * Behavior:
 *  - If a regex pattern is provided, only devices matching the pattern will be processed.
 *  - If no devices match the pattern, the script exits with a message.
 *  - Without a regex pattern, all devices in the list are processed.
 *  - If the version argument is provided, it will update the version in package.json and metadata.json accordingly.
 *  - If version argument is empty, the version in package.json will remain unchanged, but metadata.json will still be synchronized.
 */

const { execSync } = require('child_process');
const fs = require("fs");
const path = require('path');

tools = require("./_CommonTools.js");

function updateVersionAndSyncMetadata(directoryPath, versionOrType = '') {
  const packageJsonPath = path.join(directoryPath, 'package.json');
  const metadataJsonPath = path.join(directoryPath, 'metadata.json');

  // Check if package.json exists
  if (!fs.existsSync(packageJsonPath)) {
    console.error(`File not found: ${packageJsonPath}`);
    return;
  }

  // Check if metadata.json exists
  if (!fs.existsSync(metadataJsonPath)) {
    console.error(`File not found: ${metadataJsonPath}`);
    return;
  }

  // Read package.json and metadata.json files
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const metadataJson = JSON.parse(fs.readFileSync(metadataJsonPath, 'utf8'));

  // Get the current version from package.json
  let currentVersion = packageJson.version || '0.0.0';
  let [major, minor, patch] = currentVersion.split('.').map(num => parseInt(num));

  // Regular expression for validating semantic version format (x.y.z)
  const versionRegex = /^\d+\.\d+\.\d+$/;

  let updatedVersion = currentVersion; // Default: no update

  // Check if the parameter is a custom version (valid version format)
  if (versionRegex.test(versionOrType)) {
    // If the parameter is a valid version (x.y.z), use it as the custom version
    updatedVersion = versionOrType;
    packageJson.version = updatedVersion;
  } else if (versionOrType) {
    // Otherwise, treat it as a version type (major, minor, or patch)
    switch (versionOrType) {
      case 'major':
        major++;
        minor = 0; // Reset minor and patch to 0
        patch = 0;
        break;
      case 'minor':
        minor++;
        patch = 0; // Reset patch to 0
        break;
      case 'patch':
        patch++;
        break;
      default:
        console.error('Invalid version type. Use "major", "minor", "patch", or a custom version (e.g., "1.2.3").');
        return;
    }

    // Update the version field with the new version
    updatedVersion = `${major}.${minor}.${patch}`;
    packageJson.version = updatedVersion;
  }

  // If the version was updated, write it to package.json
  if (updatedVersion !== currentVersion) {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
    console.log(`Version updated to: ${updatedVersion}`);
  }

  // Synchronize the version in metadata.json if necessary
  if (metadataJson.version !== updatedVersion) {
    metadataJson.version = updatedVersion;
    fs.writeFileSync(metadataJsonPath, JSON.stringify(metadataJson, null, 2), 'utf8');
    console.log(`Version synchronized in metadata.json to: ${updatedVersion}`);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);

// Initialize variables
let filter = '';
let versionOrTypeParam = '';

// Parse the arguments

// Parse the arguments
for (let i = 0; i < args.length; i++) {
    if (args[i] === '-v' || args[i] === '--version') {
      versionOrTypeParam = args[i + 1] || ''; // If a version argument follows, use it
      i++; // Skip the next argument (the version value)
    } else {
      filter = args[i]; // The filter regex pattern (if given)
    }
}

// Get devices to be processed
const { devices, actility_devices } = tools.getDevices(filter);
if (devices.length === 0) process.exit(0); 

// Execute commands for each filtered device
for (let i in devices) {
        
    console.log(`Building ${devices[i]} ...`);
    let command = `npm --prefix ../devices/${devices[i]} run rebuild`;
    //console.log(command);
    execSync(command);

    // Update version in package.json and metadata.json if versionOrTypeParam is provided
    updateVersionAndSyncMetadata(`../devices/${devices[i]}`, versionOrTypeParam);

   // Add driver exports that is executed "conditionnaly" if current JS environment allows it
    let conditional_exports = `if (typeof exports !== "undefined" && typeof module !== "undefined" && module.exports) { exports.driver = driver; }`;
    filePath = `../devices/${devices[i]}/main.js`;

    try {
      fs.appendFileSync(filePath, conditional_exports, "utf8");
      //console.log(`Successfully appended conditional exports to ${filePath}`);
    } catch (err) {
      console.error(`Error appending conditional exports : ${err.message}`);
    }

}
