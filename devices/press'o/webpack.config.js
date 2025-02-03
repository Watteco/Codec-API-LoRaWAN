module.exports = {
    target: "node",
    mode: "production",
    entry: "./press'o.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};