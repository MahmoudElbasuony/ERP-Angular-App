import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LanguageService } from '../../../shared/services/LanguageService';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {



  constructor(private langService:LanguageService) {
      

  }

  ngOnInit() {

  }

}
