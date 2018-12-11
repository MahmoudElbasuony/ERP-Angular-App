import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../shared/services/LanguageService';
import { LogService } from '../../../shared/services/LogService';
import { ConfirmationService } from 'primeng/primeng';
import { CostCenterRepository } from '../../Repos/CostCenterRepository';
import { LogLevel } from '../../../shared/models/User';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MenuItem } from 'primeng/components/common/menuitem';
import { fakeAsync } from '@angular/core/testing';
import { TreeNode } from 'primeng/primeng';
import { forEach } from '@angular/router/src/utils/collection';
import { BankData } from '../../models/BankData';
import { BankDataRepository } from '../../Repos/bankDataRepository';
import { UserRepository } from '../../../shared/repos/UserRepository';
import { BranchRepository } from '../../../generalData/repos/BranchRepository';
import { SubsidiaryJournalRepository } from '../../Repos/subsidiaryJournalRepository';
import { Currency } from '../../models/Currency';
import { CurrencyRepository } from '../../../generalData/repos/CurrencyRepository';


@Component({
  selector: 'app-banks-data',
  templateUrl: './banks-data.component.html',
  styleUrls: ['./banks-data.component.css'],
  providers: [BankDataRepository, ConfirmationService,UserRepository,
    BranchRepository,SubsidiaryJournalRepository,CurrencyRepository]
})
export class BanksDataComponent implements OnInit {

  newObject : BankData = new BankData();
  item :BankData = new BankData();
  CheckParent : boolean =false;
  list :any =[];  
  obj:any;
  files: TreeNode[]=[];
  selectedFile : TreeNode ;
  selectedBankData : BankData ;
  items: MenuItem[];
  
  editMode : boolean =false;
  data : BankData[] =[];  
  Accounts: SelectItem[] = [];
  Branchs : SelectItem[] = [];
  Currencies :SelectItem []=[];
  SubsidiaryJournals  : SelectItem[] = [];
  @ViewChild("BankName")
  BankName:AbstractControl;
  @ViewChild("BankBranch")
  BankBranch:AbstractControl;
  @ViewChild("AccountNumber")
  AccountNumber:AbstractControl;
  @ViewChild("AccountName")
  AccountName:AbstractControl;
  @ViewChild("Currency")
  Currency:AbstractControl;
  @ViewChild("Branch")
  Branch:AbstractControl;
  @ViewChild("BalanceDate")
  BalanceDate:AbstractControl;
  @ViewChild("Account")
  Account:AbstractControl;
  @ViewChild("SubsidiaryJournal")
  SubsidiaryJournal:AbstractControl;



  constructor(private toaster: LogService,private langService:LanguageService ,  private confirmationService: ConfirmationService, private repo: BankDataRepository
    ,private UserRepo:UserRepository 
    ,private BranchRepo:BranchRepository
    ,private CurrencyRepo :CurrencyRepository
    ,private SubsidiaryRepo:SubsidiaryJournalRepository
    ,private log : LogService ) { 

  this.repo.getAll().subscribe((res) => {
      debugger;
    if (res.length !=0) {
      debugger;
      this.obj =res[0];
      this.PutRoot(res[0])
      this.RestructTree(res[0],this.files[0]);
    }
    else
    {
      this.list=[];
    }
});

this.UserRepo.getAll().subscribe((Res) =>{

  if (Res) {
    this.Accounts.push(
      {label: "" , value: ""}
  );
    Res.forEach(<Users>(element ) => {

      this.Accounts.push(
          {label: element.Name , value: element.Id}
      );

    });
} 
});
this.SubsidiaryRepo.getAll().subscribe((Res) =>{

  if (Res) {
    this.SubsidiaryJournals.push(
      {label: "" , value:""}
  );
    Res.forEach(<SubsidiaryJournal>(element ) => {

      this.SubsidiaryJournals.push(
          {label: element.SubsidiaryName , value: element.Id}
      );

    });
} 
});

this.BranchRepo.getAll().subscribe((Res) =>{

  if (Res) {
    this.Branchs.push(
      {label: "" , value:""}
  );
    Res.forEach(<Branch>(element ) => {

      this.Branchs.push(
          {label: element.BranchName , value: element.Id}
      );

    });
} 
});


this.CurrencyRepo.getAll().subscribe((Res) =>{

  if (Res) {
    this.Currencies.push(
      {label: "" , value: ""}
  );

    Res.forEach(<Currency>(element ) => {

      this.Currencies.push(
          {label: element.CurrencyName , value: element.Id}
      );

    });
} 
});

}

  ngOnInit() {
    this.items = [
      {label: 'Edit', icon: 'fa-search', command: (event) => this.OnEditBankData(this.selectedBankData)},
      {label: 'Delete', icon: 'fa-close', command: (event) => this.onDeleteBankData(this.selectedBankData)}
  ];
}
PutRoot(obj)
{
  
  this.files = [
    {
        label: obj.AssociatedObject.BankName,
        data:obj.AssociatedObject,
        expandedIcon: "fa-folder-open",
        collapsedIcon: "fa-folder",
        children: [],
      }]
}
     RestructTree(obj :any , objres :any )
      {
        debugger;
        this.list = [...this.list,obj.AssociatedObject];
        if(obj.Children.length ==0)
        {
          return;
        }

     
        for (var i =0; i< obj.Children.length ;i++) {
          objres.children.push( {
            label: obj.Children[i].AssociatedObject.BankName,
            data:obj.Children[i].AssociatedObject,
            expandedIcon: "fa-folder-open",
            collapsedIcon: "fa-folder",
            children: [],
          })
          this.RestructTree(obj.Children[i] ,objres.children[i]);
        }
      }

