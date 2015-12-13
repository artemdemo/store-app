import EventEmitter from 'eventemitter3';

class CartEmitterClass extends EventEmitter {

    addToCart(item) {
        this.emit('add-to-cart', item);
    }

}

export const CartEmitter = new CartEmitterClass();