import { Component, ViewEncapsulation, SimpleChanges, OnInit } from '@angular/core';
import { SystemServiceService } from '../../../system-service.service';
import { OnChanges, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Input } from '@angular/core';
import { LanguageService } from '../services/LanguageService';
import { AuthService } from '../services/AuthService';
import { Permission } from '../models/Permission';
import { Observable } from 'rxjs/Observable';
import { TreeNode, MenuItem } from 'primeng/primeng';
import { Router } from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent  {




  isLoggedIn: boolean;






  constructor(private systemService: SystemServiceService, private langService: LanguageService
    , private authService: AuthService, private router: Router) {


    this.systemService.showNavBarEmitter.subscribe((mode) => {
      this.isLoggedIn = mode;
    });


  }
















}
