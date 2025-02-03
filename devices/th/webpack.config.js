module.exports = {
    target: "node",
    mode: "production",
    entry: "./th.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};