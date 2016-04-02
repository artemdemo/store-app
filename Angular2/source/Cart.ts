import {Component, Inject} from 'angular2/core';

import {CartService} from './CartService';
import {StoreService} from './StoreService';

@Component({
    selector: 'cart',
    providers: [CartService],
    template: `
    <div class="cartContainer">
        <h1>Your Cart</h1>
        <div class="cartItemsContainer">
            <div class="muted-text center"
                 [ngClass]="{hide: products.length != 0}">There are no items in the cart</div>
            <ul class="list">
                <li class="item clearRow" *ngFor="#product of products">
                    <div class="name left">{{ product.name }}</div>
                    <div class="price right">
                        {{ renderPrice(product.price) }}
                        <span class="remove" (click)="removeItem(product)">x</span>
                    </div>
                </li>
            </ul>
        </div>

        <div class="cartTotalsContainer">
            <div class="clearRow line subtotal">
                <div class="title left">Subtotal:</div>
                <div class="amount right">{{ renderPrice(getSubtotal()) }}</div>
            </div>
            <div class="clearRow line tax">
                <div class="title left">Tax:</div>
                <div class="amount right">{{ renderPrice(getTax()) }}</div>
            </div>
            <div class="clearRow line total">
                <div class="title left">Total:</div>
                <div class="amount right">{{ renderPrice(getTotal()) }}</div>
            </div>
        </div>

        <div class="checkoutContainer">
            <button class="checkout">
                Checkout
            </button>
        </div>
    </div>
    `
})
export class Cart {
    products = [];

    constructor(@Inject(CartService) private CartService, @Inject(StoreService) private StoreService) {
        this.products = CartService.getCart();
    }

    renderPrice(price) {
        return this.StoreService.renderPrice(price);
    }

    getSubtotal() {
        return this.CartService.getSubtotal();
    }

    getTax() {
        return this.CartService.getTax();
    }

    getTotal() {
        return this.CartService.getTotal();
    }

    removeItem(product) {
        this.products = this.CartService.removeFromCart(product);
    }
}
