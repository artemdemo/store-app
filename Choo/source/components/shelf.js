import {renderPrice} from '../services/price';

const choo = require('choo');

const changeCategory = (category, send) => {
    send('selectCategory', {
        payload: category.id
    })
};

const addToCart = (item, send) => {
    send('addToCart', {
        payload: item
    })
};

const createCategory = (category, state, send) => {
    let className = 'item';
    if (category.id === state.currentCategoryId) {
        className += ' active';
    }
    return choo.view`
        <li class=${className}
            onclick=${() => changeCategory(category, send)}>
            ${category.category}
        </li>
    `;
};

const createCategoryItems = (state, send) => {
    if (state.currentCategoryId) {
        let currentCategory = null;
        for (var i = 0, len = state.menu.length; i < len; i++) {
            if (state.currentCategoryId == state.menu[i].id) {
                currentCategory = state.menu[i]
            }
        }
        if (currentCategory) {
            return currentCategory.items.map(item => choo.view`
                <li class="item clearRow"
                    onclick=${() => addToCart(item, send)}>
                    <div class="clearRow">
                        <div class="name left">${item.name}</div>
                        <div class="price right">${renderPrice(item.price)}</div>
                    </div>
                    <div class="description muted-text">${item.description}</div>
                </li>
            `);
        }
    }
};

export const shelfView = (state, send) => {
    return choo.view`
    <div class="shelfContainer">
        <div class="categoriesContainer">
            <ul class="list clearRow">
                ${state.menu.map(category => createCategory(category, state, send))}
            </ul>
        </div>
        <div class="itemsContainer">
            <ul class="list">
                ${createCategoryItems(state, send)}
            </ul>
        </div>
    </div>`;
};
