import Riot from 'riot';
import {MenuService} from '../models/MenuService';
import {CartEmitter} from '../emmiters/CartEmitter';

const template = `
    <div class="shelfContainer">
        <div class="categoriesContainer">
            <ul class="list clearRow">
                <li each="{menu}"
                    onclick="{openCategory}"
                    class="{item: true, active: currentCategory.id == id}">
                    {category}
                </li>
            </ul>
        </div>
        <div class="itemsContainer">
            <ul class="list">
                <li each="{currentCategory.items}"
                    class="item clearRow"
                    onClick={addToCart}>
                    <div class="clearRow">
                        <div class="name left">{name}</div>
                        <div class="price right">{renderPrice(price)}</div>
                    </div>
                    <div class="description muted-text">{description}</div>
                </li>
            </ul>
        </div>
    </div>`;

const constructor = function() {

    MenuService.getMenu().then((data) => {
        this.menu = data;
        this.currentCategory = MenuService.getCurrentCategory();
        this.update();
    });

    /**
     * By the way a thing about using functions in riotjs templating:
     * http://stackoverflow.com/a/32320055
     */
    this.renderPrice = MenuService.renderPrice;

    this.openCategory = (e) => {
        MenuService.setCurrentCategory(e.item);
        this.currentCategory = e.item;
    };

    this.addToCart = (e) => {
        CartEmitter.addToCart(e.item);
    }
};

export const shelf = Riot.tag('shelf', template, constructor);
