import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router } from '@angular/router';
import { AuthService } from '../shared/services/AuthService';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {
    if (!this.authService.IsAuthenticated) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    // if (this.authService.IsAuthenticated) {
    //   this.router.navigate(["/notFound"]);
    //   return false;
    // }
    return true;
  }

}
