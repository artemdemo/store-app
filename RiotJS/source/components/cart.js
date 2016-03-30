import Riot from 'riot';
import {MenuService} from '../models/MenuService';
import {CartObservable} from '../observables/CartObservable';

const template = `
    <div class="cartContainer">
        <h1>Your Cart</h1>
        <div class="cartItemsContainer">
            <div class="{hide: cartItems.length > 0, 'muted-text center': cartItems.length == 0}" >
                There are no items in the cart
            </div>
            <ul class="list">
                <li each="{cartItems}" class="item clearRow">
                    <div class="name left">{name}</div>
                    <div class="price right">
                        {renderPrice(price)}
                        <span class="remove" onclick={removeItem}>x</span>
                    </div>
                </li>
            </ul>
        </div>

        <div class="cartTotalsContainer">
            <div class="clearRow line subtotal">
                <div class="title left">Subtotal:</div>
                <div class="amount right">{renderPrice(subtotal)}</div>
            </div>
            <div class="clearRow line tax">
                <div class="title left">Tax:</div>
                <div class="amount right">{renderPrice(tax)}</div>
            </div>
            <div class="clearRow line total">
                <div class="title left">Total:</div>
                <div class="amount right">{renderPrice(total)}</div>
            </div>
        </div>

        <div class="checkoutContainer">
            <button class="checkout">
                Checkout
            </button>
        </div>
    </div>`;

const constructor = function() {
    this.cartItems = [];

    let calcuateTotals = () => {
        this.total = 0;
        this.subtotal = 0;
        this.tax = 0;
        this.cartItems.forEach((item) => {
            this.subtotal += item.price;
            this.tax += item.tax;
        });
        this.total = this.subtotal + this.tax;
    };

    calcuateTotals();

    CartObservable.on('add-to-cart', (item) => {
        this.cartItems.push({
            '$$id': +(new Date()),
            id: item.id,
            name: item.name,
            price: item.price,
            tax: item.tax
        });
        calcuateTotals();
        this.update()
    });

    /**
     * By the way a thing about using functions in riotjs templating:
     * http://stackoverflow.com/a/32320055
     */
    this.renderPrice = MenuService.renderPrice;

    this.removeItem = (e) => {
        this.cartItems.forEach((item, i) => {
            if (item.$$id == e.item.$$id) {
                this.cartItems.splice(i,1);
            }
        });
        calcuateTotals();
        this.update();
    }
};

export const cart = Riot.tag('cart', template, constructor);
