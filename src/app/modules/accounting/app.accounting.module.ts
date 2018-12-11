import { JouranlDetailsComponent } from './components/journals/jouranl-details/jouranl-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LanguageService, RegisterTranslatorModule } from '../shared/services/LanguageService';
import { AppAccountingRoutingModule } from './app-accounting-routing.module';
import { FinancialYearsComponent } from './components/financial-years/financial-years.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { CostCentersComponent } from './components/cost-centers/cost-centers.component';
import { SafesComponent } from './components/safes/safes.component';
import { SafesPermissionsComponent } from './components/safes-permissions/safes-permissions.component';
import { AccountTreeComponent } from './components/account-tree/account-tree.component';
import { AccountTreePermissionsComponent } from './components/account-tree-permissions/account-tree-permissions.component';
import { JournalsComponent } from './components/journals/journals.component';
import { BanksDataComponent } from './components/banks-data/banks-data.component';
import { FinalAccountSettingComponent } from './components/final-account-setting/final-account-setting.component';
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { AccountingChartComponent } from './components/accounting-chart/accounting-chart.component';
import { AppCommonModule } from '../common/app-common.module';
import { AuthGuardDirective } from '../shared/directives/authguard.directive';
import { AppSharedModule } from '../shared/Shared.module';

import {
  DataTableModule, ContextMenuModule, SharedModule, CheckboxModule, PanelModule, ButtonModule, CalendarModule,
  TreeTableModule, TreeModule, TreeNode, DialogModule, ConfirmDialogModule, FileUploadModule, SelectItem, TabViewModule, DropdownModule
} from 'primeng/primeng';
import { SubsidiaryJournalComponent } from './components/subsidiary-journals/subsidiary-journal.component';

@NgModule({
  imports: [
    CheckboxModule,
    CommonModule,
    TreeTableModule,
    TreeModule,
    AppAccountingRoutingModule,
    AppCommonModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    FileUploadModule,
    CommonModule,
    AppCommonModule,
    DataTableModule, SharedModule, ContextMenuModule,
    PanelModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ConfirmDialogModule,
    TabViewModule,
    RegisterTranslatorModule(false),
    AppSharedModule

  ],
  declarations: [
    JouranlDetailsComponent,
    FinancialYearsComponent,
    CurrenciesComponent,
    CostCentersComponent,
    SafesComponent,
    SafesPermissionsComponent,
    AccountTreeComponent,
    AccountTreePermissionsComponent,
    JournalsComponent,
    BanksDataComponent,
    FinalAccountSettingComponent,
    AccountingChartComponent,
    SubsidiaryJournalComponent,

  ],

  providers: [

  ]
})
export class AppAccountingModule { }

