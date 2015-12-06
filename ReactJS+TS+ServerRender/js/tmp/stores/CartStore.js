/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/flux/flux.d.ts" />
/// <reference path="../d.ts/eventemitter3/eventemitter3.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventEmitter = require('eventemitter3');
var AppDispatcher_1 = require('../dispatcher/AppDispatcher');
var constants_1 = require('../constants');
var CartStoreClass = (function (_super) {
    __extends(CartStoreClass, _super);
    function CartStoreClass() {
        var _this = this;
        _super.call(this);
        this.items = [];
        AppDispatcher_1.Dispatcher.register(function (action) {
            switch (action.type) {
                case (constants_1.ADD_ITEM_TO_CART):
                    _this.items.push(action.data);
                    _this.emit('update-cart');
                    break;
                case (constants_1.REMOVE_ITEM_FROM_CART):
                    _this.removeItem(action.data);
                    _this.emit('update-cart');
                    break;
            }
        });
    }
    CartStoreClass.prototype.removeItem = function (item) {
        this.items = this.items.filter(function (product) {
            return product.id != item.id;
        });
    };
    ;
    CartStoreClass.prototype.getItems = function () {
        return this.items;
    };
    CartStoreClass.prototype.getSubtotal = function () {
        var subtotal = 0;
        this.items.forEach(function (product) {
            subtotal += product.price;
        });
        return subtotal;
    };
    CartStoreClass.prototype.getTax = function () {
        var tax = 0;
        this.items.forEach(function (product) {
            tax += product.tax;
        });
        return tax;
    };
    CartStoreClass.prototype.getTotal = function () {
        return this.getSubtotal() + this.getTax();
    };
    return CartStoreClass;
})(EventEmitter);
exports.CartStore = new CartStoreClass();
