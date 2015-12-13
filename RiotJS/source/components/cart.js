import Riot from 'riot';
import {MenuService} from '../models/MenuService';
import {CartEmitter} from '../emmiters/CartEmitter';

const template = `
    <div class="cartContainer" ng-controller="cartCtrl">
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
                <div class="amount right"></div>
            </div>
            <div class="clearRow line tax">
                <div class="title left">Tax:</div>
                <div class="amount right"></div>
            </div>
            <div class="clearRow line total">
                <div class="title left">Total:</div>
                <div class="amount right"></div>
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

    CartEmitter.on('add-to-cart', (item) => {
        //console.log('this.addToCart', item);
        this.cartItems.push(item);
        console.log(this.cartItems);
        this.update();
    });

    /**
     * By the way a thing about using functions in riotjs templating:
     * http://stackoverflow.com/a/32320055
     */
    this.renderPrice = MenuService.renderPrice;

    this.removeItem = () => {
        this.update();
    }
};

export const cart = Riot.tag('cart', template, constructor);
