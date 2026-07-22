module.exports = {
    target: "node",
    mode: "production",
    entry: "./pt1000.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};