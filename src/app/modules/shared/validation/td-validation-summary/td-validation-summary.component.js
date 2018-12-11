var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var TdValidationSummaryComponent = (function () {
    function TdValidationSummaryComponent() {
    }
    TdValidationSummaryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'td-validation-summary',
            templateUrl: 'td-validation-summary.component.html',
            styleUrls: ['td-validation-summary.component.css']
        })
    ], TdValidationSummaryComponent);
    return TdValidationSummaryComponent;
})();
exports.TdValidationSummaryComponent = TdValidationSummaryComponent;
