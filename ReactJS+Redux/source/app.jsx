import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, useRouterHistory} from 'react-router';
import {Provider} from 'react-redux';
import {createHashHistory} from 'history'
import {createStore, combineReducers} from 'redux'
import menu from './reducers/menu';
import cart from './reducers/cart';

import HomePage from './components/HomePage';
import StorePage from './components/StorePage';

const MAIN_CONTAINER_ID = 'mainContainer';

const storeApp = combineReducers({
    menu,
    cart
});
const store = createStore(storeApp);

ReactDOM.render(
    <Provider store={store}>
        <Router history={useRouterHistory(createHashHistory)({ queryKey: false })}>
            <Route path="/">
                <IndexRoute component={HomePage}/>
            </Route>
            <Route path="/store">
                <IndexRoute component={StorePage}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById(MAIN_CONTAINER_ID)
);