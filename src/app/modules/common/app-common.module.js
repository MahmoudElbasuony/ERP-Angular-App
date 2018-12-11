var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var common_1 = require('@angular/common');
var app_common_routing_module_1 = require('./app-common.routing.module');
var LanguageService_1 = require('../shared/services/LanguageService');
var dashboard_component_1 = require('./components/dashboard/dashboard.component');
var manage_users_component_1 = require('./components/manage-users/manage-users.component');
var manage_groups_component_1 = require('./components/manage-groups/manage-groups.component');
var primeng_1 = require('primeng/primeng');
var manage_pages_component_1 = require('./components/manage-pages/manage-pages.component');
var group_permissions_component_1 = require('./components/group-permissions/group-permissions.component');
var user_editor_component_1 = require('./components/manage-users/components/user-editor.component');
var router_1 = require('@angular/router');
var group_editor_component_1 = require('./components/manage-groups/group-editor/group-editor.component');
var page_editor_component_1 = require('./components/manage-pages/page-editor/page-editor.component');
var Shared_module_1 = require('../shared/Shared.module');
var AppCommonModule = (function () {
    function AppCommonModule() {
    }
    AppCommonModule = __decorate([
        core_1.NgModule({
            declarations: [
                dashboard_component_1.DashboardComponent,
                manage_users_component_1.ManageUsersComponent,
                manage_groups_component_1.ManageGroupsComponent,
                manage_pages_component_1.ManagePagesComponent,
                group_permissions_component_1.GroupPermissionsComponent,
                user_editor_component_1.UserEditorComponent,
                group_editor_component_1.GroupEditorComponent,
                page_editor_component_1.PageEditorComponent,
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                app_common_routing_module_1.AppCommonRoutingModule,
                primeng_1.DataTableModule, primeng_1.SharedModule,
                primeng_1.ConfirmDialogModule,
                primeng_1.PanelModule,
                primeng_1.ButtonModule,
                primeng_1.DialogModule,
                router_1.RouterModule,
                primeng_1.InputTextModule,
                primeng_1.CheckboxModule,
                primeng_1.DropdownModule,
                primeng_1.MultiSelectModule,
                primeng_1.TreeTableModule,
                LanguageService_1.RegisterTranslatorModule(false),
                Shared_module_1.AppSharedModule
            ],
            providers: [],
        })
    ], AppCommonModule);
    return AppCommonModule;
})();
exports.AppCommonModule = AppCommonModule;
