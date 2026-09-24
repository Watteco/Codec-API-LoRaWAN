module.exports = {
    target: "node",
    mode: "production",
    entry: "./modbus_leaf'o.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver"
    }
};
