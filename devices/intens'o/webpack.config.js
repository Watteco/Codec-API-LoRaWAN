module.exports = {
    target: "node",
    mode: "production",
    entry: "./intens'o.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};