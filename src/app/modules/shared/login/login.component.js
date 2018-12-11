var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var LogService_1 = require('../services/LogService');
var User_1 = require('../models/User');
var window_1 = require('rxjs/operators/window');
var LoginComponent = (function () {
    function LoginComponent(appRef, systemService, router, toaster, authService, langService) {
        this.appRef = appRef;
        this.systemService = systemService;
        this.router = router;
        this.toaster = toaster;
        this.authService = authService;
        this.langService = langService;
        this._window = window_1.window;
        this.Rememberme = false;
        this.User = new User_1.User();
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.authService.IsAuthenticated) {
            this.router.navigate(["dashboard"]);
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.authService.Login(this.User, this.Rememberme, function (resp) {
            _this.toaster.pop(LogService_1.LogLevel.Info, "welcome");
            _this.router.navigate(["/dashboard"]);
            _this.appRef.tick();
            //location.reload();
        }, function (error) {
            console.log(error);
        });
    };
    LoginComponent.prototype.forgotPasswordLinkClick = function () {
        if (this.ForgotPasswordEmail && this.ForgotPasswordEmailError) {
            var email = (this.ForgotPasswordEmail.nativeElement);
            var emailError = (this.ForgotPasswordEmailError.nativeElement);
            emailError.hidden = true;
            email.value = "";
        }
        this.IsForgotPassword = !this.IsForgotPassword;
    };
    LoginComponent.prototype.onForgotPassword = function () {
        var _this = this;
        // validate input
        var email = (this.ForgotPasswordEmail.nativeElement);
        var emailError = (this.ForgotPasswordEmailError.nativeElement);
        var email_text = email.value;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email_text || !email_text.trim() || !re.test(email_text)) {
            emailError.style.display = "block";
            email.value = "";
            email.focus();
            return;
        }
        else
            emailError.style.display = "none";
        // start process
        this.InProgress = true;
        this.authService.ForgotPassword(email_text, function () {
            _this.toaster.pop(LogService_1.LogLevel.Success, "We sent you an email please check your inbox");
            _this.InProgress = false;
            _this.forgotPasswordLinkClick();
        }, function (error) {
            _this.toaster.pop(LogService_1.LogLevel.Error, error);
            _this.InProgress = false;
        });
    };
    LoginComponent.prototype.ngOnDestroy = function () {
    };
    __decorate([
        core_1.ViewChild("email")
    ], LoginComponent.prototype, "ForgotPasswordEmail");
    __decorate([
        core_1.ViewChild("emailerror")
    ], LoginComponent.prototype, "ForgotPasswordEmailError");
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: []
        })
    ], LoginComponent);
    return LoginComponent;
})();
exports.LoginComponent = LoginComponent;
