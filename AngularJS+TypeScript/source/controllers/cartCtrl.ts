module storeApp {

    class CartCtrl {

        public static $inject = [
            '$scope',
            'cartService'
        ];

        public cart;
        public itemsCount;
        public subtotal;
        public tax;
        public total;

        constructor ( public $scope, public cartService) {
            this.updateCart();

            $scope.$on('update-cart', () => {
                this.updateCart();
            });
        }

        removeItem (item) {
            this.cartService.removeItem( item );
            this.updateCart();
        }

        private updateCart () {
            this.cart = this.cartService.getCart();
            this.itemsCount = this.cartService.getItemsCount();
            this.subtotal = this.cartService.getSubTotal();
            this.tax = this.cartService.getTax();
            this.total = this.cartService.getTotal();
        }

    }

    angular.module('storeApp')
        .controller('cartCtrl', CartCtrl);

}