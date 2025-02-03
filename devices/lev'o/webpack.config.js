module.exports = {
    target: "node",
    mode: "production",
    entry: "./lev'o.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};