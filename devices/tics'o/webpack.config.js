const path = require("path");

module.exports = {
    target: "node",
    mode: "production",
    entry: "./tics'o.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "../../ready_to_use/tics'o"),
        library: "driver",
    },
};