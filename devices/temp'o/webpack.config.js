module.exports = {
    target: "node",
    mode: "production",
    entry: "./temp'o.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};