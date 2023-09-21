const path = require("path");

module.exports = {
    target: "node",
    mode: "production",
    entry: "./th.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "../../ready_to_use/th"),
        library: "driver",
    },
};