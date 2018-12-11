import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LanguageService } from '../../services/LanguageService';

@Component({
  moduleId: module.id,
  selector: 'rd-validation-summary',
  templateUrl: 'rd-validation-summary.component.html',
  styleUrls: ['rd-validation-summary.component.css']
})
export class RdValidationSummaryComponent implements DoCheck {


  @Input()
  Form: FormGroup;

  @Input()
  ControlName: string;

  Errors: string[];

  constructor(private langService: LanguageService) {

  }

  ngDoCheck(): void {

    if (this.Form && this.ControlName) {

      this.Errors = [];

      const control = this.Form.get(this.ControlName);

      if (control && control.touched) {

        if (control.hasError("required") || (control.value && !control.value.trim())) {
          this.Errors.push(this.langService.IsEnglish ? "this field reuired" : "هذا الحقل مطلوب");
        } 


      }
    }

  }




}
