var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var system_service_service_1 = require('../../../system-service.service');
var core_1 = require('@angular/core');
var UserRepository = (function (_super) {
    __extends(UserRepository, _super);
    function UserRepository(systemService) {
        _super.call(this, "User", systemService);
    }
    UserRepository = __decorate([
        __param(0, core_1.Inject(system_service_service_1.SystemServiceService))
    ], UserRepository);
    return UserRepository;
})(BaseCrudRepository);
exports.UserRepository = UserRepository;
