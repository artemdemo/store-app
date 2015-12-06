/// <reference path="d.ts/react/react.d.ts" />
/// <reference path="d.ts/react/react-dom.d.ts" />
/// <reference path="d.ts/react-router/history.d.ts" />
/// <reference path="d.ts/react-router/react-router.d.ts" />
var React = require('react');
var ReactDOM = require('react-dom');
var react_router_1 = require('react-router');
var history_1 = require('history');
var Home_1 = require('./components/Home');
var Store_1 = require('./components/Store');
var ShelfStore_1 = require('./stores/ShelfStore');
var constants_1 = require('./constants');
ShelfStore_1.ShelfStore.loadStoreItems();
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
 */
ReactDOM.render(React.createElement(react_router_1.Router, {"history": history_1.createHashHistory({ queryKey: false })}, React.createElement(react_router_1.Route, {"path": "store", "component": Store_1.Store}), React.createElement(react_router_1.Route, {"path": "*", "component": Home_1.Home})), document.getElementById(constants_1.MAIN_CONTAINER_ID));
