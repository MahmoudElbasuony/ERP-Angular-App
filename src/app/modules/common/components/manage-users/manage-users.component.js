var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var UserRepository_1 = require('../../../shared/repos/UserRepository');
var User_1 = require('../../../shared/models/User');
var GroupRepository_1 = require('../../../shared/repos/GroupRepository');
var ManageUsersComponent = (function () {
    function ManageUsersComponent(repo, groupRep, langService) {
        this.repo = repo;
        this.groupRep = groupRep;
        this.langService = langService;
        this.Users = [];
        this.user = new User_1.User();
        this.Groups = [];
    }
    ManageUsersComponent.prototype.showDialogToAdd = function () {
        this.newUser = true;
        this.user = new User_1.User();
        this.displayDialog = true;
    };
    ManageUsersComponent.prototype.onUserSelect = function (user) {
        this.newUser = false;
        this.user = this.clone(user);
        this.displayDialog = true;
    };
    ManageUsersComponent.prototype.clone = function (c) {
        var obj = new User_1.User();
        for (var prop in c) {
            obj[prop] = c[prop];
        }
        return obj;
    };
    ManageUsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.repo.getAll().subscribe(function (res) {
            if (res) {
                _this.Users = res;
            }
            else {
                console.log(res);
            }
        });
        this.groupRep.getAll().subscribe(function (groups) {
            _this.Groups = groups;
        });
    };
    ManageUsersComponent.prototype.OnUserAddOrUpdate = function (event) {
        if (event.user) {
            var existed_user_indx = this.Users.findIndex(function (u) { return u.Id === event.user.Id; });
            if (existed_user_indx >= 0) {
                this.Users[existed_user_indx] = event.user;
            }
            else {
                this.Users.push(event.user);
            }
            this.Users = this.Users.slice();
        }
    };
    ManageUsersComponent = __decorate([
        core_1.Component({
            selector: 'app-manage-users',
            templateUrl: './manage-users.component.html',
            styleUrls: ['./manage-users.component.css'],
            providers: [UserRepository_1.UserRepository, GroupRepository_1.GroupRepository]
        })
    ], ManageUsersComponent);
    return ManageUsersComponent;
})();
exports.ManageUsersComponent = ManageUsersComponent;
