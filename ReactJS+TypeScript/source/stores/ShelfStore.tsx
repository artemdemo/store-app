/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/flux/flux.d.ts" />
/// <reference path="../d.ts/axios/axios.d.ts" />
/// <reference path="../d.ts/es6-promise/es6-promise.d.ts" />
/// <reference path="../d.ts/eventemitter3/eventemitter3.d.ts" />

import EventEmitter = require('eventemitter3');
import axios = require('axios');

import {Dispatcher} from '../dispatcher/AppDispatcher';
import {LOAD_STORE_ITEMS} from '../constants';

export interface IModifier {
    id: string;
    name: string;
    price: number;
}

export interface IItem {
    description: string;
    id: string;
    name: string;
    price: number;
    tax: number;
    modifiers: IModifier[];
}

export interface ICategory {
    category: string;
    description: string;
    id: string;
    items: IItem[];
}


class ShelfStoreClass extends EventEmitter {

    private currency: string = '$';
    private menuUrl: string = '../menu.json';

    private menu;
    private currentCategory: ICategory;

    constructor() {
        super();
        Dispatcher.register((action) => {
            switch(action.type){
                case LOAD_STORE_ITEMS:
                    this.loadStoreItems();
                    break;
            }
        });
    }

    private loadStoreItems(): void {
        axios.get(this.menuUrl)
            .then((response) => {
                this.menu = response.data;
                this.currentCategory = response.data[0];
                this.emit('change-category');
                console.log(response.data);
            })
            .catch((response) => {
                console.log(response);
            });
    }

    public getMenu(): ICategory[] {
        return this.menu || [];
    }

    public getCurrentCategory(): ICategory {
        return this.currentCategory;
    }
}

var ShelfStore = new ShelfStoreClass();

export {ShelfStore};
