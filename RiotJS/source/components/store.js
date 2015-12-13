import Riot from 'riot';
import {cart} from './cart';
import {shelf} from './shelf';

const template = `
    <div class="store-page">
        <div class="container clearRow">
            <shelf></shelf>
            <cart></cart>
        </div>
    </div>`;

const constructor = function() {
};

export const store = Riot.tag('store', template, constructor);
