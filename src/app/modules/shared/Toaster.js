var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var Toaster = (function () {
    function Toaster(toasterService) {
        this.toasterService = toasterService;
    }
    Toaster.prototype.popToast = function () {
        this.toasterService.pop('success', 'Args Title', 'Args Body');
    };
    Toaster = __decorate([
        core_1.Component({
            selector: 'Toaster',
            template: "\n            <toaster-container></toaster-container>\n            <button (click)=\"popToast()\">pop toast</button>"
        })
    ], Toaster);
    return Toaster;
})();
exports.Toaster = Toaster;
