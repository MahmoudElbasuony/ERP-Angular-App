import { NgModule, Component } from '@angular/core';
import { ToasterModule, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'Toaster',
  template: `
            <toaster-container></toaster-container>
            <button (click)="popToast()">pop toast</button>`
})

export class Toaster {
  private toasterService: ToasterService;

  constructor(toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  popToast() {
    this.toasterService.pop('success', 'Args Title', 'Args Body');
  }
}
