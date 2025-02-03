module.exports = {
    target: "node",
    mode: "production",
    entry: "./smartpilot_wire.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};