var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var login_component_1 = require("./modules/shared/login/login.component");
var auth_guard_1 = require('./modules/common/auth.guard');
var reset_password_component_1 = require('./modules/shared/reset-password/reset-password.component');
var unauthorized_component_1 = require('./modules/shared/unauthorized/unauthorized.component');
var notfound_component_1 = require('./modules/shared/notfound/notfound.component');
var appRoutes = [
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'resetpassword',
        component: reset_password_component_1.ResetPasswordComponent
    },
    {
        path: "notFound",
        component: notfound_component_1.NotfoundComponent
    },
    {
        path: "generalData",
        canActivate: [auth_guard_1.AuthGuard],
        loadChildren: "./modules/generalData/app.generalData.module#AppGeneralDataModule"
    },
    {
        canActivate: [auth_guard_1.AuthGuard],
        path: "accounting",
        loadChildren: "./modules/accounting/app.accounting.module#AppAccountingModule"
    },
    {
        path: 'unauthorized', component: unauthorized_component_1.UnauthorizedComponent
    },
    {
        path: '', redirectTo: "login", pathMatch: "full"
    },
    {
        path: '**',
        redirectTo: "/notFound",
        pathMatch: "full"
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(appRoutes)
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
})();
exports.AppRoutingModule = AppRoutingModule;
