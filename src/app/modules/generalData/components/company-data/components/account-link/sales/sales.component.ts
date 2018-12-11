import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'app-accountlink-sales',
  templateUrl: 'sales.component.html',
  styleUrls: ['sales.component.css']
})
export class SalesComponent {


  salesForm: FormGroup;




  constructor(private fb: FormBuilder) {
    this.InitForm();
  }


  private InitForm() {
    this.salesForm = this.fb.group({
      "Field1": ["", Validators.required]
    });
  }
}
