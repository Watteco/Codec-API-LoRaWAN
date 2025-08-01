module.exports = {
    target: "node",
    mode: "production",
    entry: "./alt'o.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};