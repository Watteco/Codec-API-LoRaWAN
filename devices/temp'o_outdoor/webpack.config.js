module.exports = {
    target: "node",
    mode: "production",
    entry: "./temp'o_outdoor.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};