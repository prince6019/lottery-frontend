const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
    plugins: {
        add: [
            new webpack.ProvidePlugin({
                process: "process/browser.js",
            }),
            new NodePolyfillPlugin({
                excludeAliases: ['console'],
            }),
        ],
    },
    node: {
        fs: "empty",
    },
};
