import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Response, Jsonp, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import * as log from './modules/shared/services/LogService';
import { LogLevel } from './modules/shared/services/LogService';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './modules/shared/services/AuthService';
import { BaseUrl } from './modules/shared/urls/url-helper';


@Injectable()
export class SystemServiceService {
  private _showNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showNavBarEmitter: Observable<boolean> = this._showNavBar.asObservable();

  private apiEndpoint;
  headers: HttpHeaders;
  authTocken: string;



  showNavBar(ifShow: boolean) {
    this._showNavBar.next(ifShow);
  }
  //**************** */

  constructor(private http: HttpClient, private logger: log.LogService) {
    this.apiEndpoint = BaseUrl;
  }

  getAll(controllerName: string, first?: number, rows?: number): Observable<any> {
    let controllerUrl = this.apiEndpoint + controllerName;
    return this.http.get(`${controllerUrl}${Number.isInteger(first) && Number.isInteger(rows) ? `?First=${first}&Rows=${rows}` : ''}`, { observe: 'response' })
      .map(response => {
        if (response != null) {
          return response.body;
        }
      })
      .catch((error) => {
        return this.handleError(error);
      });
  }

  get(controllerName: string, id: string): Observable<any> {
    let controllerUrl = this.apiEndpoint + controllerName + '/' + id;
    return this.http.get(controllerUrl, { observe: 'response' })
      .map(response => {
        if (response != null) {
          return response.body;
        }
      })
      .catch((error) => {
        return this.handleError(error);
      });
  }

  delete(controllerName: string, id: string): Observable<any> {
    let controllerUrl = this.apiEndpoint + controllerName + '/' + id;
    return this.http.delete(controllerUrl, { observe: 'response' })
      .map(response => {
        if (response != null) {
          this.logger.pop(LogLevel.Success, "Deleting Done Successfully");
          return response.body;
        }
      })
      .catch((error) => {
        return this.handleError(error);
      });
  }

  post(controllerName: string, value: any): Observable<any> {
    let controllerUrl = this.apiEndpoint + controllerName;
    return this.http.post(controllerUrl, value, { observe: 'response' })
      .map(response => {
        if (response.ok) {
          this.logger.pop(LogLevel.Success, "Adding Done Successfully");
          return response.body;

        }

      })
      .catch((error) => {
        return this.handleError(error);
      });
  }

  update(controllerName: string, value: any): Observable<any> {
    let controllerUrl = this.apiEndpoint + controllerName;
    return this.http.put(controllerUrl, value, { observe: 'response' }).
      map(response => {
        if (response.ok) {
          this.logger.pop(LogLevel.Success, "Edit Done Successfully");
          return response.body;
        }
      })
      .catch((error) => {
        return this.handleError(error);
      });
  }

  private handleError(error: HttpErrorResponse) {
    let message = (error.message);
    this.logger.pop(LogLevel.Error, message);
    return Observable.throw(message);
  }
}
