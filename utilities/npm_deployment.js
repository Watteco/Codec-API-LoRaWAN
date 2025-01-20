/**
 * Script deploying devices on npm repository, with optional filtering based on a regex pattern.
 *
 * Usage:
 *  - Run without filter to process all devices:
 *      node npm_deployment.js 
 *
 *  - Run with a filter to process specific devices (use a regex pattern):
 *      node npm_deployment.js <watteco_path> ["flash'o|intens'o|vaqa'o"]
 *
 * Parameters:
 *  - watteco_path: Path to the Watteco directory. 
 *  - devices_to_process (optional): A regex pattern to match device names.
 *
 * Behavior:
 *  - If a regex pattern is provided, only devices matching the pattern will be processed.
 *  - If no devices match the pattern, the script exits with a message.
 *  - Without a regex pattern, all devices in the list are processed.
 * 
 * Uasage example: 
 *   Launch from utilities directory: node .\npm_deployment.js "atm'o" 
 * 
 */

const fs = require("fs");
const tools = require("./_CommonTools.js");
const path = require("path");
const { execSync } = require("child_process");


/**
 * Checks if the user is logged in to npm.
 * If not logged in, prompts the user to log in.
 */
function ensureNpmLogin() {
  
  try {
    // Check if npm is logged in by running `npm whoami`
    const username = execSync("npm whoami", { encoding: "utf-8" }).trim();
    console.log(`You are already logged in to npm as: ${username}`);
    if (username != "watteco") {
      console.error("You must be logged as 'watteco' to update Watteco npm packages. Exiting.");
      process.exit(1); // Exit the script if login fails
    }
  } catch (err) {
    console.log("You are not logged in to npm. Please log in:");
    try {
      execSync("npm login", { stdio: "inherit" });
      console.log("Login successful.");
    } catch (loginErr) {
      console.error("Failed to log in to npm. Exiting.");
      process.exit(1); // Exit the script if login fails
    }
  }
}

/**
 * Publishes a single npm package located in the specified directory.
 * @param {string} dir - Path to the directory containing the npm package.
 */
function publishPackage(dir) {
  const fullPath = path.resolve(dir);

  // Check if directory exists
  if (!fs.existsSync(fullPath)) {
    console.error(`Directory not found: ${fullPath}`);
    return;
  }

  // Check if package.json exists in the directory
  const packageJsonPath = path.join(fullPath, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    console.error(`No package.json found in: ${fullPath}`);
    return;
  }

  // Navigate to the package directory and publish
  console.log(`Publishing package in ${fullPath}...`);
  execSync("npm publish", { cwd: fullPath, stdio: "inherit" });

  console.log(`Successfully published: ${dir}`);
}

async function publishPackages(watteco_path, devices) {
  try {

    // Copy and process device-specific files sequentially
    for (let i in devices) {
      const device = devices[i];
      
      console.log(`Publishing ${device} ...`);

      publishPackage(`${watteco_path}/devices/${device}`);
    }
  } catch (err) {
    console.error(`Error in publishPackages: ${err.message}`);
    process.exit(1); // Exit the script immediately on error
  }
}

async function main() {
  try {
    let argv = process.argv.slice(2);

    let watteco_path = argv[0];
    console.log("Watteco path:", watteco_path);

    let sensorFilter = argv[1];
    console.log("Sensor filter:", sensorFilter);

    // Get devices to be processed
    const { devices, actility_devices } = tools.getDevices(sensorFilter);
    if (devices.length === 0) process.exit(0);

    // Start the copy and deployment process
    publishPackages(watteco_path, devices);
  } catch (err) {
    console.error('Error while npm publish:', err.message);
    process.exit(1); // Exit the script immediately on error
  }
}

// Ensure the user is logged in to npm
ensureNpmLogin();

// Run the main function
main();
