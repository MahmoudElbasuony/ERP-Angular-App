import { LogService } from './LogService';
import { User, LogLevel } from '../models/User';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { Injectable, Inject } from '@angular/core';
import { LocalStorageService, LocalStorageDataType } from './LocalStorageService';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BaseUrl } from '../urls/url-helper';
import { GroupPermissionRepository } from '../repos/GroupPermissionRepository';
import { Permission } from '../models/Permission';
import { TreeNode } from 'primeng/primeng';
import { LoaderService } from '../loader/loader.service';
import { Observer } from 'rxjs/Observer';
import { Router } from '@angular/router';

export class AuthTokenReponse {
  public access_token: string;
  public expires_in: string;
  public token_type: string;
}

@Injectable()
export class AuthService {



  private _PermissionTree: TreeNode[];

  public PermssionListAsObservable: Observable<any>;// [{CanView,CanEdit,PagePath,..etc}]

  public PermisionList: any[];

  private _PermissionsObserver: Observer<any>;

  public get PermissionTree() {
    return this._PermissionTree;
  }
  public set PermissionTree(val) {
    this._PermissionTree = val;
  }

  private _remember: boolean;

  get RememberMe() {
    return this._remember;
  }

  set RememberMe(val) {
    this._remember = val;
  }

  private _User: User;

  get User() {
    return this._User || this.localStorageService.LoadFromLocalStorage(LocalStorageDataType.UserInfo, this.RememberMe);
  }

  set User(user: User) {
    this._User = user;
    this.localStorageService.AddToLocalStorage(user, LocalStorageDataType.UserInfo, this.RememberMe);
  }


  constructor(private localStorageService: LocalStorageService, private http: HttpClient,
    private toaster: LogService, private loader: LoaderService, private permissionGroupRep: GroupPermissionRepository
    , private router: Router) {

    this.PermssionListAsObservable = new Observable((observer) => this._PermissionsObserver = observer).share();

    this.PermissionTree = [];
    let remember_from_strage = localStorageService.LoadFromLocalStorage(LocalStorageDataType.Remember, this.RememberMe);
    this.RememberMe = remember_from_strage && remember_from_strage === "true" ? true : false;




  }


  // return token container object from local storage
  private get TokenContainer(): AuthTokenReponse {
    return this.localStorageService.LoadFromLocalStorage(LocalStorageDataType.AuthToken, this.RememberMe);
  }



  // indicates if there is any token in localstorage
  // Note : Even if there is a token in localstorgae it may be expired
  // ang that  will be discovered when making any request with a service
  // unauthorized reponse will be returned when expired
  public get IsAuthenticated(): boolean {

    return this.TokenContainer && this.TokenContainer.access_token ? true : false;
    //return true;
  }


  // return token from storage in form : "Bearer xxxxxx"
  public get AuthTokenAsHeader(): string | null {
    return this.TokenContainer ? "Bearer " + this.TokenContainer.access_token : null;
  }




  /**
   * Authenticate Used to log the user in system and return token as reponse
   * which will be saved in localstorage
   */
  public Login(user: User, rememberMe: boolean, successCallback: Function, errorCallback: Function) {

    this.RememberMe = rememberMe;

    let headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };

    let login_observable = this.http.post(`${BaseUrl}api/token`, "UserName=" + user.Email + "&Password=" + user.Password + "&grant_type=password", { headers, observe: "response" });

    login_observable.subscribe((resp: HttpResponse<AuthTokenReponse>) => {

      if (resp.ok) {

        // before new login capture what last language used before last logout
        let last_lang = this.localStorageService.LoadFromLocalStorage(LocalStorageDataType.Language, true);
        last_lang = last_lang || this.localStorageService.LoadFromLocalStorage(LocalStorageDataType.Language, false);

        // clear storage based on remember me flag
        // eg: is rememberme =true then persistence storage
        // will be used so any thing in temp storage must be deleted
        // and vice versa
        if (this.RememberMe)
          this.localStorageService.ClearStorage(false, false);
        else
          this.localStorageService.ClearStorage(false, true);

        // set last used language as language will be used after successfull login
        this.localStorageService.AddToLocalStorage(last_lang, LocalStorageDataType.Language, this.RememberMe);

        // store token in storage
        this.localStorageService.AddToLocalStorage(resp.body, LocalStorageDataType.AuthToken, this.RememberMe);


        // set current user info
        let _user = new User();
        _user.Email = user.Email;
        _user.Name = user.Email;
        this.User = _user;

        if (successCallback) successCallback(resp);


        this.LoadPermissionTree(null, () => {

          this.Logout();
        });

      }

    }, (error: HttpErrorResponse) => {
      if (errorCallback) errorCallback(error);
      this.handleError(error);
    });

  }

  private BuildPermissionList(tree: TreeNode[]) {
    let list = [];
    for (let node of tree) {
      list.push(node.data);
      let sub_list = this.BuildPermissionList(node.children);
      if (sub_list.length > 0)
        list.push(...sub_list);
    }
    return list;
  }

  public LoadPermissionTree(successCallback?: (perms: TreeNode) => void, errorCallback?: (e: string) => void) {

    this.loader.Show();

    this.permissionGroupRep.getAll().subscribe((pers: any) => {

      this.PermissionTree = pers;

      this.PermisionList = this.BuildPermissionList(this.PermissionTree);
      this._PermissionsObserver.next(this.PermisionList);


      if (successCallback) successCallback(pers);
    },
      (error: HttpErrorResponse) => {
        if (errorCallback) errorCallback(error.error);
      });
  }


  public OnDeletePageFromPermissions() {
       this.LoadPermissionTree();
  }

  /**
   * Logout the user and clear local storage tokens
   */
  public Logout() {

    this.PermissionTree = [];
    this.localStorageService.DestroyUserData(this.RememberMe);
    this.router.navigate(["login"]);

  }






  public ForgotPassword(email: string, onSuccessCallback, onFailureCallback) {
    return this.http.post(BaseUrl + "forgotpassword", { Email: email }, { observe: "response" })
      .subscribe((resp: HttpResponse<any>) => {


        if (resp.ok) {

          if (onSuccessCallback) onSuccessCallback(resp);

        }



      }, (error: HttpErrorResponse) => {



        if (onFailureCallback) onFailureCallback(error.statusText);


      });
  }



  public ResetPassword(code: string, new_password: string, onSuccessCallback: Function, onFailureCallback: Function) {

    this.http.post(BaseUrl + "resetpassword", { ResetCode: code, NewPassword: new_password }, { observe: "response" })
      .subscribe((resp: HttpResponse<any>) => {

        if (resp.ok) {



          if (onSuccessCallback)
            onSuccessCallback(resp);

        }

      }, (error: HttpErrorResponse) => {

        if (onFailureCallback) onFailureCallback(error.statusText);

      });
  }



  private handleError(errorResponse: HttpErrorResponse) {



    let message = errorResponse.error.ResponseStatus ? errorResponse.error.ResponseStatus.Message : errorResponse.message;

    this.toaster.pop(LogLevel.Error, message);

    return Observable.throw(message);

  }


}



