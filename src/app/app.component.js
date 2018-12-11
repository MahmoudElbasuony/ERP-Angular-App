var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var jquery_1 = require("jquery");
var AppComponent = (function () {
    function AppComponent(LoaderService, AuthService, langService, router) {
        this.LoaderService = LoaderService;
        this.AuthService = AuthService;
        this.langService = langService;
        this.router = router;
        this.title = 'app';
    }
    Object.defineProperty(AppComponent.prototype, "IsAuthenticated", {
        get: function () {
            return this.AuthService.IsAuthenticated;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.ngOnInit = function () {
        this.InitDom();
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        if (this.IsAuthenticated) {
            this.LoaderService.Show();
            this.AuthService.LoadPermissionTree();
        }
    };
    AppComponent.prototype.InitDom = function () {
        var _this = this;
        jquery_1.default(function () {
            if (_this.langService.IsEnglish)
                jquery_1.default("body").attr("dir", "ltr");
            else
                jquery_1.default("body").attr("dir", "rtl");
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
