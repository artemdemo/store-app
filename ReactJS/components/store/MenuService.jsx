
var MenuService = (function() {

    var MenuService = {};

    /* constants */
    var menuUrl = '../menu.json';

    /**
     * Main menu object
     *
     * @type {Array}
     */
    var Menu = [];

    /**
     * Current category object.
     * By default will be first one.
     *
     * @type {Object}
     */
    var currentCategory = {};

    /**
     * Get menu from the server
     *
     * @function loadMenu
     * @return {Promise}
     */
    MenuService.loadMenu = function() {
        var deferred = new $.Deferred();

        $.get(menuUrl, function(data) {
            Menu = data;
            currentCategory = data[0];
            deferred.resolve( data );
        });

        return deferred.promise();
    };

    /**
     * Get menu object
     *
     * @function getMenu
     * @return {Array}
     */
    MenuService.getMenu = function() { return Menu; };

    /**
     * Set category to current
     *
     * @function setCurrentCategory
     */
    MenuService.setCurrentCategory = function(newCategory) { currentCategory = newCategory; };

    /**
     * Get current category
     *
     * @function getCurrentCategory
     * @return {Object}
     */
    MenuService.getCurrentCategory = function() { return currentCategory; };

    return MenuService;

})();