import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../shared/services/LanguageService';

@Component({
  selector: 'app-account-tree-permissions',
  templateUrl: './account-tree-permissions.component.html',
  styleUrls: ['./account-tree-permissions.component.css']
})
export class AccountTreePermissionsComponent implements OnInit {

  constructor(private langService:LanguageService) { }

  ngOnInit() {
  }

}
