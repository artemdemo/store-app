/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/react/react-dom.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Shelf_1 = require('./Shelf');
var Cart_1 = require('./Cart');
var Store = (function (_super) {
    __extends(Store, _super);
    function Store(props) {
        _super.call(this, props);
    }
    Store.prototype.render = function () {
        return (React.createElement("div", {"className": "store-page"}, React.createElement("div", {"className": "container clearRow"}, React.createElement(Shelf_1.Shelf, null), React.createElement(Cart_1.Cart, null))));
    };
    return Store;
})(React.Component);
exports.Store = Store;
