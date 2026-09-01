module.exports = {
    target: "node",
    mode: "production",
    entry: "./modbus_no_header.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver"
    }
};