/// <reference path="../typings/tsd.d.ts" />
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
var router_1 = require('angular2/router');
/**
 * Store component
 * Main component of the application
 */
var Store = (function () {
    function Store(router) {
        this.router = router;
    }
    Store = __decorate([
        angular2_1.Component({
            selector: 'store'
        }),
        angular2_1.View({
            template: "\n    <div class=\"store-page\">\n\n    </div>\n    ",
            directives: [
                router_1.RouterOutlet,
                router_1.RouterLink
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], Store);
    return Store;
})();
exports.Store = Store;
//# sourceMappingURL=Store.js.map