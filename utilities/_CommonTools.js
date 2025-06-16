const fs = require('fs');
const path = require('path');
const webpack = require("webpack");
const babel = require("@babel/core");
const terser = require("terser"); // Import Terser for final minification
const deasync = require("deasync"); // To force sync execution of Webpack

/**
 * Build and transpile a JavaScript project using Webpack and Babel synchronously.
 *
 * This function performs the following steps:
 * 1. **Runs Webpack synchronously** using Webpack’s compiler API.
 * 2. **Reads the generated Webpack output filename** from `webpack.config.js`.
 * 3. **Uses Babel** to transpile the Webpack output to ES5 (`[output].es5.js`).
 * 4. **Runs Webpack synchronously again** to re-bundle the ES5 file.
 * 5. **Ensures all operations are fully synchronous (no async/await, no subprocesses).**
 * 6. **Outputs two final bundled files directly inside the project directory**:
 *    - `[webpack_output].js`  → Original Webpack bundle
 *    - `[webpack_output].es5.js` → Transpiled & re-bundled ES5 file
 *
 * @param {string} projectDir - The absolute path to the project directory
 * containing `webpack.config.js`, `package.json`, and source files.
 *
 * @throws {Error} If Webpack, Babel, or file operations fail.
 *
 * @example
 * buildAndTranspile("/path/to/project");
 */
function buildAndTranspile(projectDir) {

    // WEBPACK original sources ==> main.js
    //-------------------------------------
    const webpackConfigPath = path.join(projectDir, "webpack.config.js");

    if (!fs.existsSync(webpackConfigPath)) {
        throw new Error(`Error: webpack.config.js not found in ${projectDir}`);
    }

    const webpackConfig = require(webpackConfigPath);

    // Ensure output.path is absolute
    if (!path.isAbsolute(webpackConfig.output.path)) {
        webpackConfig.output.path = path.resolve(projectDir, webpackConfig.output.path);
    }

    // Ensure entry is absolute
    if (!path.isAbsolute(webpackConfig.entry)) {
        webpackConfig.entry = path.resolve(projectDir, webpackConfig.entry);
    }

    const outputFilename = webpackConfig.output?.filename;

    if (!outputFilename) {
        throw new Error("Error: Webpack output filename not found in config.");
    }

    const outputPath = path.join(webpackConfig.output.path, outputFilename);

    const es5Filename = outputFilename;
    // Following would create a separate .e5.js file. Beware deployments should be adapted to use this new filename
    //const es5Filename = outputFilename.replace(/\.js$/, ".es5.js");
    
    const es5OutputPath = path.resolve(webpackConfig.output.path, es5Filename);

    process.stdout.write("Webpacking... ");

    // Run Webpack synchronously using deasync
    const compiler = webpack(webpackConfig);
    let isDone = false;
    let webpackError = null;

    compiler.run((err, stats) => {
        if (err || stats.hasErrors()) {
            webpackError = err || new Error(stats.toString({ errors: true }));
        }
        isDone = true;
    });

    deasync.loopWhile(() => !isDone);

    if (webpackError) {
        throw new Error(`Webpack failed: ${webpackError.message}`);
    }

    //console.log(`Webpack completed successfully: ${outputPath}`);

    if (!fs.existsSync(outputPath)) {
        throw new Error(`Error: Webpack output file not found: ${outputPath}`);
    }
    
    // ADD conditionnal driver export  ==> main.js
    //--------------------------------------------
    // Add driver exports that is executed "conditionnaly" if current JS environment allows it
    let conditional_exports = `if (typeof exports !== "undefined" && typeof module !== "undefined" && module.exports) { exports.driver = driver; }`;
    //let conditional_exports   = `if (typeof module !== "undefined" && module.exports) { module.exports = { driver: { watteco_decodeUplink: watteco_decodeUplink  } }; }`;
    try {
        fs.appendFileSync(outputPath, conditional_exports, "utf8");
        // console.log(`Successfully appended conditional exports to ${filePath}`);
    } catch (err) {
        throw new Error(`Error appending conditional exports to ${outputPath}: ${err.message}`);
    }

    // TRANSPILE (babel) to ES5 main.js to main.es5.js
    //------------------------------------------------
    const code = fs.readFileSync(outputPath, "utf8");
    
    process.stdout.write("Transpiling to ES5... ");

    const result = babel.transformSync(code, {
        //presets: [["@babel/preset-env", { targets: "ie 11",useBuiltIns: "usage",corejs: 3}]],
        presets: [["@babel/preset-env", { targets: "ie 11"}]],
        plugins: ["@babel/plugin-transform-object-assign"],
    });

    if (!result || !result.code) {
        throw new Error("Babel transpilation failed.");
    }

    fs.writeFileSync(es5OutputPath, result.code, "utf8");

    // console.log(`Transpiled to ES5: ${es5OutputPath}`);

  
    // TERSER Minify main.es5.js
    //---------------------------
    process.stdout.write("Running Terser minification... ");

    // Read the file safely
    if (!fs.existsSync(es5OutputPath)) {
        throw new Error(`Error: File not found - ${es5OutputPath}`);
    }

    const es5Code = fs.readFileSync(es5OutputPath, "utf8");

    // Ensure file has content
    if (!es5Code.trim()) {
        throw new Error(`Error: File ${es5OutputPath} is empty, cannot minify.`);
    }

    // Minify in a synchronous way
    let minifiedResult;
    isDone = false;

    // TODO: More compact mangling could be done ... (look at result still some plaintext functions that ar not needed in plaintext)
    terser.minify(es5Code, { compress: true, mangle: true }).then(result => {
        minifiedResult = result;
        isDone = true;
    }).catch(error => {
        throw new Error(`Terser minification failed: ${error}`);
    });

    deasync.loopWhile(() => !isDone);

    // Ensure minified output is valid
    if (!minifiedResult || !minifiedResult.code) {
        throw new Error(`Error: Terser returned empty minified code.`);
    }

    // Write back the minified code synchronously
    fs.writeFileSync(es5OutputPath, minifiedResult.code, "utf8");

    console.log("Done.");
    console.log(`==> ${es5OutputPath}\n`);

}

