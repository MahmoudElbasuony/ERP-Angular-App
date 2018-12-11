var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var LoaderService = (function () {
    function LoaderService() {
        this._isLoading = false;
    }
    Object.defineProperty(LoaderService.prototype, "IsLoading", {
        get: function () {
            return this._isLoading;
        },
        enumerable: true,
        configurable: true
    });
    LoaderService.prototype.Show = function () {
        var _this = this;
        // this will be bound to loader component
        // angular detect changes and based on it
        // update view with new value
        // angular doesn't allow you to set value during change detection cycle
        // so any update prevent it to next cycle to allow angular to know about it
        setTimeout(function () {
            _this._isLoading = true;
        }, 1);
    };
    LoaderService.prototype.Hide = function () {
        var _this = this;
        // this will be bound to loader component
        // angular detect changes and based on it
        // update view with new value
        // angular doesn't allow you to set value during change detection cycle
        // so any update prevent it to next cycle to allow angular to know about it
        setTimeout(function () {
            _this._isLoading = false;
        }, 1);
    };
    LoaderService = __decorate([
        core_1.Injectable()
    ], LoaderService);
    return LoaderService;
})();
exports.LoaderService = LoaderService;
