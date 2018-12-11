import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppCommonModule } from './modules/common/app-common.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/shared/header/header.component';
import { NavComponent } from './modules/shared/nav/nav.component';
import { LoginComponent } from './modules/shared/login/login.component';
import { AuthGuard } from './modules/common/auth.guard';
import { LogService } from './modules/shared/services/LogService';
import { SystemServiceService } from './system-service.service';
import { LocalStorageService } from './modules/shared/services/LocalStorageService';
import { AuthService } from './modules/shared/services/AuthService';
import { NgModule, Renderer, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageService, RegisterTranslatorModule } from './modules/shared/services/LanguageService';
import { DataTableModule, SharedModule, TieredMenuModule } from 'primeng/primeng';
import { RequestInterceptorService } from './modules/shared/services/RequestInterceptor';
import { ResetPasswordComponent } from './modules/shared/reset-password/reset-password.component';
import { LoaderComponent } from './modules/shared/loader/loader.component';
import { LoaderService } from './modules/shared/loader/loader.service';
import { GroupPermissionRepository } from './modules/shared/repos/GroupPermissionRepository';
import { AuthGuardDirective } from './modules/shared/directives/authguard.directive';
import { AppSharedModule } from './modules/shared/Shared.module';

const RegisterTranslator = RegisterTranslatorModule(true);

@NgModule({
  declarations: [
    AppComponent, HeaderComponent,
    NavComponent, LoginComponent,
    ResetPasswordComponent,
    LoaderComponent
  ],

  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule,
    HttpClientModule, AppCommonModule, AppRoutingModule,
    BrowserAnimationsModule,
    ToasterModule,
    TieredMenuModule,
    RegisterTranslator,
    AppSharedModule
  ],

  bootstrap: [AppComponent],
  providers: [
    LoaderService,
    ToasterModule, ToasterService, AuthGuard,
    LogService, SystemServiceService,
    LocalStorageService,
    GroupPermissionRepository,
    AuthService, LanguageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true,
    }
  ]
})
export class AppModule { }







