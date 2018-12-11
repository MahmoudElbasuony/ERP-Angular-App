var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
(function (LogLevel) {
    LogLevel[LogLevel["Info"] = 1] = "Info";
    LogLevel[LogLevel["Error"] = 2] = "Error";
    LogLevel[LogLevel["Warning"] = 3] = "Warning";
    LogLevel[LogLevel["Success"] = 4] = "Success";
})(exports.LogLevel || (exports.LogLevel = {}));
var LogLevel = exports.LogLevel;
var LogService = (function () {
    function LogService(toaster) {
        this.toaster = toaster;
    }
    //type: success, info, warn, error
    LogService.prototype.pop = function (level, body) {
        switch (level) {
            case LogLevel.Info:
                this.toaster.pop("info", "", body);
                break;
            case LogLevel.Error:
                this.toaster.pop("error", "", body);
                break;
            case LogLevel.Warning:
                this.toaster.pop("warn", "", body);
                break;
            case LogLevel.Success:
                this.toaster.pop("success", "", body);
                break;
            default:
                this.toaster.pop("info", "", body);
                break;
        }
    };
    LogService = __decorate([
        core_1.Injectable()
    ], LogService);
    return LogService;
})();
exports.LogService = LogService;
