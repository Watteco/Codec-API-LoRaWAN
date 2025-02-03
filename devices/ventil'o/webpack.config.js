module.exports = {
    target: "node",
    mode: "production",
    entry: "./ventil'o.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};