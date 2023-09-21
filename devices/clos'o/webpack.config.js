const path = require("path");

module.exports = {
    target: "node",
    mode: "production",
    entry: "./clos'o.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "../../ready_to_use/clos'o"),
        library: "driver",
    },
};