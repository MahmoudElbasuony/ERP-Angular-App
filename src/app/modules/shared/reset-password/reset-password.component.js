var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var User_1 = require('../models/User');
var ResetPasswordComponent = (function () {
    function ResetPasswordComponent(authService, router, toaster, formBuilder, route) {
        var _this = this;
        this.authService = authService;
        this.router = router;
        this.toaster = toaster;
        this.formBuilder = formBuilder;
        this.route = route;
        // intialize resting form
        this.ResetForm = formBuilder.group({
            "NewPassword": ["", [forms_1.Validators.required]],
            "ConfirmNewPassword": ["", [forms_1.Validators.required]]
        });
        // inspect reset code in url
        this.route.queryParamMap.subscribe(function (map) {
            _this.Code = map.get("resetCode");
            if (!_this.Code)
                _this.router.navigate(["notFound"]);
        });
    }
    Object.defineProperty(ResetPasswordComponent.prototype, "IsConfirmedPasswordMatch", {
        get: function () {
            if (this.ConfirmNewPassword && this.NewPassword && this.ConfirmNewPassword.value !== this.NewPassword.value)
                return false;
            else
                return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResetPasswordComponent.prototype, "NewPassword", {
        get: function () {
            if (this.ResetForm)
                return this.ResetForm.get("NewPassword");
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResetPasswordComponent.prototype, "ConfirmNewPassword", {
        get: function () {
            if (this.ResetForm)
                return this.ResetForm.get("ConfirmNewPassword");
            return null;
        },
        enumerable: true,
        configurable: true
    });
    ResetPasswordComponent.prototype.ResetPassword = function () {
        var _this = this;
        // indicates that reseting operating is working
        this.InProgress = true;
        // start reset password
        this.authService.ResetPassword(this.Code, this.NewPassword.value, function () {
            _this.toaster.pop(User_1.LogLevel.Success, "Updated Password Successfully");
            _this.router.navigate(["login"]);
            _this.InProgress = false;
        }, function (error_message) {
            _this.toaster.pop(User_1.LogLevel.Error, error_message);
            _this.InProgress = false;
        });
    };
    ResetPasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-reset-password',
            templateUrl: 'reset-password.component.html',
            styleUrls: ['reset-password.component.css']
        })
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
})();
exports.ResetPasswordComponent = ResetPasswordComponent;
