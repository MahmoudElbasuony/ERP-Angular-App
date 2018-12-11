var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var RdValidationSummaryComponent = (function () {
    function RdValidationSummaryComponent(langService) {
        this.langService = langService;
    }
    RdValidationSummaryComponent.prototype.ngDoCheck = function () {
        if (this.Form && this.ControlName) {
            this.Errors = [];
            var control = this.Form.get(this.ControlName);
            if (control && control.touched) {
                if (control.hasError("required") || (control.value && !control.value.trim())) {
                    this.Errors.push(this.langService.IsEnglish ? "this field reuired" : "هذا الحقل مطلوب");
                }
            }
        }
    };
    __decorate([
        core_1.Input()
    ], RdValidationSummaryComponent.prototype, "Form");
    __decorate([
        core_1.Input()
    ], RdValidationSummaryComponent.prototype, "ControlName");
    RdValidationSummaryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'rd-validation-summary',
            templateUrl: 'rd-validation-summary.component.html',
            styleUrls: ['rd-validation-summary.component.css']
        })
    ], RdValidationSummaryComponent);
    return RdValidationSummaryComponent;
})();
exports.RdValidationSummaryComponent = RdValidationSummaryComponent;
