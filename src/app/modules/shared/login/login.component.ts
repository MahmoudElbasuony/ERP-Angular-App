import { Subscription, BehaviorSubject } from 'rxjs/Rx';
import { Component, ViewEncapsulation, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SystemServiceService } from '../../../system-service.service';
import { Router } from '@angular/router';
import * as user from '../models/User';
import { LogService, LogLevel } from '../services/LogService';
import { Response, Http } from '@angular/http';
import { User } from '../models/User';
import { AuthService } from '../services/AuthService';
import { HttpResponse } from '@angular/common/http';
import { window } from 'rxjs/operators/window';
import { _localeFactory } from '@angular/core/src/application_module';
import { LanguageService } from '../services/LanguageService';
import { ElementRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { ApplicationRef } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: []
})
export class LoginComponent implements OnDestroy, OnInit {


  private User: User;

  private _window: any = window;

  private IsForgotPassword: boolean;

  private Rememberme = false;

  private InProgress: boolean;


  @ViewChild("email")
  private ForgotPasswordEmail: ElementRef;


  @ViewChild("emailerror")
  private ForgotPasswordEmailError: ElementRef;


  constructor(private appRef:ApplicationRef,private systemService: SystemServiceService,
    private router: Router, private toaster: LogService,
    private authService: AuthService, private langService: LanguageService) {

    this.User = new User();

  }

  ngOnInit(): void {
    if (this.authService.IsAuthenticated) {

      this.router.navigate(["dashboard"]);

    }

  }


  login() {

    this.authService.Login(this.User, this.Rememberme, (resp) => {

      this.toaster.pop(LogLevel.Info, "welcome");

      this.router.navigate(["/dashboard"]);

      this.appRef.tick();
      //location.reload();


    },
      (error) => {
        console.log(error);
      });

  }




  forgotPasswordLinkClick() {


    if (this.ForgotPasswordEmail && this.ForgotPasswordEmailError) {
      let email = <HTMLInputElement>(this.ForgotPasswordEmail.nativeElement);
      let emailError = <HTMLSpanElement>(this.ForgotPasswordEmailError.nativeElement);
      emailError.hidden = true;
      email.value = "";
    }

    this.IsForgotPassword = !this.IsForgotPassword;



  }

  onForgotPassword() {


    // validate input
    let email = <HTMLInputElement>(this.ForgotPasswordEmail.nativeElement);
    let emailError = <HTMLSpanElement>(this.ForgotPasswordEmailError.nativeElement);

    let email_text = email.value;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email_text || !email_text.trim() || !re.test(email_text)) {
      emailError.style.display = "block";
      email.value = "";
      email.focus();
      return;
    }
    else
      emailError.style.display = "none";



    // start process


    this.InProgress = true;

    this.authService.ForgotPassword(email_text, () => {

      this.toaster.pop(LogLevel.Success, "We sent you an email please check your inbox");

      this.InProgress = false;

      this.forgotPasswordLinkClick();

    }, (error) => {

      this.toaster.pop(LogLevel.Error, error);

      this.InProgress = false;

    });




  }

  ngOnDestroy(): void {



  }
}
