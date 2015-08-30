/*global angular*/
var storeApp = angular.module("storeApp", ["ui.router"]);

(function(app){

    var appConfiguration = function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/");
      $stateProvider
        .state('home', {
          url: "/",
          templateUrl: "pages/home.html"
        })
        .state('store', {
          url: "/store",
          templateUrl: "pages/store.html"
        });
    };
    
    app.config( ["$stateProvider", "$urlRouterProvider", appConfiguration] );
    
})(storeApp);
/*global storeApp*/
(function(app){

    app.constant("menuUrl", "../menu.json");

})(storeApp);
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
         * @param cat {Object} - Category
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

/*global storeApp, console, angular*/
(function(app){

    /**
     * Menu factory
     *
     * $class menuFactory
     */
    var menuFactory = function( $http, menuUrl ) {
        var menuFactory = {};
        
        var Menu = null;
        
        /**
         * Load Menu from the server
         * 
         * @function loadMenu
         * @memberof menuFactory
         */
        menuFactory.loadMenu = function() {
            $http.get( menuUrl )
                .then(function( menu ){
                    // I'm using grunt-serve for my server this is the reason why I need to use {object}.data construction 
                    menuFactory.setMenu( menu.data );
                });
        };
        
        /**
         * Set Menu object
         * 
         * @function setMenu
         * @memberof menuFactory
         */
        menuFactory.setMenu = function(newMenu){ Menu = newMenu; };
        
        /**
         * Get Menu object
         * 
         * @function getMenu
         * @memberof menuFactory
         * @return {Object}
         */
        menuFactory.getMenu = function(){ return Menu; };
        
        return menuFactory;
    };
    app.factory("menuFactory", ["$http", "menuUrl", menuFactory]);
    
    
    /**
     * Cart factory
     *
     * $class cartFactory
     */
    var cartFactory = function() {
        var cartFactory = {};
        
        var Cart = {
            items: []
        };
        
        /**
         * Insert new Item into the cart
         * 
         * @function insertItem
         * @param newItem {Object}
         * @memberof cartFactory
         */
        cartFactory.insertItem = function( newItem ){
            var item = angular.copy( newItem );
            item._uniqueID = (new Date()).getTime();
            Cart.items.push( item );
        };
        
        /**
         * Remove Item from the cart
         * 
         * @function removeItem
         * @param item {Object}
         * @memberof cartFactory
         * @return {Boolean}
         */
        cartFactory.removeItem = function( item ) {
            for (var i=0; i<Cart.items.length; i++) {
                if ( item._uniqueID == Cart.items[i]._uniqueID ) {
                    Cart.items.splice(i, 1);
                    return true;
                }
            }
            return false;
        };
        
        /**
         * Return subtotal of the cart
         * 
         * @function getSubTotal
         * @memberof cartFactory
         * @return {Float}
         */
        cartFactory.getSubTotal = function() {
            var subtotal = 0;
            for (var i=0; i<Cart.items.length; i++) {
                subtotal += parseFloat( Cart.items[i].price );
            }
            return subtotal;
        };
        
        /**
         * Return tax of the cart
         * 
         * @function getTax
         * @memberof cartFactory
         * @return {Float}
         */
        cartFactory.getTax = function() {
            var tax = 0;
            for (var i=0; i<Cart.items.length; i++) {
                tax += parseFloat( Cart.items[i].tax );
            }
            return tax;
        };
        
        /**
         * Return total of the cart
         * 
         * @function getTotal
         * @memberof cartFactory
         * @return {Float}
         */
        cartFactory.getTotal = function() {
            var tax = cartFactory.getTax();
            var subtotal = cartFactory.getSubTotal();
            return tax + subtotal;
        };
        
        /**
         * Get Cart object
         * 
         * @function getCart
         * @memberof cartFactory
         * @return {Object}
         */
        cartFactory.getCart = function(){ return Cart; };
        
        /**
         * Return number of items in the cart
         * 
         * @function getItemsCount
         * @memberof cartFactory
         * @return {Number}
         */
        cartFactory.getItemsCount = function() { return Cart.items.length; };
        
        return cartFactory;
    };
    app.factory("cartFactory", [cartFactory]);
    
})(storeApp);