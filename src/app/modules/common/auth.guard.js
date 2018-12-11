var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var AuthGuard = (function () {
    function AuthGuard(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    AuthGuard.prototype.canActivate = function () {
        if (!this.authService.IsAuthenticated) {
            this.router.navigate(["/login"]);
            return false;
        }
        return true;
    };
    AuthGuard.prototype.canLoad = function (route) {
        // if (this.authService.IsAuthenticated) {
        //   this.router.navigate(["/notFound"]);
        //   return false;
        // }
        return true;
    };
    AuthGuard = __decorate([
        core_1.Injectable()
    ], AuthGuard);
    return AuthGuard;
})();
exports.AuthGuard = AuthGuard;
