module.exports = {
    target: "node",
    mode: "production",
    entry: "./move'o_lite.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};