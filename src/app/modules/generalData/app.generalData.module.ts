import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '../common/app-common.module';
import { AppGeneralDataRoutingModule } from './app.generalData.Routing.module';
import { CitiesComponent } from './components/cities/cities.component';
import { CompanyDataComponent } from './components/company-data/company-data.component';
import { CountriesComponent } from './components/countries/countries.component';
import { LanguageService, RegisterTranslatorModule } from '../shared/services/LanguageService';
import {DataTableModule,SharedModule , PanelModule , ButtonModule
    , DialogModule, ConfirmDialogModule, ConfirmationService, FileUploadModule,SelectItem,TabViewModule,DropdownModule, GrowlModule} from 'primeng/primeng';
import { BasicDataComponent } from './components/company-data/components/basic-data/basic-data.component';
import { LegalitiesComponent } from './components/company-data/components/Legalities/Legalities.component';
import { ContactsDataComponent } from './components/company-data/components/contacts-data/contacts-data.component';
import { BranchComponent } from './components/company-data/components/branches/branches.component';
import { ReportsSettingComponent } from './components/company-data/components/reports-settings/Reports-setting.component';
import { AuthGuardDirective } from '../shared/directives/authguard.directive';
import { AppSharedModule } from '../shared/Shared.module';
import { AccountLinkComponent } from './components/company-data/components/account-link/account-link.component';
import { AccountLinkDetailsComponent } from './components/company-data/components/account-link/account-link-details/account-link-details.component';

@NgModule({

  imports: [
    DropdownModule,
    FileUploadModule,
    CommonModule,
    AppGeneralDataRoutingModule,
    AppCommonModule,
    DataTableModule,
    SharedModule ,
    PanelModule ,
    ButtonModule ,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    TabViewModule,
    GrowlModule,
    RegisterTranslatorModule(false),
    AppSharedModule
  ],
  declarations: [
    CitiesComponent,
    CompanyDataComponent,
    CountriesComponent,
    BasicDataComponent,
    LegalitiesComponent,
    ContactsDataComponent,
    BranchComponent,
    ReportsSettingComponent,
    AccountLinkComponent,
    AccountLinkDetailsComponent
  ],

  exports : [

  ],
  providers: [
    ConfirmationService
  ],
})
export class AppGeneralDataModule { }
