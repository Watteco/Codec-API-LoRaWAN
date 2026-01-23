/**
 * Script to build distributed devices by optionally filtering them using a regex pattern.
 * the script also allow to update "version" field from package.json and keep "version" from metadata synchronised
 * 
 * Note: This script uses buidandTranspile function from _CommonTools.js. 
 *       This function webpacks, transpiles to ES5 and mangle again, giving the final main.js file.
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
 *  - Run with "." as filter to use the current directory name as the filter:
 *      node rebuild_main.js .
 *
 * Parameters:
 *  - -v or --version (optional): A version type or custom version (major, minor, patch, or x.y.z).
 *     BEWARE: For now, the building tools can manage only a single "major.minor" version. Changing major or minor :
 *     - MUST be done in all devices at the same time
 *     - IMPLY a manual modification of the versions in actility_deployment.js (currentVersionMajorMinor and actilityVersion)
 *  - filter (optional): A regex pattern to match device names. If "." is used, it will take the current directory name
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
let generateLite = false;
let multilineFlag = false;
let noterserFlag = false;
let terserSafeTBFlag = false;
let noMinifyFlag = false;
let bacnetOnlyFlag = false;
let alsoThingsboardFlag = false;

// Parse the arguments

// Parse the arguments
for (let i = 0; i < args.length; i++) {
    if (args[i] === '-v' || args[i] === '--version') {
      versionOrTypeParam = args[i + 1] || ''; // If a version argument follows, use it
      i++; // Skip the next argument (the version value)
    } else if (args[i] === '--lite' || args[i] === '--generate-lite') {
      generateLite = true;
    } else if (args[i] === '--multiline') {
      multilineFlag = true;
    } else if (args[i] === '--noterser') {
      noterserFlag = true;
    } else if (args[i] === '--thingsboard') {
      terserSafeTBFlag = true;
    } else if (args[i] === '--also-thingsboard') {
      // When set, also produce an additional bundle named <sensor>-thingsboard.js
      alsoThingsboardFlag = true;
    } else if (args[i] === '--bacnetOnly' || args[i] === '--bacnet-only' || args[i] === '-bacnetOnly') {
      // When set, only regenerate BACnet-related files (units/multitech/milesight)
      // and skip the webpack/bundling steps (no main rebuild).
      bacnetOnlyFlag = true;
    } else if (args[i] === '--no-minify' || args[i] === '--no-minimise') {
      // disable all minification (webpack + terser)
      noMinifyFlag = true;
    } else {
      filter = args[i]; // The filter regex pattern (if given)
    }
}

if (filter === '.') {
  filter = path.basename(process.cwd());
}

// Get devices to be processed
const { devices, actility_devices, ttn_devices} = tools.getDevices(filter);
if (devices.length === 0) process.exit(0); 

// Execute commands for each filtered device
for (let i in devices) {
  sensorName = devices[i];
  console.log(`Building ${sensorName} ...`);    
  
  let devicePath = path.join(__dirname, `../devices/${sensorName}`);
  
  // Generate units.auto.js file for the device
  tools.generateDeviceUnitsAutoFile(devicePath);

  // Update version in package.json and metadata.json if versionOrTypeParam is provided
  updateVersionAndSyncMetadata(devicePath, versionOrTypeParam);

  // Get the updated version from package.json
  const packageJsonPath = path.join(devicePath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const updatedVersion = packageJson.version;
  
  // Define a list of devices to skip for MultitechBacnet definition generation
  const skipMultitechDevices = ["tics'o"];
  
  // Check if this device should skip MultitechBacnet definition generation
  const shouldSkipMultitech = skipMultitechDevices.some(skipDevice => 
      sensorName.toLowerCase() === skipDevice.toLowerCase() || 
      sensorName.replace(/['"]/g, '') === skipDevice.replace(/['"]/g, '')
  );
  
  if (shouldSkipMultitech) {
      console.log(`Skipping MultitechBacnet definition for ${sensorName} - using existing manual definition file`);
  } else {
      // Generate MultitechBacnet definition
      tools.generateMultitechBacnetDefinition(devicePath, null, updatedVersion);
  }
  
  // Define a list of devices to skip for MilesightBacnet mapping generation
  const skipMilesightDevices = ["tics'o"];

  // Check if this device should skip MilesightBacnet mapping generation
  const shouldSkipMilesight = skipMilesightDevices.some(skipDevice => 
      sensorName.toLowerCase() === skipDevice.toLowerCase() || 
      sensorName.replace(/['"]/g, '') === skipDevice.replace(/['"]/g, '')
  );

  if (shouldSkipMilesight) {
      console.log(`Skipping MilesightBacnet mapping for ${sensorName} - using existing manual mapping file`);
  } else {
      // Generate MilesightBacnet mapping
      tools.generateMilesightBacnetMapping(devicePath);
  }
    
    // If --bacnet-only is enabled, skip bundling/building main output.
  if (bacnetOnlyFlag) {
    console.log(`--bacnet-only set: skipping main rebuild for ${sensorName} (BACnet files regenerated only).`);
    continue;
  }

    // Optionally generate a "lite" standard.js for this device before building.
    // Toggle with --lite or --generate-lite when invoking this script.
  if (generateLite) {
      const clustersFile = path.join(devicePath, 'ClustersVariables.json');
      if (fs.existsSync(clustersFile)) {
        try {
          console.log(`Generating lite standard (AST) for ${sensorName}...`);
          const astScript = path.join(__dirname, 'extract_ast.js');
          const outLite = path.join(devicePath, 'standard.lite.js');
          // extract_ast.js usage: node utilities/extract_ast.js <clustersJsonPath> [outFile]
          const cmd = `node "${astScript}" "${clustersFile}" "${outLite}"`;
          execSync(cmd, { stdio: 'inherit' });
        } catch (err) {
          console.warn(`Lite generation failed for ${sensorName}: ${err && err.message ? err.message : err}`);
        }
      } else {
        console.log(`No ClustersVariables.json for ${sensorName}, skipping lite generation.`);
      }
    }
    // If generateLite is requested and a lite file was created for this device,
    // temporarily override the global codec/standard.js with the lite file so the
    // device bundle includes the smaller decoder. We backup the original and restore it after the build.
    if (generateLite) {
      const outLite = path.join(devicePath, 'standard.lite.js');
      const globalStandard = path.join(__dirname, '../codec/standard.js');
      const backupStandard = globalStandard + `.backup-for-${sensorName}`;
      if (fs.existsSync(outLite)) {
        try {
          // Backup global standard.js
          if (fs.existsSync(globalStandard)) {
            fs.copyFileSync(globalStandard, backupStandard);
          }
          // Copy lite to global location.
          // The AST extractor emits a file with requires rewritten for placement under devices/<device>/,
          // e.g. require("../../codec/convert_tools.js"). When we temporarily place the lite file under
          // codec/standard.js we must revert those paths to the original local require ("./convert_tools.js").
          try {
            let content = fs.readFileSync(outLite, 'utf8');
            // Replace ../../codec/convert_tools.js -> ./convert_tools.js (handles single/double quotes)
            content = content.replace(/require\(["']\.\.\/\.\.\/codec\/convert_tools\.js["']\)/g, "require('./convert_tools.js')");
            content = content.replace(/require\(["']\.\.\/\.\.\/codec\/convert_tools\.js["']\)/g, "require(\'./convert_tools.js\')");
            content = content.replace(/require\(["']\.\.\/codec\/convert_tools\.js["']\)/g, "require('./convert_tools.js')");
            content = content.replace(/require\(["']\.\.\/codec\/convert_tools\.js["']\)/g, "require(\'./convert_tools.js\')");
            // As a final fallback, replace any ../../codec/convert_tools.js occurrences
            content = content.replace(/\.\.\/\.\.\/codec\/convert_tools\.js/g, './convert_tools.js');
            content = content.replace(/\.\.\/codec\/convert_tools\.js/g, './convert_tools.js');
            fs.writeFileSync(globalStandard, content, 'utf8');
            console.log(`Temporarily replaced codec/standard.js with ${outLite} for ${sensorName} (paths adjusted)`);
          } catch (err) {
            // Fallback to direct copy if something goes wrong with text replacement
            fs.copyFileSync(outLite, globalStandard);
            console.log(`Temporarily replaced codec/standard.js with ${outLite} for ${sensorName} (direct copy)`);
          }
          // Build while override is in place
          tools.buildAndTranspile(devicePath, { multiline: multilineFlag, noterser: (noterserFlag || noMinifyFlag), noWebpackMinify: noMinifyFlag, terserSafeTB: terserSafeTBFlag });
        } catch (err) {
          console.error(`Build failed for ${sensorName} with lite override: ${err && err.message ? err.message : err}`);
        } finally {
          // Restore original global standard.js
          try {
            if (fs.existsSync(backupStandard)) {
              fs.copyFileSync(backupStandard, globalStandard);
              fs.unlinkSync(backupStandard);
              console.log(`Restored original codec/standard.js after building ${sensorName}`);
            } else {
              // No backup: remove the temporary global standard if we created it
              // (this is unlikely but safe)
              // do nothing
            }
          } catch (restoreErr) {
            console.error(`Failed to restore original codec/standard.js: ${restoreErr && restoreErr.message ? restoreErr.message : restoreErr}`);
          }
        }
      } else {
  // No lite file: just build normally
  tools.buildAndTranspile(devicePath, { multiline: multilineFlag, noterser: (noterserFlag || noMinifyFlag), noWebpackMinify: noMinifyFlag, terserSafeTB: terserSafeTBFlag });
      }
    } else {
  tools.buildAndTranspile(devicePath, { multiline: multilineFlag, noterser: (noterserFlag || noMinifyFlag), noWebpackMinify: noMinifyFlag, terserSafeTB: terserSafeTBFlag });
    }

  // Prepend sensor name as a comment to the generated main bundle so
  // it's easier to identify which minified file belongs to which device.
  try {
    // Read the device webpack config to get the output filename
    const webpackConfigPath = path.join(devicePath, 'webpack.config.js');
    if (fs.existsSync(webpackConfigPath)) {
      // Require the config without cache to reflect any local changes
      delete require.cache[require.resolve(webpackConfigPath)];
      const webpackConfig = require(webpackConfigPath);
      let outPath = webpackConfig.output && webpackConfig.output.path ? webpackConfig.output.path : devicePath;
      let outFilename = webpackConfig.output && webpackConfig.output.filename ? webpackConfig.output.filename : `${sensorName}.js`;

      // Make paths absolute
      if (!path.isAbsolute(outPath)) outPath = path.resolve(devicePath, outPath);

      const bundlePath = path.join(outPath, outFilename);

      if (fs.existsSync(bundlePath)) {
        const comment = `/*${sensorName} v${updatedVersion}*/`;
        const content = fs.readFileSync(bundlePath, 'utf8');

        // Avoid double-prepending if comment already present
        if (!content.startsWith(comment)) {
          fs.writeFileSync(bundlePath, comment + content, 'utf8');
          console.log(`Prefixed bundle with sensor name: ${bundlePath}`);
        } else {
          // already present
        }
      } else {
        console.warn(`Bundle not found to prefix for ${sensorName}: ${bundlePath}`);
      }
    }
  } catch (err) {
    console.error(`Error while prefixing bundle for ${sensorName}: ${err.message}`);
  }

    // Force name (npm: watteco-<device with _ replacing space and '>) or description for sensors (activate when needed)
    npmSensorName = `watteco-${sensorName.replace(/ /g, '_').replace(/'/g, '_')}`;
    tools.updateJSON_name_description(`${devicePath}/package.json`, npmSensorName, `Driver for ${sensorName} sensor`);

    // Optionally generate an additional ThingsBoard-safe bundle.
    if (alsoThingsboardFlag) {
      try {
        const webpackConfigPath = path.join(devicePath, 'webpack.config.js');
        let outPath = devicePath;
        let outFilename = `${sensorName}.js`;
        if (fs.existsSync(webpackConfigPath)) {
          delete require.cache[require.resolve(webpackConfigPath)];
          const webpackConfig = require(webpackConfigPath);
          outPath = webpackConfig.output && webpackConfig.output.path ? webpackConfig.output.path : outPath;
          outFilename = webpackConfig.output && webpackConfig.output.filename ? webpackConfig.output.filename : outFilename;

          if (!path.isAbsolute(outPath)) outPath = path.resolve(devicePath, outPath);
        }

        const bundlePath = path.join(outPath, outFilename);
        const backupPath = bundlePath + `.backup-for-thingsboard-${Date.now()}`;

        if (fs.existsSync(bundlePath)) {
          fs.copyFileSync(bundlePath, backupPath);
        }

        console.log(`Generating ThingsBoard variant for ${sensorName}...`);
        // Rebuild with ThingsBoard-safe terser option enabled
        tools.buildAndTranspile(devicePath, { multiline: multilineFlag, noterser: (noterserFlag || noMinifyFlag), noWebpackMinify: noMinifyFlag, terserSafeTB: true });

        if (fs.existsSync(bundlePath)) {
          const targetName = `main-thingsboard.js`;
          const targetPath = path.join(outPath, targetName);
          fs.copyFileSync(bundlePath, targetPath);

          // Prefix the ThingsBoard bundle with sensor name + version, same as normal bundle
          try {
            const comment = `/*${sensorName} v${updatedVersion}*/`;
            const tbContent = fs.readFileSync(targetPath, 'utf8');
            if (!tbContent.startsWith(comment)) {
              fs.writeFileSync(targetPath, comment + tbContent, 'utf8');
            }
          } catch (prefixErr) {
            console.warn(`Failed to prefix ThingsBoard bundle for ${sensorName}: ${prefixErr && prefixErr.message ? prefixErr.message : prefixErr}`);
          }

          console.log(`Created ThingsBoard bundle: ${targetPath}`);
        } else {
          console.warn(`ThingsBoard build did not produce expected bundle for ${sensorName}: ${bundlePath}`);
        }

        // Restore original bundle if backup exists
        if (fs.existsSync(backupPath)) {
          fs.copyFileSync(backupPath, bundlePath);
          fs.unlinkSync(backupPath);
          console.log(`Restored original bundle for ${sensorName}`);
        }
      } catch (err) {
        console.error(`Failed to generate ThingsBoard bundle for ${sensorName}: ${err && err.message ? err.message : err}`);
      }
    }
}
