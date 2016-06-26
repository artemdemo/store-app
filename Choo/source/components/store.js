import {shelfView} from './shelf';
import {cartView} from './cart';

const choo = require('choo');

export const storeView = (params, state, send) => {
    send('loadMenu');
    
    return choo.view`
    <div class="store-page">
        <div class="container clearRow">
            ${shelfView(state, send)}
            ${cartView(state, send)}
        </div>
    </div>`;
};
