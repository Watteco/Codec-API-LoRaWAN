module.exports = {
    target: "node",
    mode: "production",
    entry: "./clos'o.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};