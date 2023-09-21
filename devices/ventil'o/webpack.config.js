const path = require("path");

module.exports = {
    target: "node",
    mode: "production",
    entry: "./ventil'o.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "../../ready_to_use/ventil'o"),
        library: "driver",
    },
};