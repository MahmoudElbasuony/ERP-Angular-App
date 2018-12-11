import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 import { AppCommonRoutingModule } from './app-common.routing.module';
 import { LanguageService, RegisterTranslatorModule } from '../shared/services/LanguageService';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ManageGroupsComponent } from './components/manage-groups/manage-groups.component';
import {DataTableModule,SharedModule , PanelModule , ButtonModule
  , DialogModule,
  InputTextModule,
  ConfirmDialogModule,
  CheckboxModule,
  Checkbox,
  MultiSelectModule,
  TreeTableModule,
  DropdownModule} from 'primeng/primeng';
import { ManagePagesComponent } from './components/manage-pages/manage-pages.component';
import { GroupPermissionsComponent } from './components/group-permissions/group-permissions.component';
import { UserEditorComponent } from './components/manage-users/components/user-editor.component';
import { RouterModule } from '@angular/router';
import { GroupEditorComponent } from './components/manage-groups/group-editor/group-editor.component';
import { PageEditorComponent } from './components/manage-pages/page-editor/page-editor.component';
import { AuthGuardDirective } from '../shared/directives/authguard.directive';
import { AppSharedModule } from '../shared/Shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    ManageUsersComponent ,
    ManageGroupsComponent,
    ManagePagesComponent,
    GroupPermissionsComponent,
    UserEditorComponent,
    GroupEditorComponent,
    PageEditorComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    AppCommonRoutingModule,
    DataTableModule,SharedModule ,
    ConfirmDialogModule,
    PanelModule ,
    ButtonModule ,
    DialogModule,
    RouterModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    MultiSelectModule,
    TreeTableModule,
    RegisterTranslatorModule(false),
    AppSharedModule
  ],

  providers: [

  ],
})
export class AppCommonModule { }
