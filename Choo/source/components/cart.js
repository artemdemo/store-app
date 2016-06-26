import {renderPrice} from '../services/price';

const choo = require('choo');

const removeItem = (uniqueId, send) => {
    send('removeFromCart', {
        payload: uniqueId
    })
};

export const cartView = (state, send) => {
    const classItemsInfo = state.cart.length == 0 ? 'muted-text center' : 'hide';
    let subtotal = 0;
    let tax = 0;

    state.cart.forEach(item => {
        subtotal += item.price;
        tax += item.tax;
    });

    let total = subtotal + tax;

    return choo.view`
    <div class="cartContainer">
        <h1>Your Cart</h1>
        <div class="cartItemsContainer">
            <div class=${classItemsInfo} >
                There are no items in the cart
            </div>
            <ul class="list">
                ${state.cart.map((item) => choo.view`
                    <li class="item clearRow">
                        <div class="name left">${item.name}</div>
                        <div class="price right">
                            ${renderPrice(item.price)}
                            <span class="remove" onclick=${() => removeItem(item._uniqueId, send)}>x</span>
                        </div>
                    </li>
                `)}
            </ul>
        </div>

        <div class="cartTotalsContainer">
            <div class="clearRow line subtotal">
                <div class="title left">Subtotal:</div>
                <div class="amount right">${renderPrice(subtotal)}</div>
            </div>
            <div class="clearRow line tax">
                <div class="title left">Tax:</div>
                <div class="amount right">${renderPrice(tax)}</div>
            </div>
            <div class="clearRow line total">
                <div class="title left">Total:</div>
                <div class="amount right">${renderPrice(total)}</div>
            </div>
        </div>

        <div class="checkoutContainer">
            <button class="checkout">
                Checkout
            </button>
        </div>
    </div>`
};
