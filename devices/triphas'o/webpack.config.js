module.exports = {
    target: "node",
    mode: "production",
    entry: "./triphas'o.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};