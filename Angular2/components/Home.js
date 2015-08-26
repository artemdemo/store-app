/// <reference path="../typings/angular2/angular2.d.ts" />
/// <reference path="../typings/custom.d.ts" />
/// <reference path="../vendor/fetch/fetch.d.ts" />
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
/**
 * Store component
 * Main component of the application
 */
var Home = (function () {
    function Home(router) {
        this.router = router;
    }
    Home.prototype.openStore = function () {
        this.router.navigate('/store');
        console.log(this.router);
    };
    Home = __decorate([
        angular2_1.Component({
            selector: 'home'
        }),
        angular2_1.View({
            template: "\n    <div class=\"home-page\">\n\n        <div class=\"container\">\n            <h1>Start shopping now</h1>\n            <button (click)=\"openStore()\">Enter Store</button>\n        </div>\n\n    </div>\n    ",
            directives: [
                router_1.RouterOutlet,
                router_1.RouterLink
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], Home);
    return Home;
})();
exports.Home = Home;
//# sourceMappingURL=Home.js.map