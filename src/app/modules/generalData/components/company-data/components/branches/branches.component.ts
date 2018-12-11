import { Component, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from '../../../../../shared/services/LanguageService';
import { Country } from '../../../../models/Country';
import { Branch } from '../../../../models/Branch';
import { BranchRepository } from '../../../../repos/BranchRepository';
import { LogService, LogLevel } from '../../../../../shared/services/LogService';
import { ApplicationRef } from '@angular/core/src/application_ref';
import { ConfirmationService } from 'primeng/primeng';
import { SelectItem } from 'primeng/components/common/selectitem';
import { UserRepository } from '../../../../../shared/repos/UserRepository';
import { Currency } from '../../../../models/Currency';
import { CurrencyRepository } from '../../../../repos/CurrencyRepository';
import { AbstractControl } from '@angular/forms';
@Component({
  selector: 'Branches',
  templateUrl: './Branches.component.html',
  styleUrls: ['./Branches.component.css'],
  providers: [BranchRepository,UserRepository,CurrencyRepository]
})
export class BranchComponent implements OnInit {
  showDialog = false;
  editMode:boolean=false;
  isNew: boolean;
  selectedObject: Country;
  list: object[] = [];
  MobileNumber :string =null;
  MobilesNumberArray : string[]=[];
  newObject: Branch = new Branch();
  Users : SelectItem[] = [];
  listOfUsers : object[] = [];
  Currencies : SelectItem[] = [];
  listOfCurrencies : object[] = [] ;

  @ViewChild("BranchName")
  BranchName:AbstractControl;

  @ViewChild("Phone")
  Phone:AbstractControl;

  @ViewChild("CurrencyId")
  CurrencyId:AbstractControl;

  
  constructor(private repo: BranchRepository, private repoUser: UserRepository ,private repoCurrency : CurrencyRepository, private confirmationService: ConfirmationService, private log: LogService, private langService: LanguageService) {
    this.repo.getAll().subscribe((res) => {
      if (res.length !==0) {
        this.list = res;
        //this.MobilesNumberArray =this.newObject.Mobiles.split(",");
      } else {
        this.newObject =new Branch();
      }
    });

    this.repoUser.getAll().subscribe((repoUser) =>{
      if (repoUser) {
        this.listOfUsers = repoUser;
        this.Users.push(
          {label: "None" , value: ""}
      );
        this.listOfUsers.forEach(<Users>(element ) => {
          this.Users.push(
              {label: element.Name , value: element.Id}
          );
        });
    } else {
        console.log(repoUser);
    }
    });

    this.repoCurrency.getAll().subscribe((repoCurrency) =>{

      if (repoCurrency) {
        this.listOfCurrencies = repoCurrency;
        this.Currencies.push(
          {label: "None" , value: ""}
      );
        this.listOfCurrencies.forEach(<Currency>(element ) => {

          this.Currencies.push(
              {label: element.CurrencyName , value: element.Id}
          );

        });
    } else {
        console.log(repoUser);
    }
    });
  }

  ngOnInit() {

  }
  showDialogToAdd() {
    this.isNew = true;
    this.newObject = new Branch();
    this.showDialog = true;
    this.editMode=false;
  }
  showDialogToEdit(object) {
    this.isNew = false;
    this.newObject = this.clone(object);
    this.MobilesNumberArray =this.newObject.Mobiles.split(",");
    this.newObject.Mobiles = null;
    this.showDialog = true;
    this.editMode=true;
  }
  cancelDialog() {
    // this.showDialog = false;
    // this.newObject = new Branch();
    // this.MobilesNumberArray =null;
    // this.newObject.Mobiles = null;
this.Reset();
  }
  showDialogToDelete(id, index) {
    this.confirmationService.confirm({
      message: this.langService.IsEnglish ? "are you sure ? " : "هل انت متاكد",
      accept: () => {

        this.repo.delete(id).subscribe((data: any) => {
          this.newObject.Id = data.Id;
          this.list.splice(index, 1);
          this.list = [...this.list];
          this.showDialog = false;
        });
      }
    });
  }
  save() {
debugger;
     this.newObject.Code = this.GeneratorCode();
     if (!this.newObject.Code) {
       return this.log.pop(LogLevel.Error,this.langService.IsEnglish ? "Code is required" : "الكود مطلوب");
    }
     if (!this.newObject.BranchName) {
      return this.log.pop(LogLevel.Error,this.langService.IsEnglish ? "Branch Name is required" : "اسم الفرع مطلوب");
    }
    if (!this.newObject.Phone) {
      return this.log.pop(LogLevel.Error,this.langService.IsEnglish ? "Phone is required"  : "رقم الهاتف مطلوب");
    }
    if (!this.newObject.CurrencyId) {
      return this.log.pop(LogLevel.Error, this.langService.IsEnglish ?"Currency is required" : "العمله مطلوبه");
    }
    if (!this.newObject.UserId) {
      return this.log.pop(LogLevel.Error, this.langService.IsEnglish ?"User is required" : "العمله مطلوبه");
    }
    this.newObject.Mobiles = this.MobilesNumberArray.toString();
    this.repo.create(this.newObject).subscribe((data: any) => {


      if (!this.newObject.Id) // add new in list
      {
        this.list = [...this.list, data];
      }
      this.Reset();
    });
  }

  update()
  {
debugger;
    if (!this.newObject.Code) {
      return this.log.pop(LogLevel.Error,this.langService.IsEnglish ? "Code is required" : "الكود مطلوب");
   }
    if (!this.newObject.BranchName) {
     return this.log.pop(LogLevel.Error,this.langService.IsEnglish ? "Branch Name is required" : "اسم الفرع مطلوب");
   }
   if (!this.newObject.Phone) {
     return this.log.pop(LogLevel.Error,this.langService.IsEnglish ? "Phone is required"  : "رقم الهاتف مطلوب");
   }
   if (!this.newObject.CurrencyId) {
     return this.log.pop(LogLevel.Error, this.langService.IsEnglish ?"Currency is required" : "العمله مطلوبه");
   }
   if (!this.newObject.UserId) {
    return this.log.pop(LogLevel.Error, this.langService.IsEnglish ?"User is required" : "العمله مطلوبه");
  }
   this.newObject.Mobiles = this.MobilesNumberArray.toString();
   this.repo.update(this.newObject).subscribe((data: any) => {

  // edit
       let branch: Branch = data;
       let existed_branch = this.list.find((c: Branch) => c.Id === branch.Id);
       if (existed_branch) {
         this.list.splice(this.list.indexOf(existed_branch), 1, branch);
         this.list = [...this.list];
       }
       this.Reset();
   });
  }

  Reset()
  {
    this.CurrencyId.reset();
    this.Phone.reset();
    this.BranchName.reset();
    this.newObject =new Branch();
    this.MobileNumber  =null;
    this.MobilesNumberArray=[];
    this.showDialog = false;
  }
  CancelMobile(str)
  {

    let Index = this.MobilesNumberArray.indexOf(str,0);
    this.MobilesNumberArray.splice(Index,1);

  }
  AddMobileNumber()
  {
    if(this.MobileNumber != null)
    {
      this.MobilesNumberArray.push(this.MobileNumber);
      this.MobileNumber = null;
    }
  }
  clone(c: Branch): Branch {
    let object = new Branch();
    for (let prop in c) {
      object[prop] = c[prop];
    }
    return object;
  }

   GeneratorCode() {
    let text = "";
    let possible = "0123456789ASDFGHJKLZXCVBNMQWERTYUIOP";

    for (let i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
