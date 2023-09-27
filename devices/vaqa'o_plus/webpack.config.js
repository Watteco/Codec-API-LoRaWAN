const path = require("path");

module.exports = {
    target: "node",
    mode: "production",
    entry: "./vaqa'o_plus.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "../../distrib/vaqa'o_plus"),
        library: "driver",
    },
};