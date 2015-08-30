
module storeApp {

    class AppConfiguration {

        public static $inject = [
            '$stateProvider',
            '$urlRouterProvider'
        ];

        constructor (private $stateProvider, private $urlRouterProvider) {
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
        }
    }

    angular.module("storeApp", ["ui.router"])
        .config( AppConfiguration );

}


