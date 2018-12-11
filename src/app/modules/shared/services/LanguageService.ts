import { Injectable, Renderer } from '@angular/core';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService, LocalStorageDataType } from './LocalStorageService';
import * as $ from "jquery";
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs';
import { BaseUrl } from '../urls/url-helper';
@Injectable()
export class LanguageService {


  private _IsEnglish = true;

  private _LanguageObserver: Observer<boolean>;

  private _RememberMe: boolean;


  IsEnglisAsObservale: Observable<boolean>;

  get IsEnglish() {
    return this._IsEnglish;
  }

  set IsEnglish(value: boolean) {


    this._IsEnglish = value;
    this.SetLanguage(value);
  }

  constructor(private translator: TranslateService, private localStorageService: LocalStorageService) {


    this.IsEnglisAsObservale = new Observable(observer => this._LanguageObserver = observer);


    let remember_from_strage = localStorageService.LoadFromLocalStorage(LocalStorageDataType.Remember, false);
    this._RememberMe = remember_from_strage && remember_from_strage === "true" ? true : false;


    let stored_lang = localStorageService.LoadFromLocalStorage(LocalStorageDataType.Language, this._RememberMe);

    if (!stored_lang) {


      localStorageService.AddToLocalStorage("en", LocalStorageDataType.Language, this._RememberMe);

      this.IsEnglish = true;

    }
    else {

      this.IsEnglish = stored_lang === "en";

    }


  }




  public SwitchLanguage() {
    this.IsEnglish = !this.IsEnglish;
    this.SetLanguage(this.IsEnglish);
    if (this._LanguageObserver)
      this._LanguageObserver.next(this.IsEnglish);

  }

  public SetLanguage(IsEnglish: boolean) {

    this.translator.use(this._IsEnglish ? "en" : "ar");

    this.localStorageService.AddToLocalStorage(this.IsEnglish ? "en" : "ar", LocalStorageDataType.Language, this._RememberMe);

    if (this._LanguageObserver)
      this._LanguageObserver.next(this.IsEnglish);

    // set body direction based on current language

    if (IsEnglish) $("body").attr("dir", "ltr");
    else $("body").attr("dir", "rtl");


  }




}



/// this just for registering translator
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, BaseUrl + "assets/i18n/", ".json");
}


// this return Translator Module required for all other modules
// to import required pipes and directives
// parameter : specify as root or as child module so not inject
// TranslateService  Multi times .
export function RegisterTranslatorModule(AsRootModule: boolean) {
  if (AsRootModule)
    return TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    });
  else
    return TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    });
}
