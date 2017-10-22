export default {
    namespace: 'homepage',

    state: {
        test: null
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
            return history.listen(({ pathname }) => {
                
            })
        },
    },

    effects: {
        *getDashboardArticles({ payload }, { call, put, select }) {
            yield put({
                type: 'test'
            })
        },

    },

    reducers: {
        test(state, { payload }) {
            return state;
        }
    }
};