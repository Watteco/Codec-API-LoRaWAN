module.exports = {
    target: "node",
    mode: "production",
    entry: "./clim'o.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};