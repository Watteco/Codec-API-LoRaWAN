module.exports = {
    target: "node",
    mode: "production",
    entry: "./modbus.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};