module.exports = {
    target: "node",
    mode: "production",
    entry: "./pulse_sens'o.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};