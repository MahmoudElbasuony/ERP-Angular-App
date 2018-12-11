import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

export enum LocalStorageDataType {
  AuthToken = "AuthToken",
  Language = "Language",
  UserInfo = "UserInfo",
  Remember = "Remember" , 
  Countries = "Countries" 
}

@Injectable()
export class LocalStorageService {


  private tempStorage: TempStorage;

  constructor() {
    this.tempStorage = new TempStorage("TempStorage");
  }

  /**
   * AddToLocalStorage used to store data into local browser storage
   */
  public AddToLocalStorage(Value: any, localStorageDataType: LocalStorageDataType, IsPersisted: boolean) {

    if (!Value) {
      throw new Error("Can't store empty value in localstorage ");
    }

    switch (localStorageDataType) {

      case LocalStorageDataType.AuthToken: this.StoreAuthToken(Value, IsPersisted); break;

      case LocalStorageDataType.Language: this.StoreLanguage(Value, IsPersisted); break;

      case LocalStorageDataType.UserInfo: this.StoreUserInfo(Value, IsPersisted); break;

    }
  }

  /**
   * LoadFromLocalStorage used to get piece of data from localstorage
   */
  public LoadFromLocalStorage(localStorageDataType: LocalStorageDataType, IsPersistent: boolean): any {




    switch (localStorageDataType) {

      case LocalStorageDataType.AuthToken: return this.LoadAuthToken(IsPersistent);

      case LocalStorageDataType.Language: return this.LoadLanguage(IsPersistent);

      case LocalStorageDataType.UserInfo: return this.LoadUserInfo(IsPersistent);

      case LocalStorageDataType.Remember: return this.LoadRememberMe();

    }

    return null;

  }


  /**
   * Clear Item From Localstorage based on type
   */
  public DeleteItem(localStorageDataType: LocalStorageDataType, IsPersistent: boolean) {
    switch (localStorageDataType) {
      case LocalStorageDataType.AuthToken: this.DeleteAuthTokenContainer(IsPersistent); break;
      case LocalStorageDataType.Language: this.DeleteLanguageEntry(IsPersistent); break;
      case LocalStorageDataType.UserInfo: this.DeleteUserInfo(IsPersistent); break;
    }
  }

  public ClearStorage(FullClear: boolean = false, IsPersisted: boolean = false) {
    if (FullClear) {
      localStorage.clear();
      this.tempStorage.clear();
      return;
    }
    if (IsPersisted) localStorage.clear();
    else this.tempStorage.clear();

  }

  public DestroyUserData(IsPersistent: boolean) {
    // delete token from storage so user will be unauthenticated
    this.DeleteItem(LocalStorageDataType.AuthToken, IsPersistent);

    // and delete  any stored info about user

    this.DeleteItem(LocalStorageDataType.UserInfo, IsPersistent);

    if (IsPersistent)
      localStorage.removeItem(LocalStorageDataType.Remember);
    else
      this.tempStorage.removeItem(LocalStorageDataType.Remember);


  }
  // delete token container from local storage
  private DeleteAuthTokenContainer(IsPersistent: boolean) {
    if (IsPersistent)
      localStorage.removeItem(LocalStorageDataType.AuthToken);
    else
      this.tempStorage.removeItem(LocalStorageDataType.AuthToken);
  }

  // delete token container from local storage
  private DeleteLanguageEntry(IsPersistent: boolean) {
    if (IsPersistent)
      localStorage.removeItem(LocalStorageDataType.Language);
    else
      this.tempStorage.removeItem(LocalStorageDataType.Language);
  }

  // delete user info from storage
  private DeleteUserInfo(IsPersistent: boolean) {
    if (IsPersistent)
      localStorage.removeItem(LocalStorageDataType.UserInfo);
    else
      this.tempStorage.removeItem(LocalStorageDataType.UserInfo);
  }


  // save token in localstorage as string
  private LoadAuthToken(IsPersistent: boolean): any {
    let result = null;
    if (IsPersistent) {
      result = localStorage.getItem(LocalStorageDataType.AuthToken);
      return result ? JSON.parse(result) : null;
    }
    else {
      result = this.tempStorage.getItem(LocalStorageDataType.AuthToken);
      return result ? JSON.parse(result) : null;
    }
  }

  // save language in localstorage
  private StoreLanguage(lang: string, IsPersisted: boolean) {
    if (IsPersisted)
      localStorage.setItem(LocalStorageDataType.Language, lang);
    else
      this.tempStorage.setItem(LocalStorageDataType.Language, lang);
  }

  // load language in localstorage
  private LoadLanguage(IsPersistent: boolean): string {
    if (IsPersistent)
      return localStorage.getItem(LocalStorageDataType.Language);
    else
      return this.tempStorage.getItem(LocalStorageDataType.Language);
  }

  private LoadRememberMe() {
    return localStorage.getItem(LocalStorageDataType.Remember) || this.tempStorage.getItem(LocalStorageDataType.Remember);
  }

  // save token in localstorage as string
  private StoreAuthToken(token: string, IsPersisted: boolean) {

    if (IsPersisted) {
      localStorage.setItem(LocalStorageDataType.AuthToken, JSON.stringify(token));
      localStorage.setItem(LocalStorageDataType.Remember, IsPersisted + "");
    }
    else {
      this.tempStorage.setItem(LocalStorageDataType.AuthToken, JSON.stringify(token));
      this.tempStorage.setItem(LocalStorageDataType.Remember, IsPersisted + "");
    }
  }


  private StoreUserInfo(user: any, IsPersisted: boolean) {
    if (IsPersisted)
      localStorage.setItem(LocalStorageDataType.UserInfo, JSON.stringify(user));
    else
      this.tempStorage.setItem(LocalStorageDataType.UserInfo, JSON.stringify(user));
  }

  private LoadUserInfo(IsPersisted: boolean) {
    let result = null;
    if (IsPersisted) {
      result = localStorage.getItem(LocalStorageDataType.UserInfo);
      return JSON.parse(result || "{}");
    }
    else {
      result = this.tempStorage.getItem(LocalStorageDataType.UserInfo);
      return JSON.parse(result || "{}");
    }
  }























}


class TempStorage {

  private readonly TempStorageName;

  constructor(StorageName: string) {

    this.TempStorageName = StorageName;

    // initiate a cookie as temp storage
    if (!this.GetTempStorage())
      document.cookie = `${this.TempStorageName}=${JSON.stringify({})};path=/`  ;


  }

  setItem(name: string, value: string) {

    let temp_storage = this.GetTempStorage();
    temp_storage[name] = value;
    document.cookie = `${this.TempStorageName}=${JSON.stringify(temp_storage)};path=/`;

  }

  getItem(name: string) {
    let temp_object = this.GetTempStorage() || {};
    return temp_object[name];
  }

  removeItem(name: string) {
    let temp_object = this.GetTempStorage() || {};
    delete temp_object[name];
    document.cookie = `${this.TempStorageName}=${JSON.stringify(temp_object)};path=/`;
  }

  clear() {
    document.cookie = `${this.TempStorageName}=${JSON.stringify({})};path=/`;
  }

  private GetTempStorage() {

    let nameEQ = this.TempStorageName + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        let match = c.substring(nameEQ.length, c.length);
        return match ? JSON.parse(match) : null;
      }
    }
    return null;

  }

}
