import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {


  private _isLoading: boolean;

  constructor() {
     this._isLoading = false;

  }

  get IsLoading() {
    return this._isLoading;
  }



  public Show() {
    // this will be bound to loader component
    // angular detect changes and based on it
    // update view with new value
    // angular doesn't allow you to set value during change detection cycle
    // so any update prevent it to next cycle to allow angular to know about it
    setTimeout(() => {
      this._isLoading = true;
    }, 1);

  }

  public Hide() {
    // this will be bound to loader component
    // angular detect changes and based on it
    // update view with new value
    // angular doesn't allow you to set value during change detection cycle
    // so any update prevent it to next cycle to allow angular to know about it
    setTimeout(() => {
      this._isLoading = false;
    }, 1);


  }


}
