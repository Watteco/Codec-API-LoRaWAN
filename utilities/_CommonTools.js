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

// Export the function as a module
module.exports = { 
    buildAndTranspile,
    getDevices,
    updateJSON_name_description,
    generateDeviceDriverInfoMarkdown
};