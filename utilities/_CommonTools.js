const fs = require('fs');
const path = require('path');
/**
 * Function to get devices and actility devices from '../devices' directory " with optional filtering
 * @param {string} [pattern] - Optional regex pattern to filter devices.
 * @returns {Object} An object containing filtered devices, actility devices of filtered devices.
 */
const getDevices = (pattern = null) => {
    // Scanned directory for subdirectories. One per device.
    let directory = "../devices";

    // Get all subdirectories inside the provided directory path
    const subdirectories = fs.readdirSync(directory).filter(file => fs.statSync(path.join(directory, file)).isDirectory());

    // Map subdirectory names to devices and actility_devices arrays
    const devices = subdirectories;
    const actility_devices = devices.map(device => 
        device === "remote_temperature_2" 
            ? "remote-temperature2" 
            : device.replace(/_/g, '-').toLowerCase()
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

  function updateJSON_name_description(filePath, sensorName, descriptionTemplate = "Driver for ${sensorName} sensor") {
    const description = descriptionTemplate.replace("${sensorName}", sensorName);

    try {
        // Read and parse the JSON file
        const fileContent = fs.readFileSync(filePath, "utf8");
        const jsonData = JSON.parse(fileContent);

        // Update name and description
        jsonData.name = sensorName;
        jsonData.description = description;

        // Write the updated JSON back to the file
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf8");

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
function generateDeviceDiverInfoMarkdown(baseDirectory, outputFile) {
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
    getDevices,
    updateJSON_name_description,
    generateDeviceDiverInfoMarkdown
};