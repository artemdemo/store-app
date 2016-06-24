const choo = require('choo');

export const shelfView = (params, state, send) => choo.view`
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
