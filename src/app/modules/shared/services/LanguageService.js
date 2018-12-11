var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var core_2 = require('@ngx-translate/core');
var http_loader_1 = require('@ngx-translate/http-loader');
var http_1 = require('@angular/common/http');
var LocalStorageService_1 = require('./LocalStorageService');
var $ = require("jquery");
var Observable_1 = require('rxjs/Observable');
var LanguageService = (function () {
    function LanguageService(translator, localStorageService) {
        var _this = this;
        this.translator = translator;
        this.localStorageService = localStorageService;
        this._IsEnglish = true;
        this.IsEnglisAsObservale = new Observable_1.Observable(function (observer) { return _this._LanguageObserver = observer; });
        var remember_from_strage = localStorageService.LoadFromLocalStorage(LocalStorageService_1.LocalStorageDataType.Remember, false);
        this._RememberMe = remember_from_strage && remember_from_strage === "true" ? true : false;
        var stored_lang = localStorageService.LoadFromLocalStorage(LocalStorageService_1.LocalStorageDataType.Language, this._RememberMe);
        if (!stored_lang) {
            localStorageService.AddToLocalStorage("en", LocalStorageService_1.LocalStorageDataType.Language, this._RememberMe);
            this.IsEnglish = true;
        }
        else {
            this.IsEnglish = stored_lang === "en";
        }
    }
    Object.defineProperty(LanguageService.prototype, "IsEnglish", {
        get: function () {
            return this._IsEnglish;
        },
        set: function (value) {
            this._IsEnglish = value;
            this.SetLanguage(value);
        },
        enumerable: true,
        configurable: true
    });
    LanguageService.prototype.SwitchLanguage = function () {
        this.IsEnglish = !this.IsEnglish;
        this.SetLanguage(this.IsEnglish);
        if (this._LanguageObserver)
            this._LanguageObserver.next(this.IsEnglish);
    };
    LanguageService.prototype.SetLanguage = function (IsEnglish) {
        this.translator.use(this._IsEnglish ? "en" : "ar");
        this.localStorageService.AddToLocalStorage(this.IsEnglish ? "en" : "ar", LocalStorageService_1.LocalStorageDataType.Language, this._RememberMe);
        if (this._LanguageObserver)
            this._LanguageObserver.next(this.IsEnglish);
        // set body direction based on current language
        if (IsEnglish)
            $("body").attr("dir", "ltr");
        else
            $("body").attr("dir", "rtl");
    };
    LanguageService = __decorate([
        core_1.Injectable()
    ], LanguageService);
    return LanguageService;
})();
exports.LanguageService = LanguageService;
/// this just for registering translator
function HttpLoaderFactory(http) {
    return new http_loader_1.TranslateHttpLoader(http); //, BaseUrl + "assets/i18n/", ".json"
}
exports.HttpLoaderFactory = HttpLoaderFactory;
// this return Translator Module required for all other modules
// to import required pipes and directives
// parameter : specify as root or as child module so not inject
// TranslateService  Multi times .
function RegisterTranslatorModule(AsRootModule) {
    if (AsRootModule)
        return core_2.TranslateModule.forRoot({
            loader: {
                provide: core_2.TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [http_1.HttpClient]
            }
        });
    else
        return core_2.TranslateModule.forChild({
            loader: {
                provide: core_2.TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [http_1.HttpClient]
            }
        });
}
exports.RegisterTranslatorModule = RegisterTranslatorModule;
