const path = require("path");

module.exports = {
    target: "node",
    mode: "production",
    entry: "./atm'o.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};