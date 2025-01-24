const path = require("path");

module.exports = {
    target: "node",
    mode: "production",
    entry: "./vaqa'o_lite.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "."),
        library: "driver",
    },
};