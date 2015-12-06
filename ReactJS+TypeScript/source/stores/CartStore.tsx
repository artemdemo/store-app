/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/flux/flux.d.ts" />
/// <reference path="../d.ts/eventemitter3/eventemitter3.d.ts" />

import EventEmitter = require('eventemitter3');

import {IItem} from './ShelfStore'
import {Dispatcher} from '../dispatcher/AppDispatcher';
import {ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART} from '../constants';

class CartStoreClass extends EventEmitter {

    private items: IItem[] = [];

    constructor() {
        super();
        Dispatcher.register((action) => {
            switch(action.type) {
                case (ADD_ITEM_TO_CART):
                    this.items.push(action.data);
                    this.emit('update-cart');
                    break;
                case (REMOVE_ITEM_FROM_CART):
                    this.removeItem(action.data);
                    this.emit('update-cart');
                    break;
            }
        })
    }

    private removeItem(item) {
        this.items = this.items.filter((product: IItem) => {
            return product.id != item.id;
        });
    };

    public getItems() {
        return this.items;
    }

    public getSubtotal() {
        let subtotal = 0;
        this.items.forEach((product: IItem) => {
            subtotal += product.price;
        });
        return subtotal;
    }

    public getTax() {
        let tax = 0;
        this.items.forEach((product: IItem) => {
            tax += product.tax;
        });
        return tax
    }

    public getTotal() {
        return this.getSubtotal() + this.getTax();
    }
}

export var CartStore = new CartStoreClass();
