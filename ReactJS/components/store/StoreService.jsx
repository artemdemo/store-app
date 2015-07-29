
var StoreService = (function() {

    var StoreService = {};

    var currency = '$';

    StoreService.menu = [];
    StoreService.currentCategory = {};

    /**
     * Initialization
     *
     * @function init
     */
    StoreService.init = function() {
        $.when( MenuService.loadMenu() )
            .then(function(data){
                StoreService.menu = data;
                StoreService.currentCategory = data[0];
                React
                    .render(
                    <StoreContainer />,
                    document.getElementById('mainContainer')
                );
            });
    };

    /**
     * Set category
     *
     * @function changeCategory
     */
    StoreService.changeCategory = function(newCategory) {
        MenuService.setCurrentCategory( newCategory );
    };

    StoreService.renderPrice = function( price ) {
        return currency + price.toFixed(2);
    };

    return StoreService;

})();