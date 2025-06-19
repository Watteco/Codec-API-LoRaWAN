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
        markdown += "*(This `markdown` script is automatically generated. Please do not modify it.)*\n\n";

        // Iterate over each device directory
        for (const deviceDir of deviceDirectories) {
            const devicePath = path.join(baseDirectory, deviceDir);
            try {
                // Define paths for device-specific files
                const variablesFile = path.join(devicePath, "ClustersVariables.json");
                const packageFile = path.join(devicePath, "package.json");
                const unitsFile = path.join(devicePath, "units.auto.js");

                // Check if required files exist
                if (!fs.existsSync(variablesFile) || !fs.existsSync(packageFile)) {
                    console.warn(`Skipping device directory '${deviceDir}' due to missing files.`);
                    continue;
                }

                // Load device-specific data
                const variables = JSON.parse(fs.readFileSync(variablesFile, 'utf8'));
                const packageData = JSON.parse(fs.readFileSync(packageFile, 'utf8'));

                // Load units if available
                let units = {};
                if (fs.existsSync(unitsFile)) {
                    try {
                        delete require.cache[require.resolve(unitsFile)];
                        units = require(unitsFile);
                    } catch (error) {
                        console.warn(`Warning: Could not load units file for ${deviceDir}: ${error.message}`);
                    }
                }

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

                // Generate Markdown for the device
                markdown += `<details>\n<summary>${deviceName} [${deviceVersion}]</summary>\n\n`;
                markdown += `  [NPM: ${npmName}](https://www.npmjs.com/package/${npmName})\n`;

                sortedClusters.forEach(cluster => {
                    const clusterVariables = variables.find(v => v.cid === cluster.cid)?.variables || [];
                    
                    if (clusterVariables.length > 0) {
                        // Format each variable with its unit if available
                        const formattedVariables = clusterVariables.map(varName => {
                            const unit = units[varName];
                            return unit ? `${varName} (${unit})` : varName;
                        });
                        
                        markdown += `- **${cluster.name} (CID: ${cluster.cid})** : ${formattedVariables.join(', ')}\n`;
                    } else {
                        markdown += `- **${cluster.name} (CID: ${cluster.cid})** : Aucune variable disponible\n`;
                    }
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

/**
 * Generates a multitechBacnet-definition.json file for a specific device based on
 * the device's ClustersVariables.json and units.auto.js
 * 
 * @param {string} devicePath - Path to the device directory
 * @param {string} bacnetMappingPath - Path to the BACnet mapping CSV file
 * @returns {boolean} - True if file was generated successfully, false otherwise
 */
function generateMultitechBacnetDefinition(devicePath, bacnetMappingPath = null) {
    try {
        const deviceName = path.basename(devicePath);
        console.log(`Generating multitechBacnet definition for ${deviceName}...`);
        
        // Default path for BACnet mapping file if not provided
        if (!bacnetMappingPath) {
            bacnetMappingPath = path.join(path.dirname(devicePath), '..', 'watteco-bacnet-mapping.csv');
        }
        
        // Check if required files exist
        const jsFilePath = path.join(devicePath, `${deviceName}.js`);
        const clustersVarsPath = path.join(devicePath, 'ClustersVariables.json');
        
        if (!fs.existsSync(jsFilePath)) {
            console.error(`Error: Main JS file not found at ${jsFilePath}`);
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
        
        // 1. Parse the BACnet mapping CSV to extract variable types and units - MOVED EARLIER
        const bacnetMappingContent = fs.readFileSync(bacnetMappingPath, 'utf8');
        const bacnetMap = {};
        
        // Process BACnet mapping CSV
        bacnetMappingContent.split('\n')
            .filter(line => !line.startsWith('//') && !line.startsWith('##') && line.trim() !== '')
            .forEach(line => {
                const columns = line.split(';');
                if (columns.length >= 8) {
                    const id = columns[0].trim();
                    const unit = columns[7].trim();
                    const type = columns[5].trim(); // BACnet value_type
                    
                    if (id && (unit || type)) {
                        bacnetMap[id] = {
                            unit: unit || "",
                            type: type || ""
                        };
                    }
                }
            });
        
        // Helper function to map BACnet types to Multitech types
        function mapBacnetTypeToMultitech(bacnetType) {
            if (!bacnetType) return "float";
            
            switch (bacnetType) {
                case "BOOL": return "bool";
                case "UINT8": return "uint8";
                case "UINT16": return "uint16";
                case "UINT32":
                case "UINT24": return "uint32";
                case "INT16": return "int16";
                case "INT32":
                case "INT": return "int32";
                case "FLOAT": return "float";
                case "STRING": return "string";
                default: return "float";
            }
        }

        // Helper function to map downlink data types to Multitech types
        function mapDownlinkTypeToMultitech(dataType) {
            if (!dataType) return "float";
            
            switch (dataType) {
                case "U8": return "uint8";
                case "U16": return "uint16";
                case "U32": return "uint32";
                case "S8": return "int8";
                case "S16": return "int16";
                case "S32": return "int32";
                case "BOOL": return "bool";
                case "STR": return "string";
                default: return "float";
            }
        }
        
        // Load metadata to get description
        let description = "";
        const metadataPath = path.join(devicePath, 'metadata.json');
        if (fs.existsSync(metadataPath)) {
            try {
                const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
                if (metadata.name) {
                    description = `Watteco ${metadata.name}`;
                    if (metadata.version) {
                        description += ` v${metadata.version}`;
                    }
                }
            } catch (err) {
                console.warn(`Warning: Could not parse metadata.json for ${deviceName}`);
            }
        }
        
        if (!description) {
            description = `Watteco ${deviceName}`;
        }
        
        // Initialize definition object
        const definition = {
            "description": description,
            "properties": {}
        };
        
        // Add standard downlink properties
        const standardDownlinks = [
            "sendHexFrame", "sendConfirmedMode", "sendReboot", 
            "sendFactoryReset", "sendLoraRetries", "sendLoraRejoin"
        ];

        for (const prop of standardDownlinks) {
            if (bacnetMap[prop]) {
                // Use BACnet mapping for type and unit
                definition.properties[prop] = {
                    type: mapBacnetTypeToMultitech(bacnetMap[prop].type),
                    downlink: true
                };
                
                if (bacnetMap[prop].unit) {
                    definition.properties[prop].units = bacnetMap[prop].unit;
                }
            } else {
                // Use default values if not in BACnet mapping
                if (prop === "sendHexFrame") {
                    definition.properties[prop] = {"type": "string", "downlink": true};
                } else if (prop === "sendConfirmedMode" || prop === "sendLoraRetries") {
                    definition.properties[prop] = {"type": "uint8", "downlink": true};
                } else if (prop === "sendLoraRejoin") {
                    definition.properties[prop] = {"type": "uint16", "downlink": true, "units": "minutes"};
                } else if (prop === "sendReboot" || prop === "sendFactoryReset") {
                    definition.properties[prop] = {"type": "bool", "downlink": true};
                }
            }
        }
        
        // Load units if available
        let units = {};
        const unitsPath = path.join(devicePath, 'units.auto.js');
        if (fs.existsSync(unitsPath)) {
            try {
                delete require.cache[require.resolve(unitsPath)];
                units = require(unitsPath);
            } catch (err) {
                console.warn(`Warning: Error loading units.auto.js: ${err.message}`);
            }
        }
        
        // Extract all variables from ClustersVariables.json
        const allVariables = new Set();
        
        // Load ClustersVariables.json
        const clustersVarsContent = fs.readFileSync(clustersVarsPath, 'utf8');
        const clustersVars = JSON.parse(clustersVarsContent);
        
        // Check if the file follows format 1 (array of cluster objects)
        if (Array.isArray(clustersVars)) {
            for (const cluster of clustersVars) {
                if (cluster.variables && Array.isArray(cluster.variables)) {
                    for (const variable of cluster.variables) {
                        allVariables.add(variable);
                    }
                }
            }
        } 
        // Check if the file follows format 2 (object with clusters array)
        else if (clustersVars.clusters && Array.isArray(clustersVars.clusters)) {
            for (const cluster of clustersVars.clusters) {
                if (cluster.variables && Array.isArray(cluster.variables)) {
                    for (const variable of cluster.variables) {
                        allVariables.add(variable);
                    }
                }
            }
        }
        
        // Add variables from units directly as fallback
        for (const variable in units) {
            allVariables.add(variable);
        }
        
        // Add all variables to definition
        for (const variable of allVariables) {
            // Skip if it's already added (avoid duplicates with downlink commands)
            if (definition.properties[variable]) continue;
            
            // Determine variable type from BACnet mapping
            let varType = "float"; // Default type
            
            if (bacnetMap[variable]) {
                // Map BACnet types to Multitech types
                const bacnetType = bacnetMap[variable].type;
                varType = mapBacnetTypeToMultitech(bacnetType);
            } else {
                // Fallback type determination based on naming conventions
                if (variable.endsWith("_bool") || variable === "state") {
                    varType = "bool";
                } else if (variable.endsWith("_u8") || variable.includes("index")) {
                    varType = "uint8";
                } else if (variable.endsWith("_u16")) {
                    varType = "uint16";
                } else if (variable.endsWith("_u32")) {
                    varType = "uint32";
                } else if (variable.endsWith("_counter")) {
                    varType = "uint32";
                }
            }
            
            // Create property entry
            definition.properties[variable] = {"type": varType};
            
            // Add unit if available (from units.auto.js or BACnet mapping)
            if (units[variable]) {
                definition.properties[variable].units = units[variable];
            } else if (bacnetMap[variable] && bacnetMap[variable].unit) {
                definition.properties[variable].units = bacnetMap[variable].unit;
            }
        }
        
        // 2. Extract custom downlink frames from the device's JS file
        const jsFileContent = fs.readFileSync(jsFilePath, 'utf8');

        // Find the dlFrames object
        const dlFramesRegex = /const\s+dlFrames\s*=\s*{([^}]*)}/s;
        const dlFramesMatch = jsFileContent.match(dlFramesRegex);

        const customDownlinks = {};
        if (dlFramesMatch && dlFramesMatch[1]) {
            const dlFramesContent = dlFramesMatch[1];
            
            // Parse each downlink entry
            const dlEntryRegex = /(\w+)\s*:\s*"[^"]*<(\w+):(\w+)>"/g;
            let match;
            
            while ((match = dlEntryRegex.exec(dlFramesContent)) !== null) {
                const cmdName = match[1];
                const dataType = match[2]; // U8, U16, S32, etc.
                
                // First check if command exists in BACnet mapping
                if (bacnetMap[cmdName]) {
                    // Use BACnet mapping for type and unit
                    customDownlinks[cmdName] = {
                        type: mapBacnetTypeToMultitech(bacnetMap[cmdName].type),
                        downlink: true
                    };
                    
                    if (bacnetMap[cmdName].unit) {
                        customDownlinks[cmdName].unit = bacnetMap[cmdName].unit;
                    }
                } else {
                    // Map data type to property type if not in BACnet mapping
                    let propType = mapDownlinkTypeToMultitech(dataType);
                    
                    customDownlinks[cmdName] = {
                        type: propType,
                        downlink: true
                    };
                }
            }
        }

        // Add custom downlinks to properties
        for (const [cmdName, config] of Object.entries(customDownlinks)) {
            definition.properties[cmdName] = config;
            
            // Make sure any unit property is renamed to units
            if (config.unit) {
                definition.properties[cmdName].units = config.unit;
                delete definition.properties[cmdName].unit;
            }
        }
        
        // Add decoder information
        const safeDeviceName = deviceName.replace(/'/g, "");
        definition.decoder = `${safeDeviceName}-decoder.js`;
        
        // Write the file
        const outputPath = path.join(devicePath, `${safeDeviceName}-multitechBacnet-definition.json`);
        fs.writeFileSync(outputPath, JSON.stringify(definition, null, 2), 'utf8');
        
        console.log(`MultitechBacnet definition generated at: ${outputPath}`);
        return true;
    } catch (error) {
        console.error(`Error generating MultitechBacnet definition:`, error);
        return false;
    }
}

/**
 * Generates MultitechBacnet definition files for all devices or a filtered subset
 * 
 * @param {string} [pattern] - Optional regex pattern to filter devices
 * @returns {Object} - Results with success and failure counts
 */
function generateAllMultitechBacnetDefinitions(pattern = null) {
    const { devices } = getDevices(pattern);
    
    const results = {
        success: 0,
        failure: 0,
        skipped: 0,
        total: devices.length
    };
    
    // Define a list of devices to skip (special cases)
    const skipDevices = ["tics'o"];
    
    for (const device of devices) {
        // Skip special devices that need manual definition files
        if (skipDevices.some(skipDevice => 
            device.toLowerCase() === skipDevice.toLowerCase() || 
            device.replace(/['"]/g, '') === skipDevice.replace(/['"]/g, '')
        )) {
            console.log(`Skipping ${device} - using existing manual definition file`);
            results.skipped++;
            continue;
        }
        
        const devicePath = path.join(__dirname, '..', 'devices', device);
        const success = generateMultitechBacnetDefinition(devicePath);
        
        if (success) {
            results.success++;
        } else {
            results.failure++;
        }
    }
    
    console.log(`MultitechBacnet definition generation complete:`);
    console.log(`Total: ${results.total}, Success: ${results.success}, Failure: ${results.failure}, Skipped: ${results.skipped}`);
    
    return results;
}

/**
 * Generates a milesight-object-mapping.json file for a specific device based on
 * the device's ClustersVariables.json, units.auto.js, and BACnet unit mappings
 * 
 * @param {string} devicePath - Path to the device directory
 * @param {string} bacnetMappingPath - Path to the BACnet mapping CSV file
 * @param {string} bacnetUnitMappingPath - Path to the BACnet unit mapping JSON file
 * @returns {boolean} - True if file was generated successfully, false otherwise
 */
function generateMilesightBacnetMapping(devicePath, bacnetMappingPath = null, bacnetUnitMappingPath = null) {
    try {
        const deviceName = path.basename(devicePath);
        console.log(`Generating milesight-object-mapping.json for ${deviceName}...`);
        
        // Default paths if not provided
        if (!bacnetMappingPath) {
            bacnetMappingPath = path.join(path.dirname(devicePath), '..', 'watteco-bacnet-mapping.csv');
        }
        
        if (!bacnetUnitMappingPath) {
            bacnetUnitMappingPath = path.join(path.dirname(devicePath), '..', 'bacnet-unit-mappings.json');
        }
        
        // Check if files exist
        const jsFilePath = path.join(devicePath, `${deviceName}.js`);
        const clustersVarsPath = path.join(devicePath, 'ClustersVariables.json');
        const unitsPath = path.join(devicePath, 'units.auto.js');
        
        if (!fs.existsSync(jsFilePath) || !fs.existsSync(clustersVarsPath)) {
            console.error(`Error: Required files not found for ${deviceName}`);
            return false;
        }
        
        if (!fs.existsSync(bacnetMappingPath)) {
            console.error(`Error: BACnet mapping file not found at ${bacnetMappingPath}`);
            return false;
        }
        
        if (!fs.existsSync(bacnetUnitMappingPath)) {
            console.error(`Error: BACnet unit mapping file not found at ${bacnetUnitMappingPath}`);
            return false;
        }
        
        // Load necessary files
        const clustersVarsContent = fs.readFileSync(clustersVarsPath, 'utf8');
        const clustersVars = JSON.parse(clustersVarsContent);
        let units = {};
        if (fs.existsSync(unitsPath)) {
            delete require.cache[require.resolve(unitsPath)];
            units = require(unitsPath);
        }
        const bacnetUnitMappings = JSON.parse(fs.readFileSync(bacnetUnitMappingPath, 'utf8'));
        
        // Parse BACnet mapping CSV to get variable descriptions
        const bacnetMappingContent = fs.readFileSync(bacnetMappingPath, 'utf8');
        const bacnetDescriptions = {};
        
        bacnetMappingContent.split('\n')
            .filter(line => !line.startsWith('//') && !line.startsWith('##') && line.trim() !== '')
            .forEach(line => {
                const columns = line.split(';');
                if (columns.length >= 8) {
                    const id = columns[0].trim();
                    const name = columns[1].trim();
                    bacnetDescriptions[id] = name;
                }
            });
        
        // Collect all variables from ClustersVariables.json
        let allVariables = new Set();
        
        // Check if the file follows format 1 (array of objects with variables array)
        if (Array.isArray(clustersVars)) {
            for (const cluster of clustersVars) {
                if (cluster.variables && Array.isArray(cluster.variables)) {
                    for (const variable of cluster.variables) {
                        allVariables.add(variable);
                    }
                }
            }
        } 
        // Check if the file follows format 2 (object with clusters array)
        else if (clustersVars.clusters && Array.isArray(clustersVars.clusters)) {
            for (const cluster of clustersVars.clusters) {
                if (cluster.variables && Array.isArray(cluster.variables)) {
                    for (const variable of cluster.variables) {
                        allVariables.add(variable);
                    }
                }
            }
        }
        
        // Extract downlink commands from the device's JS file
        const jsFileContent = fs.readFileSync(jsFilePath, 'utf8');
        
        // Find the dlFrames object
        const dlFramesRegex = /const\s+dlFrames\s*=\s*{([^}]*)}/s;
        const dlFramesMatch = jsFileContent.match(dlFramesRegex);
        
        const downlinkCommands = new Set();
        if (dlFramesMatch && dlFramesMatch[1]) {
            const dlFramesContent = dlFramesMatch[1];
            
            // Parse each downlink entry
            const dlEntryRegex = /(\w+)\s*:\s*"[^"]*<(\w+):(\w+)>"/g;
            let match;
            
            while ((match = dlEntryRegex.exec(dlFramesContent)) !== null) {
                const cmdName = match[1];
                downlinkCommands.add(cmdName);
            }
        }
        
        // Add standard downlink commands
        const standardDownlinks = [
            "sendHexFrame", "sendConfirmedMode", "sendReboot", 
            "sendFactoryReset", "sendLoraRetries", "sendLoraRejoin"
        ];
        
        for (const cmd of standardDownlinks) {
            downlinkCommands.add(cmd);
        }
        
        // Generate object mappings
        const objectMappings = {
            object: []
        };
        
        // Add regular variables
        allVariables.forEach(varName => {
            if (units[varName]) {
                const unitSymbol = units[varName];
                const bacnetUnitInfo = bacnetUnitMappings.find(mapping => mapping.symbol === unitSymbol);
                
                if (bacnetUnitInfo) {
                    const objectMapping = {
                        id: `data.${varName}`,
                        name: bacnetDescriptions[varName] || varName,
                        value: "",
                        unit: unitSymbol,
                        access_mode: "R",
                        data_type: determineDataType(varName),
                        value_type: determineValueType(varName),
                        bacnet_type: "analog_value_object",
                        bacnet_unit_type_id: bacnetUnitInfo.id,
                        bacnet_unit_type: bacnetUnitInfo.milesight_type
                    };
                    
                    // For boolean values, use binary_value_object
                    if (objectMapping.data_type === "BOOLEAN") {
                        objectMapping.bacnet_type = "binary_value_object";
                    }
                    
                    objectMappings.object.push(objectMapping);
                }
            }
        });
        
        // Add downlink commands
        downlinkCommands.forEach(cmdName => {
            // Determine command data type based on name or pattern
            let dataType = "NUMBER";
            let valueType = "FLOAT";
            let bacnetType = "analog_value_object";
            
            if (cmdName === "sendReboot" || cmdName === "sendFactoryReset") {
                dataType = "BOOLEAN";
                valueType = "BOOLEAN";
                bacnetType = "binary_value_object";
            } else if (cmdName === "sendHexFrame") {
                dataType = "STRING";
                valueType = "STRING";
                bacnetType = "characterstring_value_object";
            } else if (cmdName === "sendConfirmedMode" || cmdName === "sendLoraRetries") {
                valueType = "UINT8";
            } else if (cmdName === "sendLoraRejoin") {
                valueType = "UINT16";
            } else if (cmdName.startsWith("send") && cmdName.endsWith("Bool")) {
                dataType = "BOOLEAN";
                valueType = "BOOLEAN";
                bacnetType = "binary_value_object";
            } else if (cmdName.includes("U8") || cmdName.includes("u8")) {
                valueType = "UINT8";
            } else if (cmdName.includes("U16") || cmdName.includes("u16")) {
                valueType = "UINT16";
            } else if (cmdName.includes("U32") || cmdName.includes("u32")) {
                valueType = "UINT32";
            } else if (cmdName.includes("S8") || cmdName.includes("s8")) {
                valueType = "INT8";
            } else if (cmdName.includes("S16") || cmdName.includes("s16")) {
                valueType = "INT16";
            } else if (cmdName.includes("S32") || cmdName.includes("s32")) {
                valueType = "INT32";
            }
            
            // Determine unit from BACnet mapping if available
            let unitSymbol = "";
            let bacnetUnitTypeId = 95; // Default to NO_UNITS
            let bacnetUnitType = "UNITS_NO_UNITS";
            
            if (cmdName === "sendLoraRejoin") {
                unitSymbol = "min";
                const unitMapping = bacnetUnitMappings.find(mapping => mapping.symbol === unitSymbol);
                if (unitMapping) {
                    bacnetUnitTypeId = unitMapping.id;
                    bacnetUnitType = unitMapping.milesight_type;
                }
            } else {
                // For commands without a specific unit, find the NO_UNITS entry
                const noUnitMapping = bacnetUnitMappings.find(mapping => 
                    mapping.symbol === "" && mapping.milesight_type === "UNITS_NO_UNITS");
                
                if (noUnitMapping) {
                    bacnetUnitTypeId = noUnitMapping.id;
                    bacnetUnitType = noUnitMapping.milesight_type;
                }
            }
            
            // Create the command mapping
            const commandMapping = {
                id: `commands.${cmdName}`,
                name: bacnetDescriptions[cmdName] || cmdName,
                value: "",
                unit: unitSymbol,
                access_mode: "W",
                data_type: dataType,
                value_type: valueType,
                bacnet_type: bacnetType,
                bacnet_unit_type_id: bacnetUnitTypeId,
                bacnet_unit_type: bacnetUnitType
            };
            
            objectMappings.object.push(commandMapping);
        });
        
        // Write the file
        const outputPath = path.join(devicePath, `${deviceName.replace(/'/g, '')}-milesight-object-mapping.json`);
        fs.writeFileSync(outputPath, JSON.stringify(objectMappings, null, 4), 'utf8');
        console.log(`Generated milesight-object-mapping.json for ${deviceName} with ${objectMappings.object.length} objects (${allVariables.size} variables, ${downlinkCommands.size} commands)`);
        
        return true;
        
    } catch (error) {
        console.error(`Error generating milesight-object-mapping.json: ${error.message}`);
        return false;
    }
    
    // Helper function to determine data type based on variable name
    function determineDataType(varName) {
        // Boolean values (typical boolean variables in your system)
        if (/^(occupancy|violation_detection|status|on_off|enabled|active)/.test(varName)) {
            return "BOOLEAN";
        }
        return "NUMBER";
    }
    
    // Helper function to determine value type based on variable name
    function determineValueType(varName) {
        if (determineDataType(varName) === "BOOLEAN") {
            return "BOOLEAN";
        }
        
        // Temperature, humidity, voltage and other float values
        if (/^(temperature|humidity|voltage|battery|disposable_battery_voltage|pressure|.*_voltage)/.test(varName)) {
            return "FLOAT";
        }
        
        // Counters and indexes are typically unsigned integers
        if (/^(index|counter|count|pulses)/.test(varName)) {
            return "UINT32";
        }
        
        // Check for metrics that are typically integers
        if (/^(CO2|illuminance|IAQ)/.test(varName)) {
            return "UINT16";
        }
        
        // Energy values (could be positive or negative)
        if (/^(energy|active_energy|reactive_energy)/.test(varName)) {
            return "INT32";
        }
        
        // Power values (could be positive or negative)
        if (/^(power|active_power|reactive_power)/.test(varName)) {
            return "INT32";
        }
        
        // Default to FLOAT for other values
        return "FLOAT";
    }
}

/**
 * Generates Milesight BACnet mapping files for all devices or a filtered subset
 * 
 * @param {string} [pattern] - Optional regex pattern to filter devices
 * @param {string} [bacnetMappingPath] - Optional custom path to the BACnet mapping file
 * @param {string} [bacnetUnitMappingPath] - Optional custom path to the BACnet unit mapping file
 * @returns {Object} - Results with success and failure counts
 */
function generateAllMilesightBacnetMappings(pattern = null, bacnetMappingPath = null, bacnetUnitMappingPath = null) {
    const { devices } = getDevices(pattern);
    
    const results = {
        success: 0,
        failure: 0,
        skipped: 0,
        total: devices.length
    };
    
    // Define a list of devices to skip (special cases)
    const skipDevices = ["tics'o"];
    
    for (const device of devices) {
        const devicePath = path.join(__dirname, '../devices', device);
        
        // Check if this device should be skipped
        const shouldSkip = skipDevices.some(skipDevice => 
            device.toLowerCase() === skipDevice.toLowerCase() || 
            device.replace(/['"]/g, '') === skipDevice.replace(/['"]/g, '')
        );
        
        if (shouldSkip) {
            console.log(`Skipping Milesight BACnet mapping for ${device} - using existing manual mapping file`);
            results.skipped++;
            continue;
        }
        
        const success = generateMilesightBacnetMapping(devicePath, bacnetMappingPath, bacnetUnitMappingPath);
        if (success) {
            results.success++;
        } else {
            results.failure++;
        }
    }
    
    console.log(`Milesight BACnet mapping generation complete:`);
    console.log(`  - Success: ${results.success}`);
    console.log(`  - Failed: ${results.failure}`);
    console.log(`  - Skipped: ${results.skipped}`);
    console.log(`  - Total: ${results.total}`);
    
    return results;
}

// Export the function as a module
module.exports = { 
    buildAndTranspile,
    getDevices,
    updateJSON_name_description,
    generateDeviceDriverInfoMarkdown,
    generateDeviceUnitsAutoFile,
    generateAllDeviceUnitsAutoFiles,
    generateMultitechBacnetDefinition,
    generateAllMultitechBacnetDefinitions,
    generateMilesightBacnetMapping,
    generateAllMilesightBacnetMappings
};