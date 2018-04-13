process.env.NODE_ENV = 'production'
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HappyPack = require('happypack')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    app: './src/index.js',
    react: ['react', 'react-dom', 'prop-types']
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'build/static'),
    filename: 'js/[name]-[chunkhash].js',
    publicPath: '/static/'
  },
  stats: 'normal',
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'font/font-[hash:16].[ext]'
          }
        }],
        exclude: [
          path.resolve(__dirname, './node_modules')
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'img/img-[hash:16].[ext]'
          }
        }]
      },
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'happypack/loader'
        }],
        include: [
          path.resolve(__dirname, './src')
        ],
        exclude: [
          path.resolve(__dirname, './node_modules')
        ]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            minimize: true,
            modules: true,
            localIdentName: '[hash:base64]'
          }
        }, {
          loader: 'postcss-loader',
          options: {
            config: {
              path: './postcss.config.js'
            }
          }
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            modules: false,
            minimize: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            config: {
              path: './postcss.config.js'
            }
          }
        }, {
          loader: 'less-loader'
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            minimize: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            config: {
              path: './postcss.config.js'
            }
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index.html',
      title: '<%= name %>',
      template: './index.ejs'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HappyPack({
      loaders: [
        {
          loader: 'babel-loader'
        }
      ],
      threads: 4
    }),
    new webpack.BannerPlugin({
      banner: 'created by generator-eigen. https://www.npmjs.com/package/generator-eigen :)'
    })
  ],
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all'
    }
  }
}
