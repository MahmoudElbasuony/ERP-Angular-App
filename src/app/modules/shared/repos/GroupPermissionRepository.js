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
var core_1 = require("@angular/core");
var GroupPermissionRepository = (function (_super) {
    __extends(GroupPermissionRepository, _super);
    function GroupPermissionRepository(systemService) {
        _super.call(this, "GroupPermission", systemService);
    }
    GroupPermissionRepository.prototype.updateAllPermissions = function (permissions) {
        return this.updateAll(permissions);
    };
    GroupPermissionRepository = __decorate([
        core_1.Injectable()
    ], GroupPermissionRepository);
    return GroupPermissionRepository;
})(BaseCrudRepository);
exports.GroupPermissionRepository = GroupPermissionRepository;
