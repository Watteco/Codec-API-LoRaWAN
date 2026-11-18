module.exports = {
    target: "node",
    mode: "production",
    entry: "./pulse_sens'o_lite_neo.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};
