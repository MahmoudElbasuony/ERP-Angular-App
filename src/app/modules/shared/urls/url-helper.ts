export const BaseUrl = "http://localhost/ERP.WebApi/" ;//"http://localhost:21000/"; //

const ReportingAppBaseUrl ="http://localhost/ERPReporting/";// "http://localhost:64516/" ;//

const ReportingServiceUrl = ReportingAppBaseUrl + "Reports/ViewReport?ReportDescription=Report&Width=500&Height=500";

export function GenerateReportUrl(ReportName, Parameters: { [key: string]: string }): string {

  let params = [];

  for (let prop in Parameters) {
    params.push(prop + "=" + Parameters[prop]);
  }

  let params_query = params.length > 0 ? params.join(",") : "";

  return `${ReportingServiceUrl}&ReportName=${ReportName}&Parameters=${params_query},BaseUrl=${BaseUrl.substr(0, BaseUrl.length - 1)}`;
}
