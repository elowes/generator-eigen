var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: "cheap-module-eval-source-map",
    entry: [
        "webpack-hot-middleware/client",
        "./src/index.js" // Your appʼs entry point
    ],
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "js/bundle.js",
        publicPath: "/static/"
    },
    module: {
        rules: [
            {
                test: /\.(ttf|eot|woff)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "font/[hash:16].[ext]"
                    }
                }],
                exclude: [
                    path.resolve(__dirname, "./node_modules")
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        name: "img/[hash:16].[ext]"
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                use: [{
                    loader: "babel-loader"
                }],
                exclude: [
                    path.resolve(__dirname, "./node_modules")
                ],
                include: [
                    path.resolve(__dirname, "./src")
                ]
            },
            {
                test: /\.scss$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "[name]_[local]_[hash:4]"
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: "./postcss.config.js"
                            }
                        }
                    },
                    {
                        loader: "sass-loader"
                    }]
                }))
            },
            {
                test: /\.less$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: "./postcss.config.js"
                            }
                        }
                    },
                    {
                        loader: "less-loader"
                    }]
                }))
            },
            {
                test: /\.css$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: "./postcss.config.js"
                            }
                        }
                    }]
                }))
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false),
            VERSION: JSON.stringify(new Date().toLocaleString())
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.BannerPlugin({
            banner: "created by generator-eigen. https://www.npmjs.com/package/generator-eigen :)"
        }),
        new ExtractTextPlugin({
            filename: "css/styles.css"
        })
    ]
}