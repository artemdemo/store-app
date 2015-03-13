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