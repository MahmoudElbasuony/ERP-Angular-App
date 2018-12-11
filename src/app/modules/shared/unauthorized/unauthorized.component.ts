import { Component } from '@angular/core';
import { LanguageService } from '../services/LanguageService';


@Component({
  moduleId: module.id,
  selector: 'unauthorized',
  templateUrl: 'unauthorized.component.html',
  styleUrls: ['unauthorized.component.css']
})
export class UnauthorizedComponent {


  constructor(private langService: LanguageService) {


  }
}
