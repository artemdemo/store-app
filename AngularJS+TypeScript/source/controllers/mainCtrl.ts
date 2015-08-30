module storeApp {

    class MainCtrl {

        public static $inject = [
            'menuService'
        ];

        constructor ( menuService ) {
            menuService.loadMenu()
        }

    }

    angular.module('storeApp')
        .controller('mainCtrl', MainCtrl);

}