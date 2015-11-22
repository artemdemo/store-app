/// <reference path="d.ts/react/react.d.ts" />
/// <reference path="d.ts/react/react-dom.d.ts" />
var React = require('react');
var ReactDOM = require('react-dom');
var home_1 = require('./components/home');
var constants_1 = require('./constants');
ReactDOM.render(React.createElement(home_1.Home, null), document.getElementById(constants_1.MAIN_CONTAINER_ID));
