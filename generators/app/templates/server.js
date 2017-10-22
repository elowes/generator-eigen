var path = require('path');
var webpack = require('webpack');
var express = require('express');
var proxy = require('http-proxy-middleware');

var config = require('./webpack.config.dev');
var opn = require('opn');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie");
    next();
});

const proxyConfig = {
    'target': 'https://alpha-labs.aidigger.com',
    // 'target': 'http://192.168.3.66:5000',
    // 'pathRewrite': { '^/dual/api': '' },
    'headers': {
        cookie: 'code=563757; skey="ZoGsc5OX0Tf1obykrm1WflJMIP8=";',
        host: 'alpha-labs.aidigger.com'
    }
}

app.use('/api', proxy(proxyConfig));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8877, function (err) {
    if (err) {
        return console.error(err);
    }

    opn("http://localhost:8877");

    console.log('Listening at http://localhost:8877/');
});


