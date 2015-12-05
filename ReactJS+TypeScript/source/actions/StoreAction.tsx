/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/flux/flux.d.ts" />

import {Dispatcher} from '../dispatcher/AppDispatcher';
import {LOAD_STORE_ITEMS, SET_CATEGORY} from '../constants';

export class StoreAction {
    public static loadItems() {
        Dispatcher.dispatch({
            type: LOAD_STORE_ITEMS
        });
    }

    public static setCategory(category) {
        Dispatcher.dispatch({
            type: SET_CATEGORY,
            data: category
        });
    }
}
