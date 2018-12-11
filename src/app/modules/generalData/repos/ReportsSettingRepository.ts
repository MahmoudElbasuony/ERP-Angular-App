import { Observable } from 'rxjs/Rx';
import { SystemServiceService } from '../../../system-service.service';
import { Inject } from '@angular/core';
import { ReportsSetting } from '../models/ReportsSetting';
import { BaseCrudRepository } from '../../shared/repos/BaseCrudRepository';
import { HttpClient } from '@angular/common/http';


export class ReportsSettingRepository extends BaseCrudRepository<ReportsSetting> {

  private systemSrvc: SystemServiceService;

  constructor( @Inject(SystemServiceService) systemService: SystemServiceService) {

    super("ReportsSetting", systemService);


    this.systemSrvc = systemService;
  }

  deleteReportFile(Id: string) {
    return this.systemSrvc.delete("DeleteReportFile", Id);
  }


}