/**
 * Function to get devices and actility devices from '../devices' directory " with optional filtering
 * @param {string} [pattern] - Optional regex pattern to filter devices.
 * @returns {Object} An object containing filtered devices, actility devices & ttn_devices of filtered devices.
 */
const getDevices = (pattern = null) => {
    // Scanned directory for subdirectories. One per device.
    let directory =  path.join(__dirname, "../devices");

    // Get all subdirectories inside the provided directory path
    const subdirectories = fs.readdirSync(directory).filter(file => fs.statSync(path.join(directory, file)).isDirectory());

    // Map subdirectory names to devices and actility_devices arrays
    const devices = subdirectories;
    const actility_devices = devices.map(device => 
        device === "remote_temperature_2" 
            ? "remote-temperature2" 
            : device.replace(/_/g, '-').replace(/'/g, '').toLowerCase()
    );

    const ttn_devices = devices.map(device => 
        device.replace(/_/g, '-').replace(/'/g, '').toLowerCase()
    );

    // If a filter pattern is provided, filter devices and actility_devices and ttn_devices
    const regex = pattern ? new RegExp(pattern) : null;
    const filteredDevices = regex ? devices.filter(device => regex.test(device)) : devices;
    const filteredActilityDevices = regex 
        ? actility_devices.filter((_, index) => regex.test(devices[index])) 
        : actility_devices;
    const filteredTTNDevices = regex 
        ? ttn_devices.filter((_, index) => regex.test(devices[index])) 
        : ttn_devices;

    // If a filter pattern is provided, filter devices and actility_devices
    if (filteredDevices.length === 0) { 
        console.log(`No devices match the provided directory (${directory}) or filter (${pattern}).`);
    };

    // Return the filtered devices, actility devices, and the count
    return {
        devices: filteredDevices,
        actility_devices: filteredActilityDevices,
        ttn_devices: filteredTTNDevices
    };
};

  function updateJSON_name_description(filePath, sensorName = null, descriptionTemplate = null) {
    const description = descriptionTemplate.replace("${sensorName}", sensorName);

    try {
        // Read and parse the JSON file
        const fileContent = fs.readFileSync(filePath, "utf8");
        const jsonData = JSON.parse(fileContent);

        // Update name and description
        jsonData.name = (sensorName == null ? jsonData.name : sensorName);
        jsonData.description = (description == null ? jsonData.description : description);

        // Write the updated JSON back to the file
        if (sensorName != null || description != null) {
            fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf8");
        }

        //console.log(`File updated successfully for sensor: ${sensorName}`);
    } catch (err) {
        console.error(`Error updating the JSON file: ${err.message}`);
    }
  }

 /**
 * Function to generate a Markdown file listing all devices and their clusters with variables.
 *
 * Reads cluster definitions from a shared Clusters.json file in the parent directory,
 * and device-specific data (package.json and ClustersVariables.json) from subdirectories.
 *
 * Devices are sorted alphabetically by their directory names.
 *
 * @param {string} baseDirectory - Path to the directory containing all device subdirectories.
 * @param {string} outputFile - Path to the resulting Markdown file.
 */
function generateDeviceDriverInfoMarkdown(baseDirectory, outputFile) {
    try {
        // Define the path for the shared Clusters.json file
        const clustersFile = path.join(baseDirectory, "..", "Clusters.json");
        const clusters = JSON.parse(fs.readFileSync(clustersFile, 'utf8')).clusters;

        const priorityClusters = ["0x0000", "0x0050", "0x8004"];

        // Get all subdirectories (device directories) sorted alphabetically
        const deviceDirectories = fs.readdirSync(baseDirectory, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory() && dirent.name !== "..")
            .map(dirent => dirent.name)
            .sort();

        let markdown = "## Available WATTECO LoRaWAN TS013 compliant decoders:\n\n";
        markdown += "*(This `markdown` script is automatically generated. Please do not modify it.)*"

        // Iterate over each device directory
        for (const deviceDir of deviceDirectories) {
            const devicePath = path.join(baseDirectory, deviceDir);
            try {

                // Define paths for device-specific files
                const variablesFile = path.join(devicePath, "ClustersVariables.json");
                const packageFile = path.join(devicePath, "package.json");

                // Check if required files exist
                if (!fs.existsSync(variablesFile) || !fs.existsSync(packageFile)) {
                    console.warn(`Skipping device directory '${deviceDir}' due to missing files.`);
                    continue;
                }

                // Load device-specific data
                const variables = JSON.parse(fs.readFileSync(variablesFile, 'utf8'));
                const packageData = JSON.parse(fs.readFileSync(packageFile, 'utf8'));

                const deviceName = deviceDir.toUpperCase();
                const npmName = packageData.name || "Unknown Device";
                const deviceVersion = packageData.version ? `${packageData.version}` : "?.?.?";

                // Filter and prioritize clusters
                const filteredClusters = clusters.filter(cluster =>
                    variables.some(variable => variable.cid === cluster.cid)
                );

                const sortedClusters = filteredClusters.sort((a, b) => {
                    const aPriority = priorityClusters.includes(a.cid) ? 0 : 1;
                    const bPriority = priorityClusters.includes(b.cid) ? 0 : 1;

                    if (aPriority !== bPriority) {
                        return aPriority - bPriority;
                    }

                    return a.name.localeCompare(b.name);
                });

                // Generate Markdown for the device [Click here to visit OpenAI](https://www.openai.com)
                markdown += `<details>\n<summary>${deviceName} [${deviceVersion}]</summary>\n\n`;
                markdown += `  [NPM: ${npmName}](https://www.npmjs.com/package/${npmName})\n`;

                sortedClusters.forEach(cluster => {
                    const clusterVariables = variables.find(v => v.cid === cluster.cid)?.variables || [];
                    const variablesList = clusterVariables.length > 0 ? clusterVariables.join(', ') : "Aucune variable disponible";
                    markdown += `- **${cluster.name} (CID: ${cluster.cid})** : ${variablesList}\n`;
                });

                markdown += "\n</details>\n\n";
            } catch (error) {
                console.error(`Error generating MD for ${devicePath} :`, error);
            }
        }

        // Write the final Markdown to the output file
        fs.writeFileSync(outputFile, markdown, 'utf8');
        console.log(`Markdown file successfully generated: ${outputFile}`);
    } catch (error) {
        console.error("An error occurred while generating the Markdown:", error);
    }
}

/**
 * Generates a units.auto.js file for a specific device by matching variable names 
 * with units from the BACnet mapping CSV file.
 * 
 * Extracts variable names from:
 * 1. Device's main JS file: batch_param lblnames
 * 2. Device's main JS file: endpointCorresponder values
 * 3. Device's ClustersVariables.json: variables arrays
 * 
 * @param {string} devicePath - Path to the device directory
 * @param {string} bacnetMappingPath - Path to the BACnet mapping CSV file
 * @returns {boolean} - True if file was generated successfully, false otherwise
 */
function generateDeviceUnitsAutoFile(devicePath, bacnetMappingPath = null) {
    try {
        const deviceName = path.basename(devicePath);
        console.log(`Generating units.auto.js for ${deviceName}...`);
        
        // Default path for BACnet mapping file if not provided
        if (!bacnetMappingPath) {
            bacnetMappingPath = path.join(path.dirname(devicePath), '..', 'watteco-bacnet-mapping.csv');
        }
        
        // Check if files exist
        const jsFilePath = path.join(devicePath, `${deviceName}.js`);
        const clustersVarsPath = path.join(devicePath, 'ClustersVariables.json');
        
        if (!fs.existsSync(jsFilePath)) {
            console.error(`Error: Sensor JS file not found at ${jsFilePath}`);
            return false;
        }
        
        if (!fs.existsSync(clustersVarsPath)) {
            console.error(`Error: ClustersVariables.json not found at ${clustersVarsPath}`);
            return false;
        }
        
        if (!fs.existsSync(bacnetMappingPath)) {
            console.error(`Error: BACnet mapping file not found at ${bacnetMappingPath}`);
            return false;
        }
        
        // 1. Parse the BACnet mapping CSV to extract variable units
        const bacnetMappingContent = fs.readFileSync(bacnetMappingPath, 'utf8');
        const bacnetRows = bacnetMappingContent.split('\n')
            .filter(line => !line.startsWith('//') && !line.startsWith('##') && line.trim() !== '')
            .map(line => {
                const columns = line.split(';');
                if (columns.length >= 8) {
                    return {
                        id: columns[0].trim(),
                        name: columns[1].trim(),
                        unit: columns[7].trim()
                    };
                }
                return null;
            })
            .filter(item => item !== null && item.unit !== '');
        
        // Create a map of variable names to units
        const unitMap = {};
        bacnetRows.forEach(row => {
            if (row.unit && row.unit !== '') {
                unitMap[row.id] = row.unit;
            }
        });
        
        // 2. Extract variable names from the device's JS file
        const jsFileContent = fs.readFileSync(jsFilePath, 'utf8');
        
        // Extract lblnames from batch_param
        const batchParamRegex = /batch_param\s*=\s*\[[^[]*\[\s*([^\]]*)\]\s*\]/s;
        const batchParamMatch = jsFileContent.match(batchParamRegex);
        let batchParamVariables = [];
        
        if (batchParamMatch && batchParamMatch[1]) {
            const entriesText = batchParamMatch[1];
            const lblnameRegex = /lblname\s*:\s*["']([^"']+)["']/g;
            let match;
            while ((match = lblnameRegex.exec(entriesText)) !== null) {
                batchParamVariables.push(match[1]);
            }
        }
        
        // Extract variables from endpointCorresponder
        const endpointCorresponderRegex = /endpointCorresponder\s*=\s*{([^}]*)}/s;
        const endpointCorresponderMatch = jsFileContent.match(endpointCorresponderRegex);
        let endpointCorresponderVariables = [];
        
        if (endpointCorresponderMatch && endpointCorresponderMatch[1]) {
            const entriesText = endpointCorresponderMatch[1];
            const valuesRegex = /:\s*\[\s*([^\]]+)\s*\]/g;
            let match;
            while ((match = valuesRegex.exec(entriesText)) !== null) {
                const values = match[1].split(',').map(v => 
                    v.trim().replace(/["']/g, '')
                );
                endpointCorresponderVariables = endpointCorresponderVariables.concat(values);
            }
        }
        
        // 3. Extract variables from ClustersVariables.json
        const clustersVarsContent = fs.readFileSync(clustersVarsPath, 'utf8');
        const clustersVars = JSON.parse(clustersVarsContent);
        let clusterVariables = [];
        
        clustersVars.forEach(cluster => {
            if (cluster.variables && Array.isArray(cluster.variables)) {
                clusterVariables = clusterVariables.concat(cluster.variables);
            }
        });
        
        // 4. Combine all variable names and remove duplicates
        const allVariables = [...new Set([
            ...clusterVariables,
            ...batchParamVariables,
            ...endpointCorresponderVariables
        ])];
        
        // 5. Match variables with units and create the units object
        const deviceUnits = {};
        allVariables.forEach(varName => {
            if (unitMap[varName]) {
                deviceUnits[varName] = unitMap[varName];
            }
        });
        
        // 6. Generate the units.auto.js file
        const outputPath = path.join(devicePath, 'units.auto.js');
        
        const fileContent = 
`// DO NOT MODIFY, FILE AUTOMATICALLY GENERATED ON BUILD (utilities/rebuild_mains.js)

// If you want to modify an unit, please do so in watteco-bacnet-mapping.csv
// If you want to add a variable, please do so in ClustersVariables.json

// After modifying/adding anything, please run "node utilities/rebuild_mains.js" to update the units.auto.js file

let units = ${JSON.stringify(deviceUnits, null, 4)}

module.exports = units;`;
        
        fs.writeFileSync(outputPath, fileContent, 'utf8');
        console.log(`Generated units.auto.js for ${deviceName} with ${Object.keys(deviceUnits).length} units`);
        
        return true;
    } catch (error) {
        console.error(`Error generating units.auto.js file: ${error.message}`);
        return false;
    }
}

/**
 * Generates units.auto.js files for all devices or a filtered subset
 * 
 * @param {string} [pattern] - Optional regex pattern to filter devices
 * @param {string} [bacnetMappingPath] - Optional custom path to the BACnet mapping file
 * @returns {Object} - Results with success and failure counts
 */
function generateAllDeviceUnitsAutoFiles(pattern = null, bacnetMappingPath = null) {
    const { devices } = getDevices(pattern);
    const baseDir = path.join(__dirname, '../devices');
    
    let results = {
        total: devices.length,
        success: 0,
        failed: 0
    };
    
    console.log(`Generating units.auto.js files for ${devices.length} devices...`);
    
    devices.forEach(device => {
        const devicePath = path.join(baseDir, device);
        const success = generateDeviceUnitsAutoFile(devicePath, bacnetMappingPath);
        
        if (success) {
            results.success++;
        } else {
            results.failed++;
        }
    });
    
    console.log(`Units auto files generation complete: ${results.success} successful, ${results.failed} failed`);
    return results;
}

// Export the function as a module
module.exports = { 
    buildAndTranspile,
    getDevices,
    updateJSON_name_description,
    generateDeviceDriverInfoMarkdown,
    generateDeviceUnitsAutoFile,
    generateAllDeviceUnitsAutoFiles
};