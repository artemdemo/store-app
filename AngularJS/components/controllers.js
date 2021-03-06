/*global storeApp, console*/
(function(app){
    
    /**
     * Main app controller
     *
     * @class mainCtrl
     */
    var mainCtrl = function( $scope, menuFactory ) {
        
        menuFactory.loadMenu();
    };
    app.controller("mainCtrl", ["$scope", "menuFactory", mainCtrl]);
    

    /**
     * Home page controller
     *
     * @class homeCtrl
     */
    var homeCtrl = function( $scope, $state ) {
        $scope.enterStore = function() {
            $state.go('store');
        };
    };
    app.controller("homeCtrl", ["$scope", "$state", homeCtrl]);
    
    
    /**
     * Store page controller
     *
     * @class storeCtrl
     */
    var storeCtrl = function( $scope, $state, menuFactory, cartFactory ) {
        /**
         * Menu of the store
         *
         * @type {Object}
         */
        $scope.menu = menuFactory.getMenu();
        
        /**
         * Contain current category object - by default the first one
         *
         * @type {Object}
         */
        $scope.currentCategory = $scope.menu[0];
        
        /**
         * Set current category
         *
         * @type {Object}
         */
        $scope.selectCategory = function(cat) { $scope.currentCategory = cat; };
        
        /**
         * Checking if current category in ng-repeat is active
         *
         * @function checkActiveCategory
         * @memberof storeCtrl
         * @param cat {Object} - Category
         * @return {Boolean}
         */
        $scope.checkActiveCategory = function(cat) {
            return cat.id == $scope.currentCategory.id;
        };
        
        /**
         * Adding item to the car
         *
         * @function addItem
         * @memberof storeCtrl
         * @param item {Object} - Item
         * @return {Boolean}
         */
        $scope.addItem = function(item) {
            cartFactory.insertItem(item);
            $scope.$broadcast('update-cart');
        };
    };
    app.controller("storeCtrl", ["$scope", "$state", "menuFactory", "cartFactory", storeCtrl]);
    
    
    /**
     * Cart controller
     *
     * @class cartCtrl
     */
    var cartCtrl = function( $scope, cartFactory ) {
        updateCart();
        
        $scope.$on('update-cart', function(){
            updateCart();
        });
        
        $scope.removeItem = function(item) {
            cartFactory.removeItem( item );
            updateCart();
        };
        
        $scope.checkout = function() {};
        
        function updateCart() {
            $scope.cart = cartFactory.getCart();
            $scope.itemsCount = cartFactory.getItemsCount();
            $scope.subtotal = cartFactory.getSubTotal();
            $scope.tax = cartFactory.getTax();
            $scope.total = cartFactory.getTotal();
        }
    };
    app.controller("cartCtrl", ["$scope", "cartFactory", cartCtrl]);
    
})(storeApp);
