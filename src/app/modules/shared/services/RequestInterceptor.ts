import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpSentEvent, HttpProgressEvent } from '@angular/common/http';
import { HttpRequest, HttpHandler, HttpHeaderResponse, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './AuthService';
import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../loader/loader.service';
import { HttpEventType } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

  constructor(private current_path: ActivatedRoute, private LoaderService: LoaderService, private injector: Injector, private router: Router) {



  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse
    | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {




    let authService = <AuthService>this.injector.get(AuthService);


    //  before request sent
    let new_req = authService.AuthTokenAsHeader ? req.clone({
      headers: req.headers.set('Authorization', authService.AuthTokenAsHeader)
        .set('Accept', "application/json")

    }) : req;

    this.LoaderService.Show();

    return next.handle(new_req).do((event) => {
      if (event.type === HttpEventType.Response) {
        this.LoaderService.Hide();
      }


    },
      (error: HttpErrorResponse) => {
        this.LoaderService.Hide();
        if (error.status === 406) {
          //authService.Logout();
          this.router.navigate(["unauthorized"]);
        }
        else if(error.status === 401){
          authService.Logout();
        }
        else if (error.status === 404) {
          //authService.Logout();
          this.router.navigate(["notfound"]);
        }

      }
    );
  }

}
