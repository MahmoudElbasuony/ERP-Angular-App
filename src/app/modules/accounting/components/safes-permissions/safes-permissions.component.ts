import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../shared/services/LanguageService';

@Component({
  selector: 'app-safes-permissions',
  templateUrl: './safes-permissions.component.html',
  styleUrls: ['./safes-permissions.component.css']
})
export class SafesPermissionsComponent implements OnInit {

  constructor(private langService:LanguageService) { }

  ngOnInit() {
  }

}
