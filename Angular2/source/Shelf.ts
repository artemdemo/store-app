import {Component, View, Inject} from 'angular2/core';
import {NgFor} from 'angular2/common';

import {StoreService} from './StoreService';
import {CartService} from './CartService';

@Component({
    selector: 'shelf',
    providers: [StoreService, CartService]
})
@View({
    directives: [NgFor],
    template: `
    <div class="shelfContainer">
        <div class="categoriesContainer">
            <ul class="list clearRow">
                <li class="item"
                    *ngFor="#cat of categories"
                    [ngClass]="{active : cat.id == selectedCategory.id}"
                    (click)="selectCategory(cat)">
                    {{ cat.category }}
                </li>
            </ul>
        </div>
        <div class="itemsContainer">
            <ul class="list">
                <li class="item clearRow"
                    *ngFor="#item of selectedCategory.items"
                    (click)="addToCart(item)">
                    <div class="clearRow">
                        <div class="name left">{{ item.name }}</div>
                        <div class="price right">{{ renderPrice(item.price) }}</div>
                    </div>
                    <div class="description muted-text">{{ item.description }}</div>
                </li>
            </ul>
        </div>
    </div>
    `
})
export class Shelf {
    categories = [];

    selectedCategory = {
        items: []
    };

    constructor(@Inject(StoreService) private StoreService, @Inject(CartService) private CartService) {
        StoreService.getMenu().subscribe(res => {
            this.categories = res.json();
            this.selectedCategory = this.categories[0];
        });
    }

    renderPrice(price) {
        return this.StoreService.renderPrice(price);
    }

    selectCategory(cat) {
        this.selectedCategory = cat;
    }

    addToCart(item) {
        this.CartService.addToCart(item)
    }
}
