import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ToasterService } from 'angular2-toaster';


export enum LogLevel {
  Info = 1,
  Error,
  Warning,
  Success
}

@Injectable()
export class LogService {
  constructor(private toaster: ToasterService) {

  }

  //type: success, info, warn, error
  pop(level: LogLevel, body: string) {
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

  }
}

