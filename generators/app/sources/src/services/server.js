import fetch from '../utils/request'

let host, api
const mode = process.env.NODE_ENV

if (mode === 'development') {
  host = ''
  api = '/proxy/v2'
}

if (mode === 'production') {
  host = ''
  api = '/v2'
}

export function fetchMovieTop250 () {
  return fetch.get(`${host}${api}/movie/top250`)
}
