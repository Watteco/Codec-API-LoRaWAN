const path = require("path");

module.exports = {
    target: "node",
    mode: "production",
    entry: "./pilot_wire.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "../../ready_to_use/pilot_wire"),
        library: "driver",
    },
};