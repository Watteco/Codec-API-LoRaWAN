module.exports = {
    target: "node",
    mode: "production",
    entry: "./vaqa'o_lite.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};