const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        mergeWithObservable: "./src/mergeWithObservable.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        libraryTarget: "umd",
        library: "[name]"
    },
    externals: {
        mobx: "mobx",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "eslint-loader",
                exclude: /node_modules/,
            },{
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: [[
                        "env",
                        {
                            targets: {
                                browsers: [
                                    "last 2 versions"
                                ]
                            },
                            modules: false
                        }
                    ]]
                }
            }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: "'production'"
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            },
            comments: false
        })
    ],
    devtool: "source-map"
};