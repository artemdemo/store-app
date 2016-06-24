const choo = require('choo');

export const cartView = (params, state, send) => choo.view`
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
