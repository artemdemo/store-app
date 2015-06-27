/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="typings/custom.d.ts" />
/// <reference path="vendor/fetch/fetch.d.ts" />
if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var components_1 = require('./components');
var components_2 = require('./components');
/**
 * Store component
 * Main component of the application
 */
var AppComponent = (function () {
    function AppComponent(router) {
        fetch('../menu.json', {
            method: 'GET'
        })
            .then(function (response) {
            return response.json();
        })
            .then(function (json) {
            console.log(json);
        })
            .catch(function (error) {
            console.log(error.message);
        });
        console.log(router);
    }
    AppComponent = __decorate([
        angular2_1.Component({
            selector: 'app'
        }),
        angular2_1.View({
            template: "\n    <div id=\"mainContainer\">\n        <router-outlet></router-outlet>\n    </div>\n    ",
            directives: [
                router_1.RouterOutlet,
                router_1.RouterLink
            ]
        }),
        router_1.RouteConfig([
            {
                path: '/',
                redirectTo: '/home'
            },
            {
                path: '/home',
                component: components_1.Home,
                as: 'home'
            },
            {
                path: '/store',
                component: components_2.Store,
                as: 'store'
            },
        ]), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
angular2_1.bootstrap(AppComponent, [
    router_1.routerInjectables
]);
//# sourceMappingURL=app.js.map