var storeApp;
(function (storeApp) {
    var AppConfiguration = (function () {
        function AppConfiguration($stateProvider, $urlRouterProvider) {
            this.$stateProvider = $stateProvider;
            this.$urlRouterProvider = $urlRouterProvider;
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
        AppConfiguration.$inject = [
            '$stateProvider',
            '$urlRouterProvider'
        ];
        return AppConfiguration;
    })();
    angular.module("storeApp", ["ui.router"])
        .config(AppConfiguration);
})(storeApp || (storeApp = {}));

var storeApp;
(function (storeApp) {
    angular.module('storeApp')
        .constant("menuUrl", "../menu.json");
})(storeApp || (storeApp = {}));



var storeApp;
(function (storeApp) {
    var MenuService = (function () {
        function MenuService($http, menuUrl) {
            this.$http = $http;
            this.menuUrl = menuUrl;
            this.menu = null;
        }
        MenuService.prototype.loadMenu = function () {
            this.$http.get(this.menuUrl)
                .then(function (menu) {
                this.setMenu(menu.data);
            }.bind(this));
        };
        MenuService.prototype.setMenu = function (newMenu) {
            this.menu = newMenu;
        };
        MenuService.prototype.getMenu = function () {
            return this.menu;
        };
        MenuService.$inject = [
            '$http',
            'menuUrl'
        ];
        return MenuService;
    })();
    angular.module('storeApp')
        .service('menuService', MenuService);
})(storeApp || (storeApp = {}));

var storeApp;
(function (storeApp) {
    var CartService = (function () {
        function CartService() {
            this.Cart = {
                items: []
            };
        }
        CartService.prototype.insertItem = function (newItem) {
            var item = angular.copy(newItem);
            item._uniqueID = (new Date()).getTime();
            this.Cart.items.push(item);
        };
        CartService.prototype.removeItem = function (item) {
            for (var i = 0; i < this.Cart.items.length; i++) {
                if (item._uniqueID == this.Cart.items[i]._uniqueID) {
                    this.Cart.items.splice(i, 1);
                    return true;
                }
            }
            return false;
        };
        CartService.prototype.getSubTotal = function () {
            var subtotal = 0;
            for (var i = 0; i < this.Cart.items.length; i++) {
                subtotal += this.Cart.items[i].price;
            }
            return subtotal;
        };
        CartService.prototype.getTax = function () {
            var tax = 0;
            for (var i = 0; i < this.Cart.items.length; i++) {
                tax += this.Cart.items[i].tax;
            }
            return tax;
        };
        CartService.prototype.getTotal = function () {
            var tax = this.getTax();
            var subtotal = this.getSubTotal();
            return tax + subtotal;
        };
        CartService.prototype.getCart = function () {
            return this.Cart;
        };
        CartService.prototype.getItemsCount = function () {
            return this.Cart.items.length;
        };
        return CartService;
    })();
    angular.module('storeApp')
        .service('cartService', CartService);
})(storeApp || (storeApp = {}));

var storeApp;
(function (storeApp) {
    var MainCtrl = (function () {
        function MainCtrl(menuService) {
            menuService.loadMenu();
        }
        MainCtrl.$inject = [
            'menuService'
        ];
        return MainCtrl;
    })();
    angular.module('storeApp')
        .controller('mainCtrl', MainCtrl);
})(storeApp || (storeApp = {}));

var storeApp;
(function (storeApp) {
    var HomeCtrl = (function () {
        function HomeCtrl($state) {
            this.$state = $state;
        }
        HomeCtrl.prototype.enterStore = function () {
            this.$state.go('store');
        };
        HomeCtrl.$inject = [
            '$state'
        ];
        return HomeCtrl;
    })();
    angular.module('storeApp')
        .controller('homeCtrl', HomeCtrl);
})(storeApp || (storeApp = {}));

var storeApp;
(function (storeApp) {
    var StoreCtrl = (function () {
        function StoreCtrl($scope, $state, menuService, cartService) {
            this.$scope = $scope;
            this.$state = $state;
            this.menuService = menuService;
            this.cartService = cartService;
            this.menu = menuService.getMenu();
            this.currentCategory = this.menu[0];
        }
        StoreCtrl.prototype.selectCategory = function (cat) {
            this.currentCategory = cat;
        };
        StoreCtrl.prototype.checkActiveCategory = function (cat) {
            return cat.id == this.currentCategory.id;
        };
        StoreCtrl.prototype.addItem = function (item) {
            this.cartService.insertItem(item);
            this.$scope.$broadcast('update-cart');
        };
        StoreCtrl.$inject = [
            '$scope',
            '$state',
            'menuService',
            'cartService'
        ];
        return StoreCtrl;
    })();
    angular.module('storeApp')
        .controller('storeCtrl', StoreCtrl);
})(storeApp || (storeApp = {}));

var storeApp;
(function (storeApp) {
    var CartCtrl = (function () {
        function CartCtrl($scope, cartService) {
            var _this = this;
            this.$scope = $scope;
            this.cartService = cartService;
            this.updateCart();
            $scope.$on('update-cart', function () {
                _this.updateCart();
            });
        }
        CartCtrl.prototype.removeItem = function (item) {
            this.cartService.removeItem(item);
            this.updateCart();
        };
        CartCtrl.prototype.updateCart = function () {
            this.cart = this.cartService.getCart();
            this.itemsCount = this.cartService.getItemsCount();
            this.subtotal = this.cartService.getSubTotal();
            this.tax = this.cartService.getTax();
            this.total = this.cartService.getTotal();
        };
        CartCtrl.$inject = [
            '$scope',
            'cartService'
        ];
        return CartCtrl;
    })();
    angular.module('storeApp')
        .controller('cartCtrl', CartCtrl);
})(storeApp || (storeApp = {}));

/// <reference path="./d.ts/angular.d.ts" />
/// <reference path="./d.ts/angular-ui-router.d.ts" />
/// <reference path="./app.ts" />
/// <reference path="./interfaces.ts" />
/// <reference path="./constants.ts" />
/// <reference path="./services/menuService.ts" />
/// <reference path="./services/cartService.ts" />
/// <reference path="./controllers/mainCtrl.ts" />
/// <reference path="./controllers/homeCtrl.ts" />
/// <reference path="./controllers/storeCtrl.ts" />
/// <reference path="./controllers/cartCtrl.ts" />

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC50cyIsImNvbnN0YW50cy50cyIsImludGVyZmFjZXMudHMiLCJzZXJ2aWNlcy9tZW51U2VydmljZS50cyIsInNlcnZpY2VzL2NhcnRTZXJ2aWNlLnRzIiwiY29udHJvbGxlcnMvbWFpbkN0cmwudHMiLCJjb250cm9sbGVycy9ob21lQ3RybC50cyIsImNvbnRyb2xsZXJzL3N0b3JlQ3RybC50cyIsImNvbnRyb2xsZXJzL2NhcnRDdHJsLnRzIiwiaW5pdC50cyJdLCJuYW1lcyI6WyJzdG9yZUFwcCIsInN0b3JlQXBwLkFwcENvbmZpZ3VyYXRpb24iLCJzdG9yZUFwcC5BcHBDb25maWd1cmF0aW9uLmNvbnN0cnVjdG9yIiwic3RvcmVBcHAuTWVudVNlcnZpY2UiLCJzdG9yZUFwcC5NZW51U2VydmljZS5jb25zdHJ1Y3RvciIsInN0b3JlQXBwLk1lbnVTZXJ2aWNlLmxvYWRNZW51Iiwic3RvcmVBcHAuTWVudVNlcnZpY2Uuc2V0TWVudSIsInN0b3JlQXBwLk1lbnVTZXJ2aWNlLmdldE1lbnUiLCJzdG9yZUFwcC5DYXJ0U2VydmljZSIsInN0b3JlQXBwLkNhcnRTZXJ2aWNlLmNvbnN0cnVjdG9yIiwic3RvcmVBcHAuQ2FydFNlcnZpY2UuaW5zZXJ0SXRlbSIsInN0b3JlQXBwLkNhcnRTZXJ2aWNlLnJlbW92ZUl0ZW0iLCJzdG9yZUFwcC5DYXJ0U2VydmljZS5nZXRTdWJUb3RhbCIsInN0b3JlQXBwLkNhcnRTZXJ2aWNlLmdldFRheCIsInN0b3JlQXBwLkNhcnRTZXJ2aWNlLmdldFRvdGFsIiwic3RvcmVBcHAuQ2FydFNlcnZpY2UuZ2V0Q2FydCIsInN0b3JlQXBwLkNhcnRTZXJ2aWNlLmdldEl0ZW1zQ291bnQiLCJzdG9yZUFwcC5NYWluQ3RybCIsInN0b3JlQXBwLk1haW5DdHJsLmNvbnN0cnVjdG9yIiwic3RvcmVBcHAuSG9tZUN0cmwiLCJzdG9yZUFwcC5Ib21lQ3RybC5jb25zdHJ1Y3RvciIsInN0b3JlQXBwLkhvbWVDdHJsLmVudGVyU3RvcmUiLCJzdG9yZUFwcC5TdG9yZUN0cmwiLCJzdG9yZUFwcC5TdG9yZUN0cmwuY29uc3RydWN0b3IiLCJzdG9yZUFwcC5TdG9yZUN0cmwuc2VsZWN0Q2F0ZWdvcnkiLCJzdG9yZUFwcC5TdG9yZUN0cmwuY2hlY2tBY3RpdmVDYXRlZ29yeSIsInN0b3JlQXBwLlN0b3JlQ3RybC5hZGRJdGVtIiwic3RvcmVBcHAuQ2FydEN0cmwiLCJzdG9yZUFwcC5DYXJ0Q3RybC5jb25zdHJ1Y3RvciIsInN0b3JlQXBwLkNhcnRDdHJsLnJlbW92ZUl0ZW0iLCJzdG9yZUFwcC5DYXJ0Q3RybC51cGRhdGVDYXJ0Il0sIm1hcHBpbmdzIjoiQUFDQSxJQUFPLFFBQVEsQ0EwQmQ7QUExQkQsV0FBTyxRQUFRLEVBQUMsQ0FBQztJQUViQTtRQU9JQywwQkFBcUJBLGNBQWNBLEVBQVVBLGtCQUFrQkE7WUFBMUNDLG1CQUFjQSxHQUFkQSxjQUFjQSxDQUFBQTtZQUFVQSx1QkFBa0JBLEdBQWxCQSxrQkFBa0JBLENBQUFBO1lBQzNEQSxrQkFBa0JBLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2xDQSxjQUFjQTtpQkFDVEEsS0FBS0EsQ0FBQ0EsTUFBTUEsRUFBRUE7Z0JBQ1hBLEdBQUdBLEVBQUVBLEdBQUdBO2dCQUNSQSxXQUFXQSxFQUFFQSxpQkFBaUJBO2FBQ2pDQSxDQUFDQTtpQkFDREEsS0FBS0EsQ0FBQ0EsT0FBT0EsRUFBRUE7Z0JBQ1pBLEdBQUdBLEVBQUVBLFFBQVFBO2dCQUNiQSxXQUFXQSxFQUFFQSxrQkFBa0JBO2FBQ2xDQSxDQUFDQSxDQUFDQTtRQUNYQSxDQUFDQTtRQWhCYUQsd0JBQU9BLEdBQUdBO1lBQ3BCQSxnQkFBZ0JBO1lBQ2hCQSxvQkFBb0JBO1NBQ3ZCQSxDQUFDQTtRQWNOQSx1QkFBQ0E7SUFBREEsQ0FuQkFELEFBbUJDQyxJQUFBRDtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtTQUNwQ0EsTUFBTUEsQ0FBRUEs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Q0E7UUFFT0YsNkJBQVVBLEdBQWxCQTtZQUNJRyxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtZQUN2Q0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0E7WUFDbkRBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBO1lBQy9DQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtZQUNyQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0E7UUFDN0NBLENBQUNBO1FBOUJhSCxnQkFBT0EsR0FBR0E7WUFDcEJBLFFBQVFBO1lBQ1JBLGFBQWFBO1NBQ2hCQSxDQUFDQTtRQTZCTkEsZUFBQ0E7SUFBREEsQ0FsQ0EzQixBQWtDQzJCLElBQUEzQjtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQTtTQUNyQkEsVUFBVUEsQ0FBQ0EsVUFBVUEsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7QUFFMUNBLENBQUNBLEVBekNNLFFBQVEsS0FBUixRQUFRLFFBeUNkOztBQ3pDRCw0Q0FBNEM7QUFDNUMsc0RBQXNEO0FBR3RELGlDQUFpQztBQUNqQyx3Q0FBd0M7QUFDeEMsdUNBQXVDO0FBQ3ZDLGtEQUFrRDtBQUNsRCxrREFBa0Q7QUFDbEQsa0RBQWtEO0FBQ2xELGtEQUFrRDtBQUNsRCxtREFBbUQ7QUFDbkQsa0RBQWtEIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxubW9kdWxlIHN0b3JlQXBwIHtcblxuICAgIGNsYXNzIEFwcENvbmZpZ3VyYXRpb24ge1xuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcbiAgICAgICAgICAgICckc3RhdGVQcm92aWRlcicsXG4gICAgICAgICAgICAnJHVybFJvdXRlclByb3ZpZGVyJ1xuICAgICAgICBdO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yIChwcml2YXRlICRzdGF0ZVByb3ZpZGVyLCBwcml2YXRlICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgICAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi9cIik7XG4gICAgICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9cIixcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwicGFnZXMvaG9tZS5odG1sXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdGF0ZSgnc3RvcmUnLCB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogXCIvc3RvcmVcIixcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwicGFnZXMvc3RvcmUuaHRtbFwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbmd1bGFyLm1vZHVsZShcInN0b3JlQXBwXCIsIFtcInVpLnJvdXRlclwiXSlcbiAgICAgICAgLmNvbmZpZyggQXBwQ29uZmlndXJhdGlvbiApO1xuXG59XG5cblxuIiwibW9kdWxlIHN0b3JlQXBwIHtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdzdG9yZUFwcCcpXG4gICAgICAgIC5jb25zdGFudChcIm1lbnVVcmxcIiwgXCIuLi9tZW51Lmpzb25cIik7XG5cbn0iLCJpbnRlcmZhY2UgSUNhcnRNb2RpZmllciB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcHJpY2U6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIElDYXJ0SXRlbSB7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIF91bmlxdWVJRD86IHN0cmluZztcbiAgICBwcmljZTogbnVtYmVyO1xuICAgIHRheDogbnVtYmVyO1xuICAgIG1vZGlmaWVyczogSUNhcnRNb2RpZmllcltdO1xufVxuXG5pbnRlcmZhY2UgSUNhcnRDYXRlZ29yeSB7XG4gICAgY2F0ZWdvcnk6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGlkOiBzdHJpbmc7XG4gICAgaXRlbXM6IElDYXJ0SXRlbVtdO1xufSIsIm1vZHVsZSBzdG9yZUFwcCB7XG4gICAgXG4gICAgY2xhc3MgTWVudVNlcnZpY2Uge1xuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcbiAgICAgICAgICAgICckaHR0cCcsXG4gICAgICAgICAgICAnbWVudVVybCdcbiAgICAgICAgXTtcblxuICAgICAgICBwcml2YXRlIG1lbnU6IElDYXJ0Q2F0ZWdvcnlbXSA9IG51bGw7XG5cbiAgICAgICAgY29uc3RydWN0b3IgKCBwdWJsaWMgJGh0dHAsIHB1YmxpYyBtZW51VXJsICkge1xuXG4gICAgICAgIH1cblxuICAgICAgICBsb2FkTWVudSAoKSB7XG4gICAgICAgICAgICB0aGlzLiRodHRwLmdldCggdGhpcy5tZW51VXJsIClcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiggbWVudSApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE1lbnUoIG1lbnUuZGF0YSApO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRNZW51ICggbmV3TWVudTogSUNhcnRDYXRlZ29yeVtdICkge1xuICAgICAgICAgICAgdGhpcy5tZW51ID0gbmV3TWVudTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldE1lbnUgKCk6IElDYXJ0Q2F0ZWdvcnlbXSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZW51XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdzdG9yZUFwcCcpXG4gICAgICAgIC5zZXJ2aWNlKCAnbWVudVNlcnZpY2UnLCBNZW51U2VydmljZSApO1xuICAgIFxufSIsIm1vZHVsZSBzdG9yZUFwcCB7XG5cbiAgICBjbGFzcyBDYXJ0U2VydmljZSB7XG5cbiAgICAgICAgcHJpdmF0ZSBDYXJ0ID0ge1xuICAgICAgICAgICAgaXRlbXM6IFtdXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3RydWN0b3IgKCkge31cblxuICAgICAgICBpbnNlcnRJdGVtICggbmV3SXRlbSApe1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBhbmd1bGFyLmNvcHkoIG5ld0l0ZW0gKTtcbiAgICAgICAgICAgIGl0ZW0uX3VuaXF1ZUlEID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHRoaXMuQ2FydC5pdGVtcy5wdXNoKCBpdGVtICk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVJdGVtICggaXRlbSApIHtcbiAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaTx0aGlzLkNhcnQuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIGl0ZW0uX3VuaXF1ZUlEID09IHRoaXMuQ2FydC5pdGVtc1tpXS5fdW5pcXVlSUQgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FydC5pdGVtcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFN1YlRvdGFsICgpIHtcbiAgICAgICAgICAgIHZhciBzdWJ0b3RhbCA9IDA7XG4gICAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8dGhpcy5DYXJ0Lml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc3VidG90YWwgKz0gdGhpcy5DYXJ0Lml0ZW1zW2ldLnByaWNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN1YnRvdGFsO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0VGF4ICgpIHtcbiAgICAgICAgICAgIHZhciB0YXggPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaT0wOyBpPHRoaXMuQ2FydC5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRheCArPSB0aGlzLkNhcnQuaXRlbXNbaV0udGF4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRheDtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFRvdGFsICgpIHtcbiAgICAgICAgICAgIHZhciB0YXggPSB0aGlzLmdldFRheCgpO1xuICAgICAgICAgICAgdmFyIHN1YnRvdGFsID0gdGhpcy5nZXRTdWJUb3RhbCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRheCArIHN1YnRvdGFsO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0Q2FydCAoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkNhcnQ7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRJdGVtc0NvdW50ICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkNhcnQuaXRlbXMubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnc3RvcmVBcHAnKVxuICAgICAgICAuc2VydmljZSgnY2FydFNlcnZpY2UnLCBDYXJ0U2VydmljZSk7XG5cbn0iLCJtb2R1bGUgc3RvcmVBcHAge1xuXG4gICAgY2xhc3MgTWFpbkN0cmwge1xuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcbiAgICAgICAgICAgICdtZW51U2VydmljZSdcbiAgICAgICAgXTtcblxuICAgICAgICBjb25zdHJ1Y3RvciAoIG1lbnVTZXJ2aWNlICkge1xuICAgICAgICAgICAgbWVudVNlcnZpY2UubG9hZE1lbnUoKVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnc3RvcmVBcHAnKVxuICAgICAgICAuY29udHJvbGxlcignbWFpbkN0cmwnLCBNYWluQ3RybCk7XG5cbn0iLCJtb2R1bGUgc3RvcmVBcHAge1xuXG4gICAgY2xhc3MgSG9tZUN0cmwge1xuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcbiAgICAgICAgICAgICckc3RhdGUnXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3RydWN0b3IgKCBwdWJsaWMgJHN0YXRlICkge1xuXG4gICAgICAgIH1cblxuICAgICAgICBlbnRlclN0b3JlICgpIHtcbiAgICAgICAgICAgIHRoaXMuJHN0YXRlLmdvKCdzdG9yZScpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnc3RvcmVBcHAnKVxuICAgICAgICAuY29udHJvbGxlcignaG9tZUN0cmwnLCBIb21lQ3RybClcbn0iLCJtb2R1bGUgc3RvcmVBcHAge1xuXG4gICAgY2xhc3MgU3RvcmVDdHJsIHtcblxuICAgICAgICBwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXG4gICAgICAgICAgICAnJHNjb3BlJyxcbiAgICAgICAgICAgICckc3RhdGUnLFxuICAgICAgICAgICAgJ21lbnVTZXJ2aWNlJyxcbiAgICAgICAgICAgICdjYXJ0U2VydmljZSdcbiAgICAgICAgXTtcblxuICAgICAgICBwdWJsaWMgbWVudTogSUNhcnRDYXRlZ29yeVtdO1xuXG4gICAgICAgIHB1YmxpYyBjdXJyZW50Q2F0ZWdvcnk6IElDYXJ0Q2F0ZWdvcnk7XG5cbiAgICAgICAgY29uc3RydWN0b3IgKCBwdWJsaWMgJHNjb3BlLCBwdWJsaWMgJHN0YXRlLCBwdWJsaWMgbWVudVNlcnZpY2UsIHB1YmxpYyBjYXJ0U2VydmljZSApIHtcbiAgICAgICAgICAgIHRoaXMubWVudSA9IG1lbnVTZXJ2aWNlLmdldE1lbnUoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudENhdGVnb3J5ID0gdGhpcy5tZW51WzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZWN0Q2F0ZWdvcnkgKCBjYXQ6IElDYXJ0Q2F0ZWdvcnkgKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRDYXRlZ29yeSA9IGNhdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoZWNrQWN0aXZlQ2F0ZWdvcnkgKCBjYXQ6IElDYXJ0Q2F0ZWdvcnkgKSB7XG4gICAgICAgICAgICByZXR1cm4gY2F0LmlkID09IHRoaXMuY3VycmVudENhdGVnb3J5LmlkO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkSXRlbSAoIGl0ZW06IElDYXJ0SXRlbSApIHtcbiAgICAgICAgICAgIHRoaXMuY2FydFNlcnZpY2UuaW5zZXJ0SXRlbShpdGVtKTtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRicm9hZGNhc3QoJ3VwZGF0ZS1jYXJ0Jyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdzdG9yZUFwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdzdG9yZUN0cmwnLCBTdG9yZUN0cmwpXG5cbn0iLCJtb2R1bGUgc3RvcmVBcHAge1xuXG4gICAgY2xhc3MgQ2FydEN0cmwge1xuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcbiAgICAgICAgICAgICckc2NvcGUnLFxuICAgICAgICAgICAgJ2NhcnRTZXJ2aWNlJ1xuICAgICAgICBdO1xuXG4gICAgICAgIHB1YmxpYyBjYXJ0O1xuICAgICAgICBwdWJsaWMgaXRlbXNDb3VudDtcbiAgICAgICAgcHVibGljIHN1YnRvdGFsO1xuICAgICAgICBwdWJsaWMgdGF4O1xuICAgICAgICBwdWJsaWMgdG90YWw7XG5cbiAgICAgICAgY29uc3RydWN0b3IgKCBwdWJsaWMgJHNjb3BlLCBwdWJsaWMgY2FydFNlcnZpY2UpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FydCgpO1xuXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCd1cGRhdGUtY2FydCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNhcnQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlSXRlbSAoaXRlbSkge1xuICAgICAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5yZW1vdmVJdGVtKCBpdGVtICk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhcnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgdXBkYXRlQ2FydCAoKSB7XG4gICAgICAgICAgICB0aGlzLmNhcnQgPSB0aGlzLmNhcnRTZXJ2aWNlLmdldENhcnQoKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNDb3VudCA9IHRoaXMuY2FydFNlcnZpY2UuZ2V0SXRlbXNDb3VudCgpO1xuICAgICAgICAgICAgdGhpcy5zdWJ0b3RhbCA9IHRoaXMuY2FydFNlcnZpY2UuZ2V0U3ViVG90YWwoKTtcbiAgICAgICAgICAgIHRoaXMudGF4ID0gdGhpcy5jYXJ0U2VydmljZS5nZXRUYXgoKTtcbiAgICAgICAgICAgIHRoaXMudG90YWwgPSB0aGlzLmNhcnRTZXJ2aWNlLmdldFRvdGFsKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGFuZ3VsYXIubW9kdWxlKCdzdG9yZUFwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdjYXJ0Q3RybCcsIENhcnRDdHJsKTtcblxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2QudHMvYW5ndWxhci5kLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2QudHMvYW5ndWxhci11aS1yb3V0ZXIuZC50c1wiIC8+XG5cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vYXBwLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2ludGVyZmFjZXMudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vY29uc3RhbnRzLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3NlcnZpY2VzL21lbnVTZXJ2aWNlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3NlcnZpY2VzL2NhcnRTZXJ2aWNlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2NvbnRyb2xsZXJzL21haW5DdHJsLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2NvbnRyb2xsZXJzL2hvbWVDdHJsLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2NvbnRyb2xsZXJzL3N0b3JlQ3RybC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9jb250cm9sbGVycy9jYXJ0Q3RybC50c1wiIC8+XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==