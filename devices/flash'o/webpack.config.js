module.exports = {
    target: "node",
    mode: "production",
    entry: "./flash'o.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};