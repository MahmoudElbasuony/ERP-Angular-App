var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
var LogService_1 = require('./modules/shared/services/LogService');
var url_helper_1 = require('./modules/shared/urls/url-helper');
var SystemServiceService = (function () {
    //**************** */
    function SystemServiceService(http, logger) {
        this.http = http;
        this.logger = logger;
        this._showNavBar = new BehaviorSubject_1.BehaviorSubject(false);
        this.showNavBarEmitter = this._showNavBar.asObservable();
        this.apiEndpoint = url_helper_1.BaseUrl;
    }
    SystemServiceService.prototype.showNavBar = function (ifShow) {
        this._showNavBar.next(ifShow);
    };
    SystemServiceService.prototype.getAll = function (controllerName, first, rows) {
        var _this = this;
        var controllerUrl = this.apiEndpoint + controllerName;
        return this.http.get("" + controllerUrl + (Number.isInteger(first) && Number.isInteger(rows) ? "?First=" + first + "&Rows=" + rows : ''), { observe: 'response' })
            .map(function (response) {
            if (response != null) {
                return response.body;
            }
        })
            .catch(function (error) {
            return _this.handleError(error);
        });
    };
    SystemServiceService.prototype.get = function (controllerName, id) {
        var _this = this;
        var controllerUrl = this.apiEndpoint + controllerName + '/' + id;
        return this.http.get(controllerUrl, { observe: 'response' })
            .map(function (response) {
            if (response != null) {
                return response.body;
            }
        })
            .catch(function (error) {
            return _this.handleError(error);
        });
    };
    SystemServiceService.prototype.delete = function (controllerName, id) {
        var _this = this;
        var controllerUrl = this.apiEndpoint + controllerName + '/' + id;
        return this.http.delete(controllerUrl, { observe: 'response' })
            .map(function (response) {
            if (response != null) {
                _this.logger.pop(LogService_1.LogLevel.Success, "Deleting Done Successfully");
                return response.body;
            }
        })
            .catch(function (error) {
            return _this.handleError(error);
        });
    };
    SystemServiceService.prototype.post = function (controllerName, value) {
        var _this = this;
        var controllerUrl = this.apiEndpoint + controllerName;
        return this.http.post(controllerUrl, value, { observe: 'response' })
            .map(function (response) {
            if (response.ok) {
                _this.logger.pop(LogService_1.LogLevel.Success, "Adding Done Successfully");
                return response.body;
            }
        })
            .catch(function (error) {
            return _this.handleError(error);
        });
    };
    SystemServiceService.prototype.update = function (controllerName, value) {
        var _this = this;
        var controllerUrl = this.apiEndpoint + controllerName;
        return this.http.put(controllerUrl, value, { observe: 'response' }).
            map(function (response) {
            if (response.ok) {
                _this.logger.pop(LogService_1.LogLevel.Success, "Edit Done Successfully");
                return response.body;
            }
        })
            .catch(function (error) {
            return _this.handleError(error);
        });
    };
    SystemServiceService.prototype.handleError = function (error) {
        var message = (error.message);
        this.logger.pop(LogService_1.LogLevel.Error, message);
        return Observable_1.Observable.throw(message);
    };
    SystemServiceService = __decorate([
        core_1.Injectable()
    ], SystemServiceService);
    return SystemServiceService;
})();
exports.SystemServiceService = SystemServiceService;
