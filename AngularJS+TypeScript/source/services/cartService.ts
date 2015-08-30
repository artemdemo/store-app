module storeApp {

    class CartService {

        private Cart = {
            items: []
        };

        constructor () {}

        insertItem ( newItem ){
            var item = angular.copy( newItem );
            item._uniqueID = (new Date()).getTime();
            this.Cart.items.push( item );
        }

        removeItem ( item ) {
            for (var i=0; i<this.Cart.items.length; i++) {
                if ( item._uniqueID == this.Cart.items[i]._uniqueID ) {
                    this.Cart.items.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        getSubTotal () {
            var subtotal = 0;
            for (var i=0; i<this.Cart.items.length; i++) {
                subtotal += this.Cart.items[i].price;
            }
            return subtotal;
        }

        getTax () {
            var tax = 0;
            for (var i=0; i<this.Cart.items.length; i++) {
                tax += this.Cart.items[i].tax;
            }
            return tax;
        }

        getTotal () {
            var tax = this.getTax();
            var subtotal = this.getSubTotal();
            return tax + subtotal;
        }

        getCart (){
            return this.Cart;
        }

        getItemsCount () {
            return this.Cart.items.length;
        }

    }

    angular.module('storeApp')
        .service('cartService', CartService);

}