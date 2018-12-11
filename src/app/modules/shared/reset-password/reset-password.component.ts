import { Component, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Toaster } from '../Toaster';
import { LogService } from '../services/LogService';
import { LogLevel } from '../models/User';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'app-reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['reset-password.component.css']
})
export class ResetPasswordComponent {

  private Code: string;
  private InProgress: boolean;
  ResetForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private toaster: LogService, private formBuilder: FormBuilder, private route: ActivatedRoute) {

    // intialize resting form
    this.ResetForm = formBuilder.group({
      "NewPassword": ["", [Validators.required]],
      "ConfirmNewPassword": ["", [Validators.required]]
    });

    // inspect reset code in url
    this.route.queryParamMap.subscribe(map => {
      this.Code = map.get("resetCode");
      if (!this.Code) this.router.navigate(["notFound"]);
    });
  }


  get IsConfirmedPasswordMatch() {
    if (this.ConfirmNewPassword && this.NewPassword && this.ConfirmNewPassword.value !== this.NewPassword.value)
      return false;
    else return true;
  }

  get NewPassword() {
    if (this.ResetForm)
      return this.ResetForm.get("NewPassword");
    return null;
  }

  get ConfirmNewPassword() {
    if (this.ResetForm)
      return this.ResetForm.get("ConfirmNewPassword");
    return null;
  }


  ResetPassword() {

    // indicates that reseting operating is working
    this.InProgress = true;

    // start reset password
    this.authService.ResetPassword(this.Code, this.NewPassword.value, () => {
      this.toaster.pop(LogLevel.Success, "Updated Password Successfully");
      this.router.navigate(["login"]);
      this.InProgress = false;
    },
      (error_message) => {
        this.toaster.pop(LogLevel.Error, error_message);
        this.InProgress = false;
      });

  }

}
