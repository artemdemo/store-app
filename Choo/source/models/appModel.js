const errorHandle = function(action, state, send) {
    console.group('App error');
    console.error(action.payload);
    console.groupEnd();
};

export const appModel = {
    namespace: 'app',
    state: {},
    effects: {
        error: errorHandle
    },
    reducers: {}
};