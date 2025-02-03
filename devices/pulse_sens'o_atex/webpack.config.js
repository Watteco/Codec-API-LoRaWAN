module.exports = {
    target: "node",
    mode: "production",
    entry: "./pulse_sens'o_atex.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};