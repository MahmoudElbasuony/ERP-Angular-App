import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardDirective } from './directives/authguard.directive';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterTranslatorModule } from './services/LanguageService';
import { TdValidationSummaryComponent } from './validation/td-validation-summary/td-validation-summary.component';
import { RdValidationSummaryComponent } from './validation/rd-validation-summary/rd-validation-summary.component';

@NgModule({
  declarations: [
    AuthGuardDirective,
    UnauthorizedComponent,
    NotfoundComponent,
    TdValidationSummaryComponent,
    RdValidationSummaryComponent
  ],
  imports: [
    CommonModule,
    RegisterTranslatorModule(false)
  ],
  exports: [
    AuthGuardDirective,
    TdValidationSummaryComponent,
    RdValidationSummaryComponent
  ],
  providers: [],
})
export class AppSharedModule { }
