module.exports = {
    target: "node",
    mode: "production",
    entry: "./in'o.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};