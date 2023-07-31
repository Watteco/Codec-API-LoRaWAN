const path = require("path");

module.exports={
    target: "node",
    mode: "production",
    entry: {
        "bundle":[path.resolve(__dirname,'specification_compliant/standard_minimized.js'),
            path.resolve(__dirname,'specification_compliant/batch_minimized.js'),
            path.resolve(__dirname,'specification_compliant/decode_minimized.js'),
            path.resolve(__dirname,"specification_compliant/captor_minimized.js"),
        ]
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "."),
        library:{ name:"driver", type:"umd"}



    },
    optimization: {
            minimize: false,

    },
}