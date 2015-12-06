/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/flux/flux.d.ts" />
/// <reference path="../d.ts/axios/axios.d.ts" />
/// <reference path="../d.ts/eventemitter3/eventemitter3.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventEmitter = require('eventemitter3');
var axios = require('axios');
var AppDispatcher_1 = require('../dispatcher/AppDispatcher');
var constants_1 = require('../constants');
var ShelfStoreClass = (function (_super) {
    __extends(ShelfStoreClass, _super);
    function ShelfStoreClass() {
        var _this = this;
        _super.call(this);
        this.currency = '$';
        this.menuUrl = '../menu.json';
        this.menuIsLoading = false;
        AppDispatcher_1.Dispatcher.register(function (action) {
            switch (action.type) {
                case constants_1.LOAD_STORE_ITEMS:
                    _this.loadStoreItems();
                    break;
                case constants_1.SET_CATEGORY:
                    _this.currentCategory = action.data;
                    _this.emit('change-category');
                    break;
            }
        });
    }
    ShelfStoreClass.prototype.loadStoreItems = function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (!this.menuIsLoading && (!this.menu || force == true)) {
            this.menuIsLoading = true;
            axios.get(this.menuUrl)
                .then(function (response) {
                _this.menu = response.data;
                _this.menuIsLoading = false;
                _this.emit('change-category');
            }, function () {
                _this.menuIsLoading = false;
            });
        }
    };
    ShelfStoreClass.prototype.renderPrice = function (price) {
        return this.currency + price.toFixed(2);
    };
    ShelfStoreClass.prototype.getMenu = function () {
        return this.menu || [];
    };
    ShelfStoreClass.prototype.getCurrentCategory = function () {
        var category;
        if (!this.currentCategory && this.menu) {
            category = this.menu[0];
        }
        else {
            category = this.currentCategory;
        }
        return category;
    };
    return ShelfStoreClass;
})(EventEmitter);
exports.ShelfStore = new ShelfStoreClass();
