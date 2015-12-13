import Riot from 'riot';
import Observable from 'riot-observable';
import {cart} from '../components/cart';

function _CartObservable() {
    Observable(this);

    this.addToCart = (item) => {
        this.trigger('add-to-cart', item);
    }
}

export const CartObservable = new _CartObservable();
