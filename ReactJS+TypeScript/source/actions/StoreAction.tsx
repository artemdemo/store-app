/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/flux/flux.d.ts" />

import {Dispatcher} from '../dispatcher/AppDispatcher';
import * as constants from '../constants';

export class StoreAction {
    public static loadItems() {
        Dispatcher.dispatch({
            type: constants.LOAD_STORE_ITEMS
        });
    }

    public static setCategory(category) {
        Dispatcher.dispatch({
            type: constants.SET_CATEGORY,
            data: category
        });
    }

    public static addItemToCart(item) {
        Dispatcher.dispatch({
            type: constants.ADD_ITEM_TO_CART,
            data: item
        });
    }

    public static removeItemFromCart(item) {
        Dispatcher.dispatch({
            type: constants.REMOVE_ITEM_FROM_CART,
            data: item
        });
    }
}
