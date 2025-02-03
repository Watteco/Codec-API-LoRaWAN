module.exports = {
    target: "node",
    mode: "production",
    entry: "./inclin'o.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};