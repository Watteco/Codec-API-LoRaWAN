module.exports = {
    target: "node",
    mode: "production",
    entry: "./triphas'o_kWh.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};
