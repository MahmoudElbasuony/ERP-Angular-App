import { FinancialYearsComponent } from './components/financial-years/financial-years.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { CostCentersComponent } from './components/cost-centers/cost-centers.component';
import { SafesComponent } from './components/safes/safes.component';
import { AccountTreeComponent } from './components/account-tree/account-tree.component';
import { AccountTreePermissionsComponent } from './components/account-tree-permissions/account-tree-permissions.component';
import { JournalsComponent } from './components/journals/journals.component';
import { BanksDataComponent } from './components/banks-data/banks-data.component';
import { FinalAccountSettingComponent } from './components/final-account-setting/final-account-setting.component';
import { SafesPermissionsComponent } from './components/safes-permissions/safes-permissions.component';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AccountingChartComponent } from './components/accounting-chart/accounting-chart.component';
import { SubsidiaryJournalComponent } from './components/subsidiary-journals/subsidiary-journal.component';


const AccountingRoutes: Routes = [

  {
    path: 'financialYears',
    component: FinancialYearsComponent
  },
  {
    path: 'currencies',
    component: CurrenciesComponent
  },
  {
    path: 'costCenters',
    component: CostCentersComponent
  },
  {
    path: 'subsidiaryJournals',
    component: SubsidiaryJournalComponent
  },
  {

    path: 'safes',
    component: SafesComponent
  }
  ,
  {
    path: 'accountTree',
    component: AccountTreeComponent
  }
  ,
  {
    path: 'accountTreePermissions',
    component: AccountTreePermissionsComponent
  }
  ,
  {
    path: 'accountingChart',
    component: AccountingChartComponent
  },
  {
    path: 'journals',
    component: JournalsComponent
  }
  ,
  {
    path: 'banksData',
    component: BanksDataComponent
  }
  ,
  {
    path: 'finalAccountSetting',
    component: FinalAccountSettingComponent
  }
  ,
  {
    path: 'safesPermissions',
    component: SafesPermissionsComponent
  }
  ,
  {
    path: 'financialYears',
    component: FinancialYearsComponent
  },
  {
    path : '',
    redirectTo : "/accounting/financialYears" ,
    pathMatch : "full"
  }

];


@NgModule({
  imports: [
    RouterModule.forChild(AccountingRoutes)
  ],
  exports: [RouterModule]
})

export class AppAccountingRoutingModule { }
