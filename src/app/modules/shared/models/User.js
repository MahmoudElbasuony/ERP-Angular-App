var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var User = (function (_super) {
    __extends(User, _super);
    function User() {
        _super.call(this);
        this.Roles = [];
    }
    return User;
})(BaseModel);
exports.User = User;
(function (LogLevel) {
    LogLevel[LogLevel["Info"] = 1] = "Info";
    LogLevel[LogLevel["Error"] = 2] = "Error";
    LogLevel[LogLevel["Warning"] = 3] = "Warning";
    LogLevel[LogLevel["Success"] = 4] = "Success";
})(exports.LogLevel || (exports.LogLevel = {}));
var LogLevel = exports.LogLevel;
