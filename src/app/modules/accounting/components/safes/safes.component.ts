import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../shared/services/LanguageService';

@Component({
  selector: 'app-safes',
  templateUrl: './safes.component.html',
  styleUrls: ['./safes.component.css']
})
export class SafesComponent implements OnInit {

  constructor(private langService:LanguageService) { }

  ngOnInit() {
  }

}
