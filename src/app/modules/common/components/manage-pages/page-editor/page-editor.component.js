var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var PageEditorComponent = (function () {
    function PageEditorComponent(pageRep, langService) {
        this.pageRep = pageRep;
        this.langService = langService;
        this.OnCloseDialog = new core_1.EventEmitter();
        this.OnAddOrUpdatePage = new core_1.EventEmitter();
    }
    PageEditorComponent.prototype.ngOnInit = function () {
        if (this.Page && this.Page.Path && this.Page.Path.startsWith("/"))
            this.Page.Path = this.Page.Path.substr(1, this.Page.Path.length);
        if (this.Page && this.Page.Id)
            this.IsEdit = true;
    };
    PageEditorComponent.prototype.SavePage = function () {
        var _this = this;
        this.Page.Path = "/" + this.Page.Path;
        if (!this.Page.Id) {
            this.pageRep.create(this.Page).subscribe(function (page) {
                _this.Page = page;
                _this.OnAddOrUpdatePage.emit(_this.Page);
                _this.OnCloseDialog.emit(false);
                _this.Close();
            });
        }
        else {
            this.pageRep.update(this.Page).subscribe(function (page) {
                _this.Page = page;
                _this.OnAddOrUpdatePage.emit(_this.Page);
                _this.OnCloseDialog.emit(false);
                _this.Close();
            });
        }
    };
    PageEditorComponent.prototype.Close = function () {
        this.OnCloseDialog.emit(false);
    };
    __decorate([
        core_1.Input()
    ], PageEditorComponent.prototype, "Page");
    __decorate([
        core_1.Output()
    ], PageEditorComponent.prototype, "OnCloseDialog");
    __decorate([
        core_1.Output()
    ], PageEditorComponent.prototype, "OnAddOrUpdatePage");
    PageEditorComponent = __decorate([
        core_1.Component({
            selector: 'page-editor',
            templateUrl: 'page-editor.component.html',
            styleUrls: ['page-editor.component.css']
        })
    ], PageEditorComponent);
    return PageEditorComponent;
})();
exports.PageEditorComponent = PageEditorComponent;
