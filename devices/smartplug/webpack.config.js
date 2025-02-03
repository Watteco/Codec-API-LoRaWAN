module.exports = {
    target: "node",
    mode: "production",
    entry: "./smartplug.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};