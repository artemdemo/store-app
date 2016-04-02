import {Component} from 'angular2/core';

import {Shelf} from './Shelf';
import {Cart} from './Cart';

@Component({
    selector: 'store',
    directives: [Shelf, Cart],
    template: `
    <div class="store-page">
        <div class="container clearRow">
            <shelf></shelf>
            <cart></cart>
        </div>
    </div>
    `
})
export class Store {
}
