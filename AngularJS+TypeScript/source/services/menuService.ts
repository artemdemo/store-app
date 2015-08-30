module storeApp {
    
    class MenuService {

        public static $inject = [
            '$http',
            'menuUrl'
        ];

        private menu: ICartCategory[] = null;

        constructor ( public $http, public menuUrl ) {

        }

        loadMenu () {
            this.$http.get( this.menuUrl )
                .then(function( menu ){
                    this.setMenu( menu.data );
                }.bind(this));
        }

        setMenu ( newMenu: ICartCategory[] ) {
            this.menu = newMenu;
        }

        getMenu (): ICartCategory[] {
            return this.menu
        }

    }

    angular.module('storeApp')
        .service( 'menuService', MenuService );
    
}