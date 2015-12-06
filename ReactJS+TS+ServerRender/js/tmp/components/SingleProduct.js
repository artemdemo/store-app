/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/flux/flux.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var ShelfStore_1 = require('../stores/ShelfStore');
var StoreAction_1 = require('../actions/StoreAction');
var SingleProduct = (function (_super) {
    __extends(SingleProduct, _super);
    function SingleProduct() {
        var _this = this;
        _super.apply(this, arguments);
        this.addToCart = function () {
            StoreAction_1.StoreAction.addItemToCart(_this.props.product);
        };
    }
    SingleProduct.prototype.render = function () {
        return (React.createElement("li", {"className": "item clearRow", "onClick": this.addToCart}, React.createElement("div", {"className": "clearRow"}, React.createElement("div", {"className": "name left"}, this.props.product.name), React.createElement("div", {"className": "price right"}, ShelfStore_1.ShelfStore.renderPrice(this.props.product.price))), React.createElement("div", {"className": "description muted-text"}, this.props.product.description)));
    };
    ;
    return SingleProduct;
})(React.Component);
exports.SingleProduct = SingleProduct;
