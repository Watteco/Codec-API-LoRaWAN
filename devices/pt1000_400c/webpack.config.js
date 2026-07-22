module.exports = {
    target: "node",
    mode: "production",
    entry: "./pt1000_400c.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};