var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var Page_1 = require('../../../shared/models/Page');
var LogService_1 = require('../../../shared/services/LogService');
var primeng_1 = require('primeng/primeng');
var PageRepository_1 = require('../../../shared/repos/PageRepository');
var ManagePagesComponent = (function () {
    function ManagePagesComponent(authService, toaster, confirmationService, langService, pageRep) {
        this.authService = authService;
        this.toaster = toaster;
        this.confirmationService = confirmationService;
        this.langService = langService;
        this.pageRep = pageRep;
        this.Pages = [];
    }
    ManagePagesComponent.prototype.ngOnInit = function () {
        this.LoadPages();
    };
    ManagePagesComponent.prototype.LoadPages = function (First, Rows) {
        var _this = this;
        this.pageRep.getAll(First, Rows).subscribe(function (pages) {
            _this.Pages = pages;
        });
    };
    ManagePagesComponent.prototype.OnEditPage = function (page) {
        this.selectedPage = this.clone(page);
        this.DisplayPageEditor = true;
    };
    ManagePagesComponent.prototype.onDeletePage = function (_page) {
        var _this = this;
        if (_page.Id) {
            this.confirmationService.confirm({
                accept: function () {
                    _this.pageRep.delete(_page.Id).subscribe(function (page) {
                        _this.authService.OnDeletePageFromPermissions();
                        var page_index = _this.Pages.findIndex(function (g) { return g.Id === _page.Id; });
                        if (page_index >= 0)
                            _this.Pages.splice(page_index, 1);
                        _this.toaster.pop(LogService_1.LogLevel.Success, "Page Deleted Successfully");
                    });
                },
                message: this.langService.IsEnglish ? "are you sure ? " : "هل انت متاكد"
            });
        }
    };
    ManagePagesComponent.prototype.onRequireLoadPages = function (event) {
        var first = event.first;
        var rows = event.rows;
        this.LoadPages();
    };
    ManagePagesComponent.prototype.ShowAddPageDialog = function () {
        this.DisplayPageEditor = true;
        this.selectedPage = new Page_1.Page();
    };
    ManagePagesComponent.prototype.clone = function (c) {
        var obj = new Page_1.Page();
        for (var prop in c) {
            obj[prop] = c[prop];
        }
        return obj;
    };
    ManagePagesComponent.prototype.OnPageAddOrUpdate = function (page) {
        if (page) {
            var existed_page_indx = this.Pages.findIndex(function (u) { return u.Id === page.Id; });
            if (existed_page_indx >= 0) {
                this.Pages[existed_page_indx] = page;
            }
            else {
                this.Pages.push(page);
            }
        }
    };
    ManagePagesComponent = __decorate([
        core_1.Component({
            selector: 'app-manage-pages',
            templateUrl: './manage-pages.component.html',
            styleUrls: ['./manage-pages.component.css'],
            providers: [PageRepository_1.PageRepository, primeng_1.ConfirmationService]
        })
    ], ManagePagesComponent);
    return ManagePagesComponent;
})();
exports.ManagePagesComponent = ManagePagesComponent;
