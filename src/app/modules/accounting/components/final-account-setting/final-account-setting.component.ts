import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../shared/services/LanguageService';

@Component({
  selector: 'app-final-account-setting',
  templateUrl: './final-account-setting.component.html',
  styleUrls: ['./final-account-setting.component.css']
})
export class FinalAccountSettingComponent implements OnInit {

  constructor(private langService:LanguageService) { }

  ngOnInit() {
  }

}
