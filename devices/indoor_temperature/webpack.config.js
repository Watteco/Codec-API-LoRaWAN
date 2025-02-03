module.exports = {
    target: "node",
    mode: "production",
    entry: "./indoor_temperature.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};