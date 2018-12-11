import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../shared/services/LanguageService';
import { SubsidiaryJournal } from '../../models/subsidiary-journal';
import { LogService } from '../../../shared/services/LogService';
import { ConfirmationService } from 'primeng/primeng';
import { SubsidiaryJournalRepository } from '../../Repos/subsidiaryJournalRepository';
import { LogLevel } from '../../../shared/models/User';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MenuItem } from 'primeng/components/common/menuitem';
import { fakeAsync } from '@angular/core/testing';

import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'subsidiary-journal',
  templateUrl: './subsidiary-journal.component.html',
  styleUrls: ['./subsidiary-journal.component.css'],
  providers: [SubsidiaryJournalRepository ,ConfirmationService]
})
export class SubsidiaryJournalComponent implements OnInit {

  newObject : SubsidiaryJournal = new SubsidiaryJournal();
  item :SubsidiaryJournal = new SubsidiaryJournal();
  list :any;  
  selectedSubsidiaryJournal : SubsidiaryJournal ;
  items: MenuItem[];
  TypesCenter : SelectItem[] = [];  
  editMode : boolean =false;
 
 
  @ViewChild("SubsidiaryName")
  SubsidiaryName:AbstractControl;

  
  
  constructor(private toaster: LogService,private langService:LanguageService ,  private confirmationService: ConfirmationService, private repo: SubsidiaryJournalRepository ,private log : LogService ) { 
  this.repo.getAll().subscribe((res) => {
      debugger;
    if (res.length !=0) {
      debugger;
      this.list = res;
    }
    else
    {
      this.list=[];
    }
});


}

  ngOnInit() {
    this.items = [
      {label: 'Edit', icon: 'fa-search', command: (event) => this.OnEditSubsidiaryJournal(this.selectedSubsidiaryJournal)},
      {label: 'Delete', icon: 'fa-close', command: (event) => this.onDeleteSubsidiaryJournal(this.selectedSubsidiaryJournal)}
  ];
}

  Save() {
      debugger;
      this.newObject.Code = this.GeneratorCode();
       if (!this.newObject.SubsidiaryName) {
        return this.log.pop(LogLevel.Error, "Subsidiary Name is required");
      }

      
    //   else{
    //     this.newObject.Code = this.GeneratorCode();
    //   }
   
      this.repo.create(this.newObject).subscribe((data: any) => { 
        debugger;
        this.list = [...this.list, data];
        // if (!this.newObject.Id) // Add
        // {
        //   this.list = [...this.list, data];
        // }
      
      this.Reset(); 
      });
    }

    update(){
        this.repo.update(this.newObject).subscribe((data: any) => { 
            debugger;

              
            let subsidiaryJournal: SubsidiaryJournal = this.newObject;
            let subsidiaryJournal_index = this.list.findIndex(g => g.Id === subsidiaryJournal.Id);
            if (subsidiaryJournal_index >= 0) {
            this.list.splice(subsidiaryJournal_index, 1);
            this.list = [...this.list,subsidiaryJournal];
            }

          this.Reset(); 
          });
    }

    GeneratorCode() {
      var text = "";
      var possible = "0123456789";
    
      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
      return text;
    }
 Reset()
 {
   this.newObject = new SubsidiaryJournal();
   this.SubsidiaryName.reset();
  
   this.editMode =false;
 }

 OnEditSubsidiaryJournal(subsidiaryJournal:SubsidiaryJournal) {
     debugger;
  this.newObject = this.clone(subsidiaryJournal);
  this.editMode =true;
}

OnEditSubsidiaryJournalTable(event) {
  debugger;
  this.newObject = this.clone(event.data);
  this.editMode =true;
}


onDeleteSubsidiaryJournal(_subsidiaryJournal: SubsidiaryJournal) {
  debugger;
  if (_subsidiaryJournal.Id) {
    // this.confirmationService.confirm({
    //   accept: () => {

    //     this.repo.delete(_subsidiaryJournal.Id).subscribe((subsidiaryJournal) => {
    //       let subsidiaryJournal_index = this.list.findIndex(c => c.Id === subsidiaryJournal.Id);
    //       if (subsidiaryJournal_index >= 0)
    //         this.list.splice(subsidiaryJournal_index, 1);
    //       this.toaster.pop(LogLevel.Success, "subsidiary Journal Deleted Successfully");
    //     });
    //   },
    //   message: "Do you want to delete this subsidiary Journal ?"
    // });
    if(confirm("Do you want to delete this subsidiary Journal")) {
        this.repo.delete(_subsidiaryJournal.Id).subscribe((subsidiaryJournal) => {
                  let subsidiaryJournal_index = this.list.findIndex(c => c.Id === _subsidiaryJournal.Id);
                  if (subsidiaryJournal_index >= 0)
                    this.list.splice(subsidiaryJournal_index, 1);
                    this.list = [...this.list];
                ////  this.toaster.pop(LogLevel.Success, "subsidiary Journal Deleted Successfully");
                });
      }
  }
}




// 

clone(c: SubsidiaryJournal): SubsidiaryJournal {
  let obj = new SubsidiaryJournal();
  for (let prop in c) {
    obj[prop] = c[prop];
  }
  return obj;
}

}