      checkHaveParent(obj :any , TargetObj :BankData )
      {
        debugger;

        if(obj.AssociatedObject ==TargetObj)
        {
          if(obj.Children.length !=0)
          {
           this.CheckParent = true;
          }
        }

        if(obj.Children.length ==0)
        {
          return;
        }
     
     
        for (var i =0; i< obj.Children.length ;i++) {
          this.checkHaveParent(obj.Children[i] ,TargetObj);
        }
      }
  Save() {
      debugger;
       this.newObject.Code = this.GeneratorCode();
    
       if((!this.selectedFile )&&(this.list != 0))
       {
        return this.log.pop(LogLevel.Error, "Must Select Bank Data From Tree");
       }
      
       if (!this.newObject.Code) {
         return this.log.pop(LogLevel.Error, "Code is required");
      }

      if (!this.newObject.BankName) {
        return this.log.pop(LogLevel.Error, "Bank Name required");
     }
     if (!this.newObject.BankBranch) {
      return this.log.pop(LogLevel.Error, "Bank Branch required");
   }
   if (!this.newObject.AccountNumber) {
    return this.log.pop(LogLevel.Error, "Account Number required");
 }
 if (!this.newObject.AccountName) {
  return this.log.pop(LogLevel.Error, "Account Name required");
}
if (!this.newObject.Currency) {
  return this.log.pop(LogLevel.Error, "Currency required");
}

if (!this.newObject.Branch) {
  return this.log.pop(LogLevel.Error, "Branch required");
}
if (!this.newObject.BalanceDate) {
  return this.log.pop(LogLevel.Error, "Balance Date required");
}
if (!this.newObject.Account) {
  return this.log.pop(LogLevel.Error, "Account required");
}
if (!this.newObject.SubsidiaryJournal) {
  return this.log.pop(LogLevel.Error, "Subsidiary Journal required");
}

    
      if(this.selectedFile)
      {
      this.newObject.parentId= this.selectedFile.data.Id;
      }
      this.repo.create(this.newObject).subscribe((data: any) => { 
        debugger;
       
        if(this.list.length == 0)
        {
         this.files = [
               {
                   label: this.newObject.BankName,
                   data:data,
                   expandedIcon: "fa-folder-open",
                   collapsedIcon: "fa-folder",
                   children: [],
                 }]
           
        }
        if(this.selectedFile)
        {
          this.selectedFile.children.push({label:this.newObject.BankName, data: data,
          expandedIcon: "fa-folder-open",
          collapsedIcon: "fa-folder",
          children: [],
        });
       
        }
        if (!this.newObject.Id) // Add
        {
          this.list = [...this.list, data];
        }
      
      this.Reset(); 
      });
    }

    update(){
      this.repo.update(this.newObject).subscribe((data: any) => { 
          debugger;

      let bankData: BankData = this.newObject;
      let bankData_index = this.list.findIndex(g => g.Id === bankData.Id);
      if (bankData_index >= 0) {
   
      }
      this.repo.getAll().subscribe((res) => {
        this.list=[];
        debugger;
      if (res.length !=0) {
        debugger;
        this.obj =res[0];
        this.PutRoot(res[0])
        this.RestructTree(res[0],this.files[0]);
      }
      else
      {
        this.list=[];
      }
    });
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
   this.newObject = new BankData();
   this.BalanceDate.reset();
   this.Account.reset();
   this.AccountName.reset();
   this.BankBranch.reset();
   this.BankName.reset();
   this.Currency.reset();
   this.AccountNumber.reset();
   this.BalanceDate.reset();
   this.Branch.reset();
   this.SubsidiaryJournal.reset();
   this.editMode =false;
 }
 nodeSelect(event)
 {
   debugger;
 /// event.data

 }

 OnEditBankData(bankData:BankData) {
  this.newObject = this.clone(bankData);
  this.editMode =true;
}

OnEditBankDataTable(event) {
  debugger;
  this.newObject = this.clone(event.data);
  this.editMode =true;
}


onDeleteBankData(_bankData: BankData) {
  debugger;


    this.checkHaveParent(this.obj,_bankData)
 

  if(this.CheckParent == true)
  {
    this.CheckParent =false;
    return this.log.pop(LogLevel.Error, "Bank Data"+" "+_bankData.BankName+ "  "+" Have Childrens Node");
  
  }
  if(confirm("Do you want to delete this bank Data")) {
    this.repo.delete(_bankData.Id).subscribe((bankData) => {
              let bankData_index = this.list.findIndex(c => c.Id === _bankData.Id);
              if (bankData_index >= 0)
                this.list.splice(bankData_index, 1);
                this.list = [...this.list];
             });
  }
  
  this.repo.getAll().subscribe((res) => {
    this.list=[];
    this.files=[];
    debugger;
  if (res.length !=0) {
    debugger;
    this.obj =res[0];
    this.PutRoot(res[0])
    this.RestructTree(res[0],this.files[0]);
  }
  else
  {
    this.list=[];
  }
});
}
// 

clone(c: BankData): BankData {
  let obj = new BankData();
  for (let prop in c) {
    obj[prop] = c[prop];
  }
  return obj;
}

}

