/// <reference path="typings/tsd.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var angular2_2 = require("angular2/angular2");
var router_1 = require('angular2/router');
var router_2 = require('angular2/router');
var components_1 = require('./components');
var components_2 = require('./components');
/**
 * Store component
 * Main component of the application
 */
var AppComponent = (function () {
    function AppComponent(http) {
        http.get('../menu.json')
            .toRx()
            .subscribe(function (res) {
            console.log(res.json());
        });
    }
    AppComponent = __decorate([
        angular2_1.Component({
            appInjector: [angular2_2.httpInjectables],
            selector: 'app'
        }),
        angular2_1.View({
            template: "\n    <div id=\"mainContainer\">\n        <router-outlet></router-outlet>\n    </div>\n    ",
            directives: [router_1.RouterOutlet]
        }),
        router_1.RouteConfig([
            { path: '/', redirectTo: '/home' },
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
        __metadata('design:paramtypes', [angular2_2.Http])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
angular2_1.bootstrap(AppComponent, [
    angular2_2.httpInjectables,
    router_2.routerInjectables,
    angular2_1.bind(router_2.LocationStrategy).toClass(router_2.HashLocationStrategy) // This part will be gone in post alpha
]);
//# sourceMappingURL=app.js.map