// Permet de visualiser l'encodage d'un payload dans la console
const argv = process.argv.slice(2);
const file = argv[0] || 'smartpilot_wire';

let deviceConfig;
try {
  deviceConfig = require(`../devices/${file}/${file}.js`);
  console.log(`Loaded device configuration from ../devices/${file}/${file}.js`);
} catch (error) {
  console.error(`Failed to load device configuration: ${error.message}`);
}

let main;
try {
  main = require("../distrib/" + file + "/main.js");
  console.log("Available module exports:", Object.keys(main));
} catch (error) {
  console.error(`Failed to load module: ${error.message}`);
  process.exit(1);
}

const testInput = {
  data: {
    sendMSOMode: 3
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
    
    console.log("Parsed JSON input:", JSON.stringify(inputJson, null, 2));
    
    if (inputJson.data) {
      Object.assign(testInput, inputJson);
    } else if (typeof inputJson === 'object') {
      testInput.data = inputJson;
    }
  } catch (error) {
    console.error(`Error parsing JSON input: ${error.message}`);
    console.error(`Input string was: "${argv[1]}"`);
    console.error("Try using double quotes around your JSON in PowerShell or escaping quotes properly");
    console.error("For example: node debug_downlink.js smartpilot_wire \"{\\\"sendMSOMode\\\":5}\"");
  }
}

console.log("Input:", JSON.stringify(testInput, null, 2));
console.log("\nEncoding downlink...");

try {
  let output;
  
  if (deviceConfig && typeof deviceConfig.encodeDownlink === 'function') {
    output = deviceConfig.encodeDownlink(testInput);
    console.log("Used device encodeDownlink function");
  } else if (main.encodeDownlink) {
    output = main.encodeDownlink(testInput);
    console.log("Used main encodeDownlink function");
  } else {
    throw new Error("Could not find a valid encodeDownlink function");
  }
  
  console.log("\nOutput:", JSON.stringify(output, null, 2));
  
  if (output.bytes && output.bytes.length > 0) {
    const hexString = output.bytes.map(byte => byte.toString(16).padStart(2, '0')).join('');
    console.log("\nHex string:", hexString);
  }
} catch (error) {
  console.error(`Encoding failed: ${error.message}`);
  console.error(error.stack);
}
