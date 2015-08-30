module storeApp {

    class StoreCtrl {

        public static $inject = [
            '$scope',
            '$state',
            'menuService',
            'cartService'
        ];

        public menu: ICartCategory[];

        public currentCategory: ICartCategory;

        constructor ( public $scope, public $state, public menuService, public cartService ) {
            this.menu = menuService.getMenu();
            this.currentCategory = this.menu[0];
        }

        selectCategory ( cat: ICartCategory ) {
            this.currentCategory = cat;
        }

        checkActiveCategory ( cat: ICartCategory ) {
            return cat.id == this.currentCategory.id;
        }

        addItem ( item: ICartItem ) {
            this.cartService.insertItem(item);
            this.$scope.$broadcast('update-cart');
        }

    }

    angular.module('storeApp')
        .controller('storeCtrl', StoreCtrl)

}