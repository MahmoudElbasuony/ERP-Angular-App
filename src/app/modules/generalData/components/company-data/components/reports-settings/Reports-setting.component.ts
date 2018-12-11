import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../../../shared/services/LanguageService';
import { LogService, LogLevel } from '../../../../../shared/services/LogService';
import { ReportsSetting } from '../../../../models/ReportsSetting';
import { ReportsSettingRepository } from '../../../../repos/ReportsSettingRepository';
import { Message, ConfirmationService } from 'primeng/primeng';
import { AuthService } from '../../../../../shared/services/AuthService';
import { BaseUrl } from '../../../../../shared/urls/url-helper';

@Component({
  selector: 'Reports-setting',
  templateUrl: './Reports-setting.component.html',
  styleUrls: ['./Reports-setting.component.css'],
  providers: [ReportsSettingRepository,ConfirmationService]
})

export class ReportsSettingComponent implements OnInit {
  msgs: Message[];
  reportSettings: ReportsSetting = new ReportsSetting();
  Url: string;





  constructor(private authService: AuthService, private confirmationService: ConfirmationService, private langService: LanguageService, private repo: ReportsSettingRepository, private log: LogService) {
    this.Url = BaseUrl + "ReportsSetting";

  }

  ngOnInit() {
    this.repo.getAll().subscribe((rs: any) => {
      this.reportSettings = rs;
    });
  }


  onUpload(event) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
    this.LoadAllReportSettings();
  }

  onDeleteReportImage(FileInput) {

    const file_id = FileInput.value;
    if (file_id)
      this.confirmationService.confirm({
        message: this.langService.IsEnglish ? "are you sure ? " : "هل انت متاكد",
        accept: () => {
          this.repo.deleteReportFile(file_id).subscribe(() => {
            this.LoadAllReportSettings();
          });
        }
      });


  }

  BeforeUpload(event, fileInput) {

    if (fileInput.value) {
      let xhr = <XMLHttpRequest>event.xhr;
      let formData = <FormData>event.formData;
      formData.append("FileID", fileInput.value);
      xhr.setRequestHeader("Authorization", this.authService.AuthTokenAsHeader);

    }

  }

  LoadAllReportSettings() {
    this.repo.getAll().subscribe((rs: any) => {
      this.reportSettings = rs;
    });
  }
}
