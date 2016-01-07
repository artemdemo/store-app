import {Injectable} from 'angular2/core';

@Injectable()
export class CartService {
    static cart = [];

    constructor() {}

    addToCart(item) {
        CartService.cart.push({
            cartId: +(new Date()),
            id: item.id,
            name: item.name,
            price: item.price,
            tax: item.tax
        });
        return CartService.cart;
    }

    removeFromCart(product) {
        CartService.cart = CartService.cart.filter(item => item.cartId != product.cartId);
        return CartService.cart;
    }

    getSubtotal() {
        let subtotal = 0;
        CartService.cart.forEach(item => subtotal += item.price);
        return subtotal;
    }

    getTax() {
        let tax = 0;
        CartService.cart.forEach(item => tax += item.tax);
        return tax;
    }

    getTotal() {
        return this.getSubtotal() + this.getTax();
    }

    getCart() {
        return CartService.cart;
    }
}
