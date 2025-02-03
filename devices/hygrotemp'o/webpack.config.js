module.exports = {
    target: "node",
    mode: "production",
    entry: "./hygrotemp'o.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};