/// <reference path="../d.ts/react/react.d.ts" />
/// <reference path="../d.ts/flux/flux.d.ts" />
/// <reference path="../d.ts/axios/axios.d.ts" />
/// <reference path="../d.ts/eventemitter3/eventemitter3.d.ts" />

import EventEmitter = require('eventemitter3');
import axios = require('axios');

import {Dispatcher} from '../dispatcher/AppDispatcher';
import {LOAD_STORE_ITEMS, SET_CATEGORY} from '../constants';

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
    private menuIsLoading: boolean = false;
    private currentCategory: ICategory;

    constructor() {
        super();
        Dispatcher.register((action) => {
            switch(action.type){
                case LOAD_STORE_ITEMS:
                    this.loadStoreItems();
                    break;
                case SET_CATEGORY:
                    this.currentCategory = action.data;
                    this.emit('change-category');
                    break;
            }
        });
    }

    public loadStoreItems(force: boolean = false): void {
        if(!this.menuIsLoading && (!this.menu || force == true)) {
            this.menuIsLoading = true;
            axios.get(this.menuUrl)
                .then((response) => {
                    this.menu = response.data;
                    this.menuIsLoading = false;
                    this.emit('change-category');
                }, () => {
                    this.menuIsLoading = false;
                });
        }
    }

    public renderPrice(price: number): string {
        return this.currency + price.toFixed(2);
    }

    public getMenu(): ICategory[] {
        return this.menu || [];
    }

    public getCurrentCategory(): ICategory {
        let category;
        if (!this.currentCategory && this.menu) {
            category = this.menu[0]
        } else {
            category = this.currentCategory
        }
        return category;
    }
}

export var ShelfStore = new ShelfStoreClass();
