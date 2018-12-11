var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
(function (ActionType) {
    ActionType[ActionType["View"] = "view"] = "View";
    ActionType[ActionType["Add"] = "add"] = "Add";
    ActionType[ActionType["Edit"] = "edit"] = "Edit";
    ActionType[ActionType["Print"] = "print"] = "Print";
    ActionType[ActionType["Delete"] = "delete"] = "Delete";
})(exports.ActionType || (exports.ActionType = {}));
var ActionType = exports.ActionType;
var AuthGuardDirective = (function () {
    function AuthGuardDirective(router, renderer, AuthService, elementRef) {
        var _this = this;
        this.router = router;
        this.renderer = renderer;
        this.AuthService = AuthService;
        this.elementRef = elementRef;
        this.PermissionList = [];
        AuthService.PermssionListAsObservable.subscribe(function (permission_list) {
            _this.PermissionList = permission_list;
            _this.CheckPermissions();
        });
    }
    AuthGuardDirective.prototype.ngOnInit = function () {
        this.PermissionList = this.AuthService.PermisionList;
        this.CheckPermissions();
    };
    AuthGuardDirective.prototype.CheckPermissions = function () {
        var _this = this;
        if (!this.PagePath) {
            this.PagePath = this.router.url;
        }
        if (this.PermissionList && this.PermissionList.length && this.PagePath) {
            if (this.elementRef && this.elementRef.nativeElement) {
                var element_1 = this.elementRef.nativeElement;
                var can_show = true;
                if (this.actionType) {
                    if (this.actionType.toLowerCase() === ActionType.Edit.toLowerCase()) {
                        can_show = (this.PermissionList.findIndex(function (n) { return n.PagePath.toLowerCase() === _this.PagePath.toLowerCase() && n.CanView && n.CanEdit; }) >= 0);
                    }
                    else if (this.actionType.toLowerCase() === ActionType.Add.toLowerCase()) {
                        can_show = (this.PermissionList.findIndex(function (n) { return n.PagePath.toLowerCase() === _this.PagePath.toLowerCase() && n.CanView && n.CanAdd; }) >= 0);
                    }
                    else if (this.actionType.toLowerCase() === ActionType.Delete.toLowerCase()) {
                        can_show = (this.PermissionList.findIndex(function (n) { return n.PagePath.toLowerCase() === _this.PagePath.toLowerCase() && n.CanView && n.CanDelete; }) >= 0);
                    }
                    else if (this.actionType.toLowerCase() === ActionType.Print.toLowerCase()) {
                        can_show = (this.PermissionList.findIndex(function (n) { return n.PagePath.toLowerCase() === _this.PagePath.toLowerCase() && n.CanView && n.CanPrint; }) >= 0);
                    }
                    else if (this.actionType.toLowerCase() === ActionType.View.toLowerCase()) {
                        can_show = (this.PermissionList.findIndex(function (n) { return n.PagePath.toLowerCase() === _this.PagePath.toLowerCase() && n.CanView; }) >= 0);
                    }
                }
                else {
                    can_show = (this.PermissionList.findIndex(function (n) { return n.PagePath.toLowerCase() === _this.PagePath.toLowerCase() && n.CanView; }) >= 0);
                }
                if (!can_show)
                    this.renderer.setStyle(element_1, "display", "none");
                else
                    this.renderer.setStyle(element_1, "display", "block");
            }
        }
    };
    __decorate([
        core_1.Input("authGuard")
    ], AuthGuardDirective.prototype, "PagePath");
    __decorate([
        core_1.Input()
    ], AuthGuardDirective.prototype, "actionType");
    AuthGuardDirective = __decorate([
        core_1.Directive({
            selector: '[authGuard]',
        })
    ], AuthGuardDirective);
    return AuthGuardDirective;
})();
exports.AuthGuardDirective = AuthGuardDirective;
