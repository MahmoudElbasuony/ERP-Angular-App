import { AuthService } from './../services/AuthService';
import { Component, ViewEncapsulation } from '@angular/core';
import { SystemServiceService } from '../../../system-service.service';
import { Router } from '@angular/router';
import { LanguageService } from '../services/LanguageService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

  isLoggedIn: boolean;

  constructor(private systemService: SystemServiceService, private AuthService: AuthService, private router: Router
    ,private langService:LanguageService) {
    this.systemService.showNavBarEmitter.subscribe((mode) => {
      this.isLoggedIn = mode;
    });
  }


  Logout() {
    this.AuthService.Logout();
    this.router.navigate(["login"]);
  }

  get User(){
    return this.AuthService.User;
  }



}
