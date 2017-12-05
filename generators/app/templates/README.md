# Eigen Generator

## set up antd
```shell
npm install --save antd
```
change babelrc like:
```javascript
"plugins": [
    "transform-runtime",
    "transform-flow-strip-types",
    "transform-decorators-legacy", [
        "import",
        {
            "libraryName": "antd",
            "style": "css"
        }
    ]
],
```

## about flowjs
为了提高项目的可维护性，引入flowjs框架，参考https://blog.iansinnott.com/getting-started-with-flow-and-webpack/,
https://zhenyong.github.io/flowtype/docs/new-project.html#_