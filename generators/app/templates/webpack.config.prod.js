process.env.NODE_ENV = 'production';
var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: "source-map",
    entry: {
        app: "./src/index.js", // Your appʼs entry point
        vendor: ['react', 'react-dom']
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    output: {
        path: path.join(__dirname, "build/static"),
        filename: "js/[name].[chunkhash].js",
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
                include: [
                    path.resolve(__dirname, "./src")
                ],
                exclude: [
                    path.resolve(__dirname, "./node_modules")
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true,
                            modules: true,
                            localIdentName: "[hash:base64]"
                        }
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader"
                    }]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            modules: false,
                            minimize: true,
                        }
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "less-loader"
                    }]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    }, {
                        loader: "postcss-loader"
                    },]
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../index.html',
            title: 'Eigen',
            template: './index.ejs'
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify(new Date().toLocaleString())
        }),
        new webpack.optimize.UglifyJsPlugin(
            {
                sourceMap: false,
                warnings: false
            }
        ),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime',
        }),
        new webpack.BannerPlugin({
            banner: "Created by Eigen :)"
        }),
        new ExtractTextPlugin({
            filename: "css/styles.[chunkhash].css"
        })
    ]
}