module.exports = {
    target: "node",
    mode: "production",
    entry: "./modbus_soil'o.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver"
    }
};
