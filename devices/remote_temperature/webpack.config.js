const path = require("path");

module.exports = {
    target: "node",
    mode: "production",
    entry: "./remote_temperature.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "../../ready_to_use/remote_temperature"),
        library: "driver",
    },
};