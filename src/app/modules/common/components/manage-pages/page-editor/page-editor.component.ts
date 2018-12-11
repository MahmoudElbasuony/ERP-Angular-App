import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Page } from '../../../../shared/models/Page';
import { PageRepository } from '../../../../shared/repos/PageRepository';
import { LanguageService } from '../../../../shared/services/LanguageService';

@Component({
  selector: 'page-editor',
  templateUrl: 'page-editor.component.html',
  styleUrls: ['page-editor.component.css']
})
export class PageEditorComponent implements OnInit {


  private IsEdit: boolean;

  @Input()
  Page: Page;

  @Output()
  OnCloseDialog: EventEmitter<any> = new EventEmitter();

  @Output()
  OnAddOrUpdatePage: EventEmitter<any> = new EventEmitter();


  constructor(private pageRep: PageRepository, private langService: LanguageService) {
  }

  ngOnInit() {

    if (this.Page && this.Page.Path && this.Page.Path.startsWith("/"))
      this.Page.Path = this.Page.Path.substr(1, this.Page.Path.length);


      if(this.Page && this.Page.Id)
         this.IsEdit = true;
  }


  SavePage() {


    this.Page.Path = "/" + this.Page.Path;
    if (!this.Page.Id) {
      this.pageRep.create(this.Page).subscribe((page) => {
        this.Page = page;
        this.OnAddOrUpdatePage.emit(this.Page);
        this.OnCloseDialog.emit(false);
        this.Close();
      });
    }
    else {
      this.pageRep.update(this.Page).subscribe((page) => {
        this.Page = page;
        this.OnAddOrUpdatePage.emit(this.Page);
        this.OnCloseDialog.emit(false);
        this.Close();
      });
    }
  }



  Close() {
    this.OnCloseDialog.emit(false);
  }


}
