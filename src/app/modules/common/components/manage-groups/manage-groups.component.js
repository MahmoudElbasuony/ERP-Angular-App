var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var Group_1 = require('../../../shared/models/Group');
var GroupRepository_1 = require('../../../shared/repos/GroupRepository');
var primeng_1 = require('primeng/primeng');
var LogService_1 = require('../../../shared/services/LogService');
var ManageGroupsComponent = (function () {
    function ManageGroupsComponent(toaster, confirmationService, langService, groupRep) {
        this.toaster = toaster;
        this.confirmationService = confirmationService;
        this.langService = langService;
        this.groupRep = groupRep;
        this.Groups = [];
    }
    ManageGroupsComponent.prototype.ngOnInit = function () {
        this.LoadGroups();
    };
    ManageGroupsComponent.prototype.LoadGroups = function (First, Rows) {
        var _this = this;
        this.groupRep.getAll(First, Rows).subscribe(function (groups) {
            _this.Groups = groups;
        });
    };
    ManageGroupsComponent.prototype.OnEditGroup = function (group) {
        this.selectedGroup = this.clone(group);
        this.DisplayGroupEditor = true;
    };
    ManageGroupsComponent.prototype.onDeleteGroup = function (_group) {
        var _this = this;
        if (_group.Id) {
            this.confirmationService.confirm({
                accept: function () {
                    _this.groupRep.delete(_group.Id).subscribe(function (group) {
                        var group_index = _this.Groups.findIndex(function (g) { return g.Id === group.Id; });
                        if (group_index >= 0)
                            _this.Groups.splice(group_index, 1);
                        _this.toaster.pop(LogService_1.LogLevel.Success, "Group Deleted Successfully");
                    });
                },
                message: this.langService.IsEnglish ? "are you sure ? " : "هل انت متاكد"
            });
        }
    };
    ManageGroupsComponent.prototype.onRequireLoadGroups = function (event) {
        var first = event.first;
        var rows = event.rows;
        this.LoadGroups();
    };
    ManageGroupsComponent.prototype.ShowAddGroupDialog = function () {
        this.DisplayGroupEditor = true;
        this.selectedGroup = new Group_1.Group();
    };
    ManageGroupsComponent.prototype.clone = function (c) {
        var obj = new Group_1.Group();
        for (var prop in c) {
            obj[prop] = c[prop];
        }
        return obj;
    };
    ManageGroupsComponent.prototype.OnGroupAddOrUpdate = function (group) {
        if (group) {
            var existed_group_indx = this.Groups.findIndex(function (u) { return u.Id === group.Id; });
            if (existed_group_indx >= 0) {
                this.Groups[existed_group_indx] = group;
            }
            else {
                this.Groups.push(group);
            }
        }
    };
    ManageGroupsComponent = __decorate([
        core_1.Component({
            selector: 'app-manage-groups',
            templateUrl: './manage-groups.component.html',
            styleUrls: ['./manage-groups.component.css'],
            providers: [GroupRepository_1.GroupRepository, primeng_1.ConfirmationService]
        })
    ], ManageGroupsComponent);
    return ManageGroupsComponent;
})();
exports.ManageGroupsComponent = ManageGroupsComponent;
