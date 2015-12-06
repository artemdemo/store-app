/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/react/react-dom.d.ts" />
/// <reference path="../d.ts/react-router/react-router.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_router_1 = require('react-router');
var Home = (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        _super.call(this, props);
    }
    Home.prototype.render = function () {
        return (React.createElement("div", {"className": "home-page"}, React.createElement("div", {"className": "container"}, React.createElement("h1", null, "Start shopping now"), React.createElement(react_router_1.Link, {"to": "/store", "className": "button"}, "Enter Store"))));
    };
    return Home;
})(React.Component);
exports.Home = Home;
