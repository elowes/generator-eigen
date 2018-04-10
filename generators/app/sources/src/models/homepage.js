import { fetchMovieTop250 } from '../services/server'

export default {
  namespace: 'homepage',

  state: {
    movietop250: null
  },

  subscriptions: {
    setup ({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname }) => { // eslint-disable-line
        dispatch({
          type: 'eFetchMovieTop250'
        })
      })
    }
  },

  effects: {
    *eFetchMovieTop250 ({ payload }, { call, put, select, take, all }) { // eslint-disable-line
      try {
        const res = yield call(fetchMovieTop250)
        yield put({
          type: 'rUpdateData',
          payload: res
        })
      } catch (error) {
        console.error(error)
      }
    }

  },

  reducers: {
    rUpdateData (state, { payload }) {
      return Object.assign({}, state, { movietop250: payload })
    }
  }
}
