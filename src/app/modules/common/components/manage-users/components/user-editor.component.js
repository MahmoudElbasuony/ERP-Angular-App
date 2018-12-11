var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var core_3 = require('@angular/core');
var GroupRepository_1 = require('../../../../shared/repos/GroupRepository');
var UserEditorComponent = (function () {
    function UserEditorComponent(userRep, groupRep, langService) {
        this.userRep = userRep;
        this.groupRep = groupRep;
        this.langService = langService;
        this.OnCloseDialog = new core_2.EventEmitter();
        this.OnAddOrUpdateUser = new core_2.EventEmitter();
        this.Groups = [];
    }
    UserEditorComponent.prototype.ngOnInit = function () {
        if (this.User && this.User.Id)
            this.IsEdit = true;
    };
    UserEditorComponent.prototype.SaveUser = function () {
        var _this = this;
        if (!this.User.Id) {
            this.userRep.create(this.User).subscribe(function (user) {
                _this.User = user;
                _this.OnAddOrUpdateUser.emit({ user: _this.User, isUpdate: false });
                _this.OnCloseDialog.emit(false);
                _this.Close();
            });
        }
        else {
            this.userRep.update(this.User).subscribe(function (user) {
                _this.User = user;
                _this.OnAddOrUpdateUser.emit({ user: _this.User, isUpdate: true });
                _this.OnCloseDialog.emit(false);
                _this.Close();
            });
        }
    };
    UserEditorComponent.prototype.Close = function () {
        this.OnCloseDialog.emit(false);
    };
    __decorate([
        core_1.Input()
    ], UserEditorComponent.prototype, "User");
    __decorate([
        core_3.Output()
    ], UserEditorComponent.prototype, "OnCloseDialog");
    __decorate([
        core_3.Output()
    ], UserEditorComponent.prototype, "OnAddOrUpdateUser");
    __decorate([
        core_1.Input()
    ], UserEditorComponent.prototype, "Groups");
    UserEditorComponent = __decorate([
        core_1.Component({
            selector: 'app-user-editor',
            templateUrl: './user-editor.component.html',
            styleUrls: ['./user-editor.component.css'],
            providers: [
                GroupRepository_1.GroupRepository
            ]
        })
    ], UserEditorComponent);
    return UserEditorComponent;
})();
exports.UserEditorComponent = UserEditorComponent;
