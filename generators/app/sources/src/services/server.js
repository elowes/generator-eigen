import request from "../utils/request";

let host, api;

if (!PRODUCTION) { // eslint-disable-line
    host = "";
    api = "/proxy/v2";
}

if (PRODUCTION) { // eslint-disable-line
    host = "";
    api = "/v2";
}

export function fetchMovieTop250() {
    return request(host + api + "/movie/top250", {
        method: "get"
    })
}