/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/flux/flux.d.ts" />
var AppDispatcher_1 = require('../dispatcher/AppDispatcher');
var constants = require('../constants');
var StoreAction = (function () {
    function StoreAction() {
    }
    StoreAction.loadItems = function () {
        AppDispatcher_1.Dispatcher.dispatch({
            type: constants.LOAD_STORE_ITEMS
        });
    };
    StoreAction.setCategory = function (category) {
        AppDispatcher_1.Dispatcher.dispatch({
            type: constants.SET_CATEGORY,
            data: category
        });
    };
    StoreAction.addItemToCart = function (item) {
        AppDispatcher_1.Dispatcher.dispatch({
            type: constants.ADD_ITEM_TO_CART,
            data: item
        });
    };
    StoreAction.removeItemFromCart = function (item) {
        AppDispatcher_1.Dispatcher.dispatch({
            type: constants.REMOVE_ITEM_FROM_CART,
            data: item
        });
    };
    return StoreAction;
})();
exports.StoreAction = StoreAction;
