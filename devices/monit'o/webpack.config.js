module.exports = {
    target: "node",
    mode: "production",
    entry: "./monit'o.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};