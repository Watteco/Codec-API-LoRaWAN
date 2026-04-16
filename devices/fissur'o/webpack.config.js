module.exports = {
    target: "node",
    mode: "production",
    entry: "./fissur'o.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};
