export default {
    namespace: 'homepage',

    state: {
        test: null
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
            return history.listen(({ pathname }) => { // eslint-disable-line
                
            })
        },
    },

    effects: {
        *getDashboardArticles({ payload }, { call, put, select }) { // eslint-disable-line
            yield put({
                type: 'test'
            })
        },

    },

    reducers: {
        test(state, { payload }) { // eslint-disable-line
            return state;
        }
    }
};