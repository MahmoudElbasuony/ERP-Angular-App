var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var auth_guard_1 = require('./auth.guard');
var dashboard_component_1 = require('./components/dashboard/dashboard.component');
var manage_users_component_1 = require('./components/manage-users/manage-users.component');
var manage_pages_component_1 = require('./components/manage-pages/manage-pages.component');
var manage_groups_component_1 = require('./components/manage-groups/manage-groups.component');
var group_permissions_component_1 = require('./components/group-permissions/group-permissions.component');
var user_editor_component_1 = require('./components/manage-users/components/user-editor.component');
var AppCommonRoutes = [
    {
        path: "dashboard", component: dashboard_component_1.DashboardComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: "permissions", canActivate: [auth_guard_1.AuthGuard], children: [
            {
                path: "manageUsers", component: manage_users_component_1.ManageUsersComponent,
                children: [
                    {
                        path: 'user', component: user_editor_component_1.UserEditorComponent
                    },
                ]
            },
            {
                path: "managePages", component: manage_pages_component_1.ManagePagesComponent,
            },
            {
                path: "manageGroups", component: manage_groups_component_1.ManageGroupsComponent
            },
            {
                path: "groupPermissions", component: group_permissions_component_1.GroupPermissionsComponent
            }
        ]
    },
];
var AppCommonRoutingModule = (function () {
    function AppCommonRoutingModule() {
    }
    AppCommonRoutingModule = __decorate([
        core_1.NgModule({
            declarations: [],
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(AppCommonRoutes)
            ],
            exports: [],
            providers: [],
        })
    ], AppCommonRoutingModule);
    return AppCommonRoutingModule;
})();
exports.AppCommonRoutingModule = AppCommonRoutingModule;
