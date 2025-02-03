module.exports = {
    target: "node",
    mode: "production",
    entry: "./hygrotemp'o_remote.js",
    output: {
        filename: "main.js",
        path: ".",
        library: "driver",
    },
};