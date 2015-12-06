/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/react/react-dom.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var ShelfStore_1 = require('../stores/ShelfStore');
var StoreAction_1 = require('../actions/StoreAction');
var SingleCartProduct = (function (_super) {
    __extends(SingleCartProduct, _super);
    function SingleCartProduct() {
        var _this = this;
        _super.call(this);
        this.removeItem = function () {
            StoreAction_1.StoreAction.removeItemFromCart(_this.props.product);
        };
    }
    ;
    SingleCartProduct.prototype.render = function () {
        return (React.createElement("li", {"className": "item clearRow"}, React.createElement("div", {"className": "name left"}, this.props.product.name), React.createElement("div", {"className": "price right"}, ShelfStore_1.ShelfStore.renderPrice(this.props.product.price), React.createElement("span", {"className": "remove", "onClick": this.removeItem}, "x"))));
    };
    ;
    return SingleCartProduct;
})(React.Component);
exports.SingleCartProduct = SingleCartProduct;
