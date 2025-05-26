// Permet de visualiser l'encodage d'un payload dans la console (using uncompressed device files)
const argv = process.argv.slice(2);
const file = argv[0] || 'smartpilot_wire';

let deviceConfig;
try {
  deviceConfig = require(`../devices/${file}/${file}.js`);
  console.log(`Loaded device from ../devices/${file}/${file}.js`);
  console.log("Available module exports:", Object.keys(deviceConfig));
} catch (error) {
  console.error(`Failed to load device configuration: ${error.message}`);
}

const testInput = {
  data: {
    sendReboot: true
  }
};

if (argv[1]) {
  try {
    let jsonStr = argv[1];
    if ((jsonStr.startsWith("'") && jsonStr.endsWith("'")) || 
        (jsonStr.startsWith('"') && jsonStr.endsWith('"'))) {
      jsonStr = jsonStr.substring(1, jsonStr.length - 1);
    }
    
    const inputJson = JSON.parse(jsonStr);
    
    if (inputJson.data) {
      Object.assign(testInput, inputJson);
    } else if (typeof inputJson === 'object') {
      testInput.data = inputJson;
    }
  } catch (error) {
    console.error(`Error parsing JSON input: ${error.message}`);
    console.error(`Input string was: "${argv[1]}"`);
    console.error("Try using double quotes around your JSON in PowerShell or escaping quotes properly");
    console.error("For example: node debug_downlink_in.js smartpilot_wire \"{\\\"sendMSOMode\\\":5}\"");
  }
} else {
  console.log("No input JSON provided, using default example");
}

console.log("Input:", JSON.stringify(testInput, null, 2));
console.log("\nEncoding downlink...");

try {
  let output = deviceConfig.encodeDownlink(testInput);
  
  console.log("\nOutput:", JSON.stringify(output, null, 2));
  
  if (output.bytes && output.bytes.length > 0) {
    const hexString = output.bytes.map(byte => byte.toString(16).padStart(2, '0')).join(' ');
    console.log("\nHex string:", hexString, "\n");
  }
} catch (error) {
  console.error(`Encoding failed: ${error.message}`);
  console.error(error.stack);
}
