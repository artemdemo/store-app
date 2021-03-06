/// <reference path="d.ts/react/react.d.ts" />
/// <reference path="d.ts/react/react-dom.d.ts" />
/// <reference path="d.ts/react-router/history.d.ts" />
/// <reference path="d.ts/react-router/react-router.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, Route} from 'react-router'
import {createHashHistory, createHistory, createMemoryHistory} from 'history';

import {Home} from './components/Home';
import {Store} from './components/Store';
import {ShelfStore} from './stores/ShelfStore';
import {MAIN_CONTAINER_ID} from './constants';

ShelfStore.loadStoreItems();

/**
 * Thing about the history
 *
 * HTML5 gives us the pushState method and the popstate event, but in older browsers the only thing we have is the URL.
 * So, when using hash history, you'll see an extra item in your query string that looks something like _k=123abc.
 * This is a key that history uses to look up persistent state data in window.sessionStorage between page loads.
 *
 * By adding `{queryKey: false}` you will remove `_k=abc123` parameter from the URL (not recommended)
 *
 * Main source: http://rackt.org/history/stable/HashHistoryCaveats.html
 * Another source: http://stackoverflow.com/a/32833208
 *
 * More about history: https://github.com/rackt/react-router/blob/master/docs/guides/basics/Histories.md
 *
 * By the way `createHistory()` in TS terminology is `createBrowserHistory()`
 */

ReactDOM.render(
	<Router history={createHistory()}>
		<Route path="store" component={Store}/>
		<Route path="*" component={Home}/>
	</Router>,
	document.getElementById(MAIN_CONTAINER_ID));
