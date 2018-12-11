import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ManagePagesComponent } from './components/manage-pages/manage-pages.component';
import { ManageGroupsComponent } from './components/manage-groups/manage-groups.component';
import { GroupPermissionsComponent } from './components/group-permissions/group-permissions.component';
import { UserEditorComponent } from './components/manage-users/components/user-editor.component';


const AppCommonRoutes: Routes = [
  {
    path: "dashboard", component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "permissions", canActivate: [AuthGuard], children: [
      {
        path: "manageUsers", component: ManageUsersComponent,

        children: [
          {
            path: 'user', component: UserEditorComponent
          },
        ]
      }
      ,
      {
        path: "managePages", component: ManagePagesComponent,
      }
      ,
      {
        path: "manageGroups", component: ManageGroupsComponent
      }
      ,
      {
        path: "groupPermissions", component: GroupPermissionsComponent
      }
    ]
  },

];

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AppCommonRoutes)
  ],
  exports: [

  ],
  providers: [

  ],
})
export class AppCommonRoutingModule {

}

