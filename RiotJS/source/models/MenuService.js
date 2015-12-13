import axios from 'axios'

export var MenuService = (() => {

    let MenuService = {};

    /* constants */
    let menuUrl = '../menu.json';

    /**
     * Main menu object
     *
     * @type {Array}
     */
    let Menu = [];

    /**
     * Current category object.
     * By default will be first one.
     *
     * @type {Object}
     */
    let currentCategory = {};

    let loadingMenuPromise = null;

    let currency = '$';

    /**
     * Get menu from the server
     *
     * @function loadMenu
     * @return {Promise}
     */
    MenuService.loadMenu = () => {
        loadingMenuPromise = axios.get(menuUrl)
            .then((result) => {
                Menu = result.data;
                currentCategory = result.data[0];
                return Menu;
            });

        return loadingMenuPromise;
    };

    /**
     * Get menu object
     *
     * @function getMenu
     */
    MenuService.getMenu = () => loadingMenuPromise;

    /**
     * Set category to current
     *
     * @function setCurrentCategory
     */
    MenuService.setCurrentCategory = (newCategory) => currentCategory = newCategory;

    /**
     * Get current category
     *
     * @function getCurrentCategory
     * @return {Object}
     */
    MenuService.getCurrentCategory = () => currentCategory;

    /**
     *
     * @param price
     * @returns {string}
     */
    MenuService.renderPrice = function( price ) {
        return currency + price.toFixed(2);
    };

    return MenuService;
})();
