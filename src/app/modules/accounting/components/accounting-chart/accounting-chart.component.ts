import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LanguageService } from '../../../shared/services/LanguageService';

@Component({
  selector: 'app-accounting-chart',
  templateUrl: './accounting-chart.component.html',
  styleUrls: ['./accounting-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccountingChartComponent implements OnInit {

  constructor(private langService:LanguageService) { }

  ngOnInit() {
  }

}
