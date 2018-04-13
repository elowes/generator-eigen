import request from '../utils/request'

let host, api
const mode = process.env.NODE_ENV

if (mode === 'development') {
  host = ''
  api = '/proxy/v2'
} else {
  host = ''
  api = '/v2'
}

export function fetchMovieTop250 () {
  return request(host + api + '/movie/top250', {
    method: 'get'
  })
}
