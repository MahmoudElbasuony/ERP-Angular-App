var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var HeaderComponent = (function () {
    function HeaderComponent(systemService, AuthService, router, langService) {
        var _this = this;
        this.systemService = systemService;
        this.AuthService = AuthService;
        this.router = router;
        this.langService = langService;
        this.systemService.showNavBarEmitter.subscribe(function (mode) {
            _this.isLoggedIn = mode;
        });
    }
    HeaderComponent.prototype.Logout = function () {
        this.AuthService.Logout();
        this.router.navigate(["login"]);
    };
    Object.defineProperty(HeaderComponent.prototype, "User", {
        get: function () {
            return this.AuthService.User;
        },
        enumerable: true,
        configurable: true
    });
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], HeaderComponent);
    return HeaderComponent;
})();
exports.HeaderComponent = HeaderComponent;
