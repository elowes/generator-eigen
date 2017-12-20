# Eigen Generator

## set up antd
```shell
npm install --save antd
```
add babelrc plugins config like below:
```javascript
"plugins": [
    [
        "import",
        {
            "libraryName": "antd",
            "style": true
        }
    ]
]
```