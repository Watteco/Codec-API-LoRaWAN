const path = require("path");

module.exports = {
    target: "node",
    mode: "production",
    entry: "./toran'o_atex.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "../../distrib/toran'o_atex"),
        library: "driver",
    },
};