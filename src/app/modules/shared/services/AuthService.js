var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var _this = this;
var User_1 = require('../models/User');
var Rx_1 = require('rxjs/Rx');
var core_1 = require('@angular/core');
var LocalStorageService_1 = require('./LocalStorageService');
var http_1 = require('@angular/common/http');
var url_helper_1 = require('../urls/url-helper');
var primeng_1 = require('primeng/primeng');
var AuthTokenReponse = (function () {
    function AuthTokenReponse() {
    }
    return AuthTokenReponse;
})();
exports.AuthTokenReponse = AuthTokenReponse;
var AuthService = (function () {
    function AuthService(localStorageService, http, toaster, loader, permissionGroupRep, router) {
        var _this = this;
        this.localStorageService = localStorageService;
        this.http = http;
        this.toaster = toaster;
        this.loader = loader;
        this.permissionGroupRep = permissionGroupRep;
        this.router = router;
        this.PermssionListAsObservable = new Rx_1.Observable(function (observer) { return _this._PermissionsObserver = observer; }).share();
        this.PermissionTree = [];
        var remember_from_strage = localStorageService.LoadFromLocalStorage(LocalStorageService_1.LocalStorageDataType.Remember, this.RememberMe);
        this.RememberMe = remember_from_strage && remember_from_strage === "true" ? true : false;
    }
    Object.defineProperty(AuthService.prototype, "PermissionTree", {
        get: function () {
            return this._PermissionTree;
        },
        set: function (val) {
            this._PermissionTree = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "RememberMe", {
        get: function () {
            return this._remember;
        },
        set: function (val) {
            this._remember = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "User", {
        get: function () {
            return this._User || this.localStorageService.LoadFromLocalStorage(LocalStorageService_1.LocalStorageDataType.UserInfo, this.RememberMe);
        },
        set: function (user) {
            this._User = user;
            this.localStorageService.AddToLocalStorage(user, LocalStorageService_1.LocalStorageDataType.UserInfo, this.RememberMe);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "TokenContainer", {
        // return token container object from local storage
        get: function () {
            return this.localStorageService.LoadFromLocalStorage(LocalStorageService_1.LocalStorageDataType.AuthToken, this.RememberMe);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "IsAuthenticated", {
        // indicates if there is any token in localstorage
        // Note : Even if there is a token in localstorgae it may be expired
        // ang that  will be discovered when making any request with a service
        // unauthorized reponse will be returned when expired
        get: function () {
            return this.TokenContainer && this.TokenContainer.access_token ? true : false;
            //return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "AuthTokenAsHeader", {
        // return token from storage in form : "Bearer xxxxxx"
        get: function () { },
        enumerable: true,
        configurable: true
    });
    AuthService = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
})();
exports.AuthService = AuthService;
null;
{
    return this.TokenContainer ? "Bearer " + this.TokenContainer.access_token : null;
}
Login(user, User_1.User, rememberMe, boolean, successCallback, Function, errorCallback, Function);
{
    this.RememberMe = rememberMe;
    var headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
    var login_observable = this.http.post(url_helper_1.BaseUrl + "api/token", "UserName=" + user.Email + "&Password=" + user.Password + "&grant_type=password", { headers: headers, observe: "response" });
    login_observable.subscribe(function (resp) {
        if (resp.ok) {
            // before new login capture what last language used before last logout
            var last_lang = _this.localStorageService.LoadFromLocalStorage(LocalStorageService_1.LocalStorageDataType.Language, true);
            last_lang = last_lang || _this.localStorageService.LoadFromLocalStorage(LocalStorageService_1.LocalStorageDataType.Language, false);
            // clear storage based on remember me flag
            // eg: is rememberme =true then persistence storage
            // will be used so any thing in temp storage must be deleted
            // and vice versa
            if (_this.RememberMe)
                _this.localStorageService.ClearStorage(false, false);
            else
                _this.localStorageService.ClearStorage(false, true);
            // set last used language as language will be used after successfull login
            _this.localStorageService.AddToLocalStorage(last_lang, LocalStorageService_1.LocalStorageDataType.Language, _this.RememberMe);
            // store token in storage
            _this.localStorageService.AddToLocalStorage(resp.body, LocalStorageService_1.LocalStorageDataType.AuthToken, _this.RememberMe);
            // set current user info
            var _user = new User_1.User();
            _user.Email = user.Email;
            _user.Name = user.Email;
            _this.User = _user;
            if (successCallback)
                successCallback(resp);
            _this.LoadPermissionTree(null, function () {
                _this.Logout();
            });
        }
    }, function (error) {
        if (errorCallback)
            errorCallback(error);
        _this.handleError(error);
    });
}
BuildPermissionList(tree, primeng_1.TreeNode[]);
{
    var list = [];
    for (var _i = 0; _i < tree.length; _i++) {
        var node = tree[_i];
        list.push(node.data);
        var sub_list = this.BuildPermissionList(node.children);
        if (sub_list.length > 0)
            list.push.apply(list, sub_list);
    }
    return list;
}
LoadPermissionTree(successCallback ?  : function (perms) { return void ; }, errorCallback ?  : function (e) { return void ; });
{
    this.loader.Show();
    this.permissionGroupRep.getAll().subscribe(function (pers) {
        _this.PermissionTree = pers;
        _this.PermisionList = _this.BuildPermissionList(_this.PermissionTree);
        _this._PermissionsObserver.next(_this.PermisionList);
        if (successCallback)
            successCallback(pers);
    }, function (error) {
        if (errorCallback)
            errorCallback(error.error);
    });
}
OnDeletePageFromPermissions();
{
    this.LoadPermissionTree();
}
Logout();
{
    this.PermissionTree = [];
    this.localStorageService.DestroyUserData(this.RememberMe);
    this.router.navigate(["login"]);
}
ForgotPassword(email, string, onSuccessCallback, onFailureCallback);
{
    return this.http.post(url_helper_1.BaseUrl + "forgotpassword", { Email: email }, { observe: "response" })
        .subscribe(function (resp) {
        if (resp.ok) {
            if (onSuccessCallback)
                onSuccessCallback(resp);
        }
    }, function (error) {
        if (onFailureCallback)
            onFailureCallback(error.statusText);
    });
}
ResetPassword(code, string, new_password, string, onSuccessCallback, Function, onFailureCallback, Function);
{
    this.http.post(url_helper_1.BaseUrl + "resetpassword", { ResetCode: code, NewPassword: new_password }, { observe: "response" })
        .subscribe(function (resp) {
        if (resp.ok) {
            if (onSuccessCallback)
                onSuccessCallback(resp);
        }
    }, function (error) {
        if (onFailureCallback)
            onFailureCallback(error.statusText);
    });
}
handleError(errorResponse, http_1.HttpErrorResponse);
{
    var message = errorResponse.error.ResponseStatus ? errorResponse.error.ResponseStatus.Message : errorResponse.message;
    this.toaster.pop(User_1.LogLevel.Error, message);
    return Observable.throw(message);
}
