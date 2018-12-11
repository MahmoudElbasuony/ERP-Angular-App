import { Routes } from '@angular/router';
import { CitiesComponent } from './components/cities/cities.component';
import { CompanyDataComponent } from './components/company-data/company-data.component';
import { CountriesComponent } from './components/countries/countries.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountLinkComponent } from './components/company-data/components/account-link/account-link.component';


const AppGeneralDataRoutes: Routes = [

  {
    path: 'cities',
    component: CitiesComponent
  },
  {
    path: 'companyData',
    component: CompanyDataComponent
  },
  {
      path : 'accountsLink',
      component : AccountLinkComponent
  },
  {
    path: 'countries',
    component: CountriesComponent
  }
];

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AppGeneralDataRoutes)
  ],
  exports: [

  ],
  providers: [

  ],
})
export class AppGeneralDataRoutingModule {


}
