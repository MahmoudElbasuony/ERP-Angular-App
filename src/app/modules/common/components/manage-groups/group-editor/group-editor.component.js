var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var GroupEditorComponent = (function () {
    function GroupEditorComponent(groupRep) {
        this.groupRep = groupRep;
        this.OnCloseDialog = new core_1.EventEmitter();
        this.OnAddOrUpdateGroup = new core_1.EventEmitter();
    }
    GroupEditorComponent.prototype.ngOnInit = function () {
        if (this.Group && this.Group.Id)
            this.IsEdit = true;
    };
    GroupEditorComponent.prototype.SaveGroup = function () {
        var _this = this;
        if (!this.Group.Id) {
            this.groupRep.create(this.Group).subscribe(function (group) {
                _this.Group = group;
                _this.OnAddOrUpdateGroup.emit(_this.Group);
                _this.OnCloseDialog.emit(false);
                _this.Close();
            });
        }
        else {
            this.groupRep.update(this.Group).subscribe(function (group) {
                _this.Group = group;
                _this.OnAddOrUpdateGroup.emit(_this.Group);
                _this.OnCloseDialog.emit(false);
                _this.Close();
            });
        }
    };
    GroupEditorComponent.prototype.Close = function () {
        this.OnCloseDialog.emit(false);
    };
    __decorate([
        core_1.Input()
    ], GroupEditorComponent.prototype, "Group");
    __decorate([
        core_1.Output()
    ], GroupEditorComponent.prototype, "OnCloseDialog");
    __decorate([
        core_1.Output()
    ], GroupEditorComponent.prototype, "OnAddOrUpdateGroup");
    GroupEditorComponent = __decorate([
        core_1.Component({
            selector: 'group-editor',
            templateUrl: 'group-editor.component.html',
            styleUrls: ['group-editor.component.css']
        })
    ], GroupEditorComponent);
    return GroupEditorComponent;
})();
exports.GroupEditorComponent = GroupEditorComponent;
