import { Component, OnInit } from '@angular/core';
import { Page } from '../../../shared/models/Page';
import { LogService, LogLevel } from '../../../shared/services/LogService';
import { ConfirmationService } from 'primeng/primeng';
import { LanguageService } from '../../../shared/services/LanguageService';
import { PageRepository } from '../../../shared/repos/PageRepository';
import { AuthService } from '../../../shared/services/AuthService';

@Component({
  selector: 'app-manage-pages',
  templateUrl: './manage-pages.component.html',
  styleUrls: ['./manage-pages.component.css'],
  providers: [PageRepository,ConfirmationService]
})
export class ManagePagesComponent implements OnInit {

  Pages: Page[];

  DisplayPageEditor: boolean;

  selectedPage: Page;





  constructor(private authService:AuthService, private toaster: LogService, private confirmationService: ConfirmationService, private langService: LanguageService, private pageRep: PageRepository) {

    this.Pages = [];


  }

  ngOnInit() {
    this.LoadPages();
  }


  LoadPages(First?: number, Rows?: number) {
    this.pageRep.getAll(First, Rows).subscribe((pages) => {
      this.Pages = pages;
    });
  }

  OnEditPage(page: Page) {

    this.selectedPage = this.clone(page);
    this.DisplayPageEditor = true;

  }

  onDeletePage(_page: Page) {
    if (_page.Id) {
      this.confirmationService.confirm({
        accept: () => {

          this.pageRep.delete(_page.Id).subscribe((page) => {

            this.authService.OnDeletePageFromPermissions();


            let page_index = this.Pages.findIndex(g => g.Id === _page.Id);
            if (page_index >= 0)
              this.Pages.splice(page_index, 1);
            this.toaster.pop(LogLevel.Success, "Page Deleted Successfully");
          });
        },
        message:  this.langService.IsEnglish ? "are you sure ? " : "هل انت متاكد"
      });
    }
  }

  onRequireLoadPages(event) {


    let first: number = event.first;
    let rows = event.rows;
    this.LoadPages();


  }

  ShowAddPageDialog() {
    this.DisplayPageEditor = true;
    this.selectedPage = new Page();
  }

  clone(c: Page): Page {
    let obj = new Page();
    for (let prop in c) {
      obj[prop] = c[prop];
    }
    return obj;
  }

  OnPageAddOrUpdate(page: Page) {
    if (page) {
      let existed_page_indx = this.Pages.findIndex((u) => u.Id === page.Id);
      if (existed_page_indx >= 0) {
        this.Pages[existed_page_indx] = page;

      }
      else {
        this.Pages.push(page);
      }

    }
  }

}
