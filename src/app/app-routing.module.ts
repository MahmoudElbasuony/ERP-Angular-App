import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./modules/shared/login/login.component";
import { AppComponent } from './app.component';
import { AuthGuard } from './modules/common/auth.guard';
import { ResetPasswordComponent } from './modules/shared/reset-password/reset-password.component';
import { UnauthorizedComponent } from './modules/shared/unauthorized/unauthorized.component';
import { NotfoundComponent } from './modules/shared/notfound/notfound.component';


const appRoutes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'resetpassword',
    component: ResetPasswordComponent
  },
  {
    path: "notFound",
    component: NotfoundComponent
  },
  {
    path: "generalData",
    canActivate : [AuthGuard],
    loadChildren: "./modules/generalData/app.generalData.module#AppGeneralDataModule"
  },
  {
    canActivate : [AuthGuard],
    path: "accounting",
    loadChildren: "./modules/accounting/app.accounting.module#AppAccountingModule"
  },
  {
    path: 'unauthorized', component : UnauthorizedComponent
  },
  {
    path: '', redirectTo: "login", pathMatch: "full"
  }
  ,
  {
    path: '**',
    redirectTo: "/notFound",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
