var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
(function (LocalStorageDataType) {
    LocalStorageDataType[LocalStorageDataType["AuthToken"] = "AuthToken"] = "AuthToken";
    LocalStorageDataType[LocalStorageDataType["Language"] = "Language"] = "Language";
    LocalStorageDataType[LocalStorageDataType["UserInfo"] = "UserInfo"] = "UserInfo";
    LocalStorageDataType[LocalStorageDataType["Remember"] = "Remember"] = "Remember";
    LocalStorageDataType[LocalStorageDataType["Countries"] = "Countries"] = "Countries";
})(exports.LocalStorageDataType || (exports.LocalStorageDataType = {}));
var LocalStorageDataType = exports.LocalStorageDataType;
var LocalStorageService = (function () {
    function LocalStorageService() {
        this.tempStorage = new TempStorage("TempStorage");
    }
    /**
     * AddToLocalStorage used to store data into local browser storage
     */
    LocalStorageService.prototype.AddToLocalStorage = function (Value, localStorageDataType, IsPersisted) {
        if (!Value) {
            throw new Error("Can't store empty value in localstorage ");
        }
        switch (localStorageDataType) {
            case LocalStorageDataType.AuthToken:
                this.StoreAuthToken(Value, IsPersisted);
                break;
            case LocalStorageDataType.Language:
                this.StoreLanguage(Value, IsPersisted);
                break;
            case LocalStorageDataType.UserInfo:
                this.StoreUserInfo(Value, IsPersisted);
                break;
        }
    };
    /**
     * LoadFromLocalStorage used to get piece of data from localstorage
     */
    LocalStorageService.prototype.LoadFromLocalStorage = function (localStorageDataType, IsPersistent) {
        switch (localStorageDataType) {
            case LocalStorageDataType.AuthToken: return this.LoadAuthToken(IsPersistent);
            case LocalStorageDataType.Language: return this.LoadLanguage(IsPersistent);
            case LocalStorageDataType.UserInfo: return this.LoadUserInfo(IsPersistent);
            case LocalStorageDataType.Remember: return this.LoadRememberMe();
        }
        return null;
    };
    /**
     * Clear Item From Localstorage based on type
     */
    LocalStorageService.prototype.DeleteItem = function (localStorageDataType, IsPersistent) {
        switch (localStorageDataType) {
            case LocalStorageDataType.AuthToken:
                this.DeleteAuthTokenContainer(IsPersistent);
                break;
            case LocalStorageDataType.Language:
                this.DeleteLanguageEntry(IsPersistent);
                break;
            case LocalStorageDataType.UserInfo:
                this.DeleteUserInfo(IsPersistent);
                break;
        }
    };
    LocalStorageService.prototype.ClearStorage = function (FullClear, IsPersisted) {
        if (FullClear === void 0) { FullClear = false; }
        if (IsPersisted === void 0) { IsPersisted = false; }
        if (FullClear) {
            localStorage.clear();
            this.tempStorage.clear();
            return;
        }
        if (IsPersisted)
            localStorage.clear();
        else
            this.tempStorage.clear();
    };
    LocalStorageService.prototype.DestroyUserData = function (IsPersistent) {
        // delete token from storage so user will be unauthenticated
        this.DeleteItem(LocalStorageDataType.AuthToken, IsPersistent);
        // and delete  any stored info about user
        this.DeleteItem(LocalStorageDataType.UserInfo, IsPersistent);
        if (IsPersistent)
            localStorage.removeItem(LocalStorageDataType.Remember);
        else
            this.tempStorage.removeItem(LocalStorageDataType.Remember);
    };
    // delete token container from local storage
    LocalStorageService.prototype.DeleteAuthTokenContainer = function (IsPersistent) {
        if (IsPersistent)
            localStorage.removeItem(LocalStorageDataType.AuthToken);
        else
            this.tempStorage.removeItem(LocalStorageDataType.AuthToken);
    };
    // delete token container from local storage
    LocalStorageService.prototype.DeleteLanguageEntry = function (IsPersistent) {
        if (IsPersistent)
            localStorage.removeItem(LocalStorageDataType.Language);
        else
            this.tempStorage.removeItem(LocalStorageDataType.Language);
    };
    // delete user info from storage
    LocalStorageService.prototype.DeleteUserInfo = function (IsPersistent) {
        if (IsPersistent)
            localStorage.removeItem(LocalStorageDataType.UserInfo);
        else
            this.tempStorage.removeItem(LocalStorageDataType.UserInfo);
    };
    // save token in localstorage as string
    LocalStorageService.prototype.LoadAuthToken = function (IsPersistent) {
        var result = null;
        if (IsPersistent) {
            result = localStorage.getItem(LocalStorageDataType.AuthToken);
            return result ? JSON.parse(result) : null;
        }
        else {
            result = this.tempStorage.getItem(LocalStorageDataType.AuthToken);
            return result ? JSON.parse(result) : null;
        }
    };
    // save language in localstorage
    LocalStorageService.prototype.StoreLanguage = function (lang, IsPersisted) {
        if (IsPersisted)
            localStorage.setItem(LocalStorageDataType.Language, lang);
        else
            this.tempStorage.setItem(LocalStorageDataType.Language, lang);
    };
    // load language in localstorage
    LocalStorageService.prototype.LoadLanguage = function (IsPersistent) {
        if (IsPersistent)
            return localStorage.getItem(LocalStorageDataType.Language);
        else
            return this.tempStorage.getItem(LocalStorageDataType.Language);
    };
    LocalStorageService.prototype.LoadRememberMe = function () {
        return localStorage.getItem(LocalStorageDataType.Remember) || this.tempStorage.getItem(LocalStorageDataType.Remember);
    };
    // save token in localstorage as string
    LocalStorageService.prototype.StoreAuthToken = function (token, IsPersisted) {
        if (IsPersisted) {
            localStorage.setItem(LocalStorageDataType.AuthToken, JSON.stringify(token));
            localStorage.setItem(LocalStorageDataType.Remember, IsPersisted + "");
        }
        else {
            this.tempStorage.setItem(LocalStorageDataType.AuthToken, JSON.stringify(token));
            this.tempStorage.setItem(LocalStorageDataType.Remember, IsPersisted + "");
        }
    };
    LocalStorageService.prototype.StoreUserInfo = function (user, IsPersisted) {
        if (IsPersisted)
            localStorage.setItem(LocalStorageDataType.UserInfo, JSON.stringify(user));
        else
            this.tempStorage.setItem(LocalStorageDataType.UserInfo, JSON.stringify(user));
    };
    LocalStorageService.prototype.LoadUserInfo = function (IsPersisted) {
        var result = null;
        if (IsPersisted) {
            result = localStorage.getItem(LocalStorageDataType.UserInfo);
            return JSON.parse(result || "{}");
        }
        else {
            result = this.tempStorage.getItem(LocalStorageDataType.UserInfo);
            return JSON.parse(result || "{}");
        }
    };
    LocalStorageService = __decorate([
        core_1.Injectable()
    ], LocalStorageService);
    return LocalStorageService;
})();
exports.LocalStorageService = LocalStorageService;
var TempStorage = (function () {
    function TempStorage(StorageName) {
        this.readonly = TempStorageName;
        this.TempStorageName = StorageName;
        // initiate a cookie as temp storage
        if (!this.GetTempStorage())
            document.cookie = this.TempStorageName + "=" + JSON.stringify({}) + ";path=/";
    }
    TempStorage.prototype.setItem = function (name, value) {
        var temp_storage = this.GetTempStorage();
        temp_storage[name] = value;
        document.cookie = this.TempStorageName + "=" + JSON.stringify(temp_storage) + ";path=/";
    };
    TempStorage.prototype.getItem = function (name) {
        var temp_object = this.GetTempStorage() || {};
        return temp_object[name];
    };
    TempStorage.prototype.removeItem = function (name) {
        var temp_object = this.GetTempStorage() || {};
        delete temp_object[name];
        document.cookie = this.TempStorageName + "=" + JSON.stringify(temp_object) + ";path=/";
    };
    TempStorage.prototype.clear = function () {
        document.cookie = this.TempStorageName + "=" + JSON.stringify({}) + ";path=/";
    };
    TempStorage.prototype.GetTempStorage = function () {
        var nameEQ = this.TempStorageName + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                var match = c.substring(nameEQ.length, c.length);
                return match ? JSON.parse(match) : null;
            }
        }
        return null;
    };
    return TempStorage;
})();
