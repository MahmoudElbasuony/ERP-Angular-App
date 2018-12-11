var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var GroupPermissionRepository_1 = require('../../../shared/repos/GroupPermissionRepository');
var GroupRepository_1 = require('../../../shared/repos/GroupRepository');
var User_1 = require('../../../shared/models/User');
var GroupPermissionsComponent = (function () {
    function GroupPermissionsComponent(toaster, langService, groupRepository, groupPermissionRep, authService) {
        this.toaster = toaster;
        this.langService = langService;
        this.groupRepository = groupRepository;
        this.groupPermissionRep = groupPermissionRep;
        this.authService = authService;
        this.tree = [];
        this.groups = [];
    }
    GroupPermissionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.permissions = [];
        this.groupRepository.getAll().subscribe(function (resp) {
            _this.groups = resp;
        }, function () { });
    };
    GroupPermissionsComponent.prototype.OnChangeGroup = function () {
        var _this = this;
        if (this.selectedGroup) {
            this.groupPermissionRep.get(this.selectedGroup.Id).subscribe(function (resp) {
                _this.tree = resp;
            }, function (error) {
            });
        }
    };
    GroupPermissionsComponent.prototype.SaveChanges = function () {
        var _this = this;
        if (this.permissions.length > 0) {
            this.groupPermissionRep.updateAll({ permissions: this.permissions, RoleId: this.selectedGroup.Id }).subscribe(function (resp) {
                _this.toaster.pop(User_1.LogLevel.Success, "Done");
                _this.permissions = [];
                _this.authService.LoadPermissionTree();
            }, function (error) {
                _this.toaster.pop(User_1.LogLevel.Error, error.statusText);
            });
        }
        else {
            this.toaster.pop(User_1.LogLevel.Warning, "No Changes to save");
        }
        //this.groupPermissionRep.updateAll()
    };
    GroupPermissionsComponent.prototype.onPermissionChanged = function (node) {
        var permission = node.data;
        if (permission && !this.permissions.find(function (p) { return p.RoleId === permission.RoleId && p.PageId === permission.PageId; })) {
            this.permissions.push(node.data);
            this.getChildPermissions(node);
        }
    };
    GroupPermissionsComponent.prototype.getChildPermissions = function (node) {
        for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
            var child = _a[_i];
            var permission = child.data;
            if (permission && !this.permissions.find(function (p) { return p.RoleId === permission.RoleId && p.PageId === permission.PageId; })) {
                this.permissions.push(child.data);
            }
            this.getChildPermissions(child);
        }
    };
    GroupPermissionsComponent.prototype.CanDo = function (node, event, action) {
        if (!action || !action.trim())
            return;
        var action_name = action.trim().toLowerCase();
        var ischeck = event.target.checked;
        var node_data = node.data;
        if (node_data) {
            var node_data_1 = node.data;
            if (action_name === "view") {
                node_data_1.CanView = ischeck;
                if (!ischeck)
                    node_data_1.CanAdd = node_data_1.CanDelete = node_data_1.CanEdit = node_data_1.CanPrint = ischeck;
            }
            else if (action_name === "add") {
                node_data_1.CanAdd = ischeck;
            }
            else if (action_name === "edit") {
                node_data_1.CanEdit = ischeck;
            }
            else if (action_name === "delete") {
                node_data_1.CanDelete = ischeck;
            }
            else if (action_name === "print") {
                node_data_1.CanPrint = ischeck;
            }
            else if (action === "all") {
                node_data_1.CanView = node_data_1.CanAdd = node_data_1.CanDelete
                    = node_data_1.CanPrint = node_data_1.CanEdit = ischeck;
            }
            this.UpdateChildren(node, ischeck, action_name);
        }
        this.onPermissionChanged(node);
    };
    GroupPermissionsComponent.prototype.UpdateChildren = function (node, ischeck, action) {
        if (node.children && node.children.length > 0) {
            var node_data = node.data;
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var child = _a[_i];
                var child_node_data = child.data;
                if (action === "view") {
                    child_node_data.CanView = node_data.CanView;
                    if (!child_node_data.CanView)
                        child_node_data.CanAdd = child_node_data.CanPrint = child_node_data.CanDelete = child_node_data.CanEdit = child_node_data.CanView;
                }
                else if (action === "add") {
                    if (node_data.CanView)
                        child_node_data.CanAdd = ischeck;
                }
                else if (action === "edit") {
                    if (node_data.CanView)
                        child_node_data.CanEdit = ischeck;
                }
                else if (action === "delete") {
                    if (node_data.CanView)
                        child_node_data.CanDelete = ischeck;
                }
                else if (action === "print") {
                    if (node_data.CanView)
                        child_node_data.CanPrint = ischeck;
                }
                else if (action === "all") {
                    child_node_data.CanView = child_node_data.CanAdd = child_node_data.CanDelete
                        = child_node_data.CanPrint = child_node_data.CanEdit = ischeck;
                }
                this.UpdateChildren(child, ischeck, action);
            }
        }
    };
    GroupPermissionsComponent = __decorate([
        core_1.Component({
            selector: 'app-group-permissions',
            templateUrl: './group-permissions.component.html',
            styleUrls: ['./group-permissions.component.css'],
            providers: [GroupPermissionRepository_1.GroupPermissionRepository, GroupRepository_1.GroupRepository]
        })
    ], GroupPermissionsComponent);
    return GroupPermissionsComponent;
})();
exports.GroupPermissionsComponent = GroupPermissionsComponent;
