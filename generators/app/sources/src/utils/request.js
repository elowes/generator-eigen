import fetch from "dva/fetch";

function isJSON(input) {
    try {
        JSON.parse(input);
        return true;
    } catch (error) {
        return false;
    }
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return parseJSON(response, true);
    } else {
        return parseJSON(response, false);
    }
}

function parseJSON(response, success) {
    return response.text().then(function (text) {
        if (isJSON(text)) {
            text = JSON.parse(text);
        }

        if (success) {
            return Promise.resolve(text);
        } else {
            return Promise.reject(text);
        }
    })
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
    // fetch 默认不带 cookie，这里设置 credentials 为 include 来开启带 cookie 选项
    if (PRODUCTION) { // eslint-disable-line
        if (!options) {
            options = { method: "get" }
        }
        options = Object.assign(options, { credentials: "include" });
    }
    return fetch(url, options)
        .then(checkStatus)
        .then(data => {
            return data;
        }).catch(err => {
            return Promise.reject(err);
        })
}