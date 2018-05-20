var path = require('path')
var webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'js/bundle.js',
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'font/[hash:16].[ext]'
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
            name: 'img/[hash:16].[ext]'
          }
        }]
      },
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: [
          path.resolve(__dirname, './node_modules')
        ],
        include: [
          path.resolve(__dirname, './src')
        ]
      },
      {
        test: /\.scss$/,
        use: [ {
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[folder]-[local]-[hash:4]'
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
          loader: 'css-loader'
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
          loader: 'css-loader'
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    // START: webpack-hot-middleware
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // :END
    new webpack.BannerPlugin({
      banner: 'created by generator-eigen. https://www.npmjs.com/package/generator-eigen :)'
    })
  ]
}
