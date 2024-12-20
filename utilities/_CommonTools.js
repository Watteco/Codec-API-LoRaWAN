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

    // If a filter pattern is provided, filter devices and actility_devices
    const regex = pattern ? new RegExp(pattern) : null;
    const filteredDevices = regex ? devices.filter(device => regex.test(device)) : devices;
    const filteredActilityDevices = regex 
        ? actility_devices.filter((_, index) => regex.test(devices[index])) 
        : actility_devices;

    // If a filter pattern is provided, filter devices and actility_devices
    if (filteredDevices.length === 0) { 
        console.log(`No devices match the provided directory (${directory}) or filter (${pattern}).`);

    };

    // Return the filtered devices, actility devices, and the count
    return {
        devices: filteredDevices,
        actility_devices: filteredActilityDevices
    };
};


// Export the function as a module
module.exports = { 
    getDevices 
};