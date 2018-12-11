exports.BaseUrl = "http://localhost/ERP.WebApi/"; //"http://localhost:21000/"; //
var ReportingAppBaseUrl = "http://localhost/ERPReporting/"; // "http://localhost:64516/" ;//
var ReportingServiceUrl = ReportingAppBaseUrl + "Reports/ViewReport?ReportDescription=Report&Width=500&Height=500";
function GenerateReportUrl(ReportName, Parameters) {
    var params = [];
    for (var prop in Parameters) {
        params.push(prop + "=" + Parameters[prop]);
    }
    var params_query = params.length > 0 ? params.join(",") : "";
    return ReportingServiceUrl + "&ReportName=" + ReportName + "&Parameters=" + params_query + ",BaseUrl=" + exports.BaseUrl.substr(0, exports.BaseUrl.length - 1);
}
exports.GenerateReportUrl = GenerateReportUrl;
