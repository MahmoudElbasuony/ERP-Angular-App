var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var authguard_directive_1 = require('./directives/authguard.directive');
var unauthorized_component_1 = require('./unauthorized/unauthorized.component');
var notfound_component_1 = require('./notfound/notfound.component');
var LanguageService_1 = require('./services/LanguageService');
var td_validation_summary_component_1 = require('./validation/td-validation-summary/td-validation-summary.component');
var rd_validation_summary_component_1 = require('./validation/rd-validation-summary/rd-validation-summary.component');
var AppSharedModule = (function () {
    function AppSharedModule() {
    }
    AppSharedModule = __decorate([
        core_1.NgModule({
            declarations: [
                authguard_directive_1.AuthGuardDirective,
                unauthorized_component_1.UnauthorizedComponent,
                notfound_component_1.NotfoundComponent,
                td_validation_summary_component_1.TdValidationSummaryComponent,
                rd_validation_summary_component_1.RdValidationSummaryComponent
            ],
            imports: [
                common_1.CommonModule,
                LanguageService_1.RegisterTranslatorModule(false)
            ],
            exports: [
                authguard_directive_1.AuthGuardDirective,
                td_validation_summary_component_1.TdValidationSummaryComponent,
                rd_validation_summary_component_1.RdValidationSummaryComponent
            ],
            providers: [],
        })
    ], AppSharedModule);
    return AppSharedModule;
})();
exports.AppSharedModule = AppSharedModule;
