import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/shared/services/AuthService';
import { LanguageService } from './modules/shared/services/LanguageService';
import $ from "jquery";
import { LoaderService } from './modules/shared/loader/loader.service';
import { AfterViewInit } from '@angular/core';
import { Router, RouteConfigLoadEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {



  title = 'app';

  ShowLoader: boolean;

  constructor(private LoaderService: LoaderService, private AuthService: AuthService, private langService: LanguageService
    , private router: Router) {


  }



  get IsAuthenticated(): boolean {
    return this.AuthService.IsAuthenticated;
  }

  ngOnInit(): void {
    this.InitDom();

  }



  ngAfterViewInit(): void {

    if (this.IsAuthenticated) {

      this.LoaderService.Show();
      this.AuthService.LoadPermissionTree();
    }

  }




  private InitDom() {
    $(() => {

      if (this.langService.IsEnglish) $("body").attr("dir", "ltr");
      else $("body").attr("dir", "rtl");

    });
  }

}
