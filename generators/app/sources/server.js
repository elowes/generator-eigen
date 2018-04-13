var path = require('path')
var webpack = require('webpack')
var express = require('express')
var proxy = require('http-proxy-middleware')
var openBrowser = require('react-dev-utils/openBrowser')
var config = require('./webpack.config.dev')

var app = express()
var compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath, noInfo: true
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie')
  next()
})

// proxy setting for dev
const proxyConfig = {
  'target': 'https://api.douban.com',
  'pathRewrite': { '^/proxy': '' },
  'headers': {
    host: 'api.douban.com'
  }
}

// catch the /proxy route for proxy
app.use('/proxy', proxy(proxyConfig))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(8877, function (err) {
  if (err) {
    return console.error(err)
  }

  if (openBrowser('http://localhost:8877')) {
    console.log('The browser tab has been opened!')
  }
})
