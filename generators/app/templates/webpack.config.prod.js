process.env.NODE_ENV = 'production';
var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
var HappyPack = require("happypack");

module.exports = {
    devtool: "source-map",
    entry: {
        app: "./src/index.js",
        vendor: ['react', 'react-dom']
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    output: {
        path: path.join(__dirname, "build/static"),
        filename: "js/[name]-[chunkhash].js",
        publicPath: "/static/"
    },
    stats: {
        children: false,
        chunks: false,
        modules: false
    },
    module: {
        rules: [
            {
                test: /\.(ttf|eot|woff)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "font/font-[hash:16].[ext]"
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
                        name: "img/img-[hash:16].[ext]"
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                use: [{
                    loader: "happypack/loader"
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
                    }]
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../index.html',
            title: 'generator-eigen',
            template: './index.ejs'
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            },
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify(new Date().toLocaleString())
        }),
        new HappyPack({
            loaders: [
                {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true
                    }
                }
            ],
            threads: 4
        }),
        new ParallelUglifyPlugin({
            cacheDir: ".cache/",
            uglifyJS: {
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                }
            }
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime',
        }),
        new webpack.BannerPlugin({
            banner: "Created by generator-eigen :)"
        }),
        new ExtractTextPlugin({
            filename: "css/styles-[chunkhash].css"
        })
    ]
}