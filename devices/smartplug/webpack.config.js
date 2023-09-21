const path = require("path");

module.exports = {
    target: "node",
    mode: "production",
    entry: "./smartplug.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "../../ready_to_use/smartplug"),
        library: "driver",
    },
};