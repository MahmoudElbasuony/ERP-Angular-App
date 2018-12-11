import { Component, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from '../../../shared/services/LanguageService';
import { LogService } from '../../../shared/services/LogService';
import { CurrencyRepository } from '../../Repos/CurrencyRepository';
import { Currency } from '../../models/Currency';
import { LogLevel } from '../../../shared/services/LogService';
import { ConfirmationService } from 'primeng/primeng';
import { AbstractControl } from '@angular/forms';
import { MenuItem } from 'primeng/components/common/menuitem';
@Component({
  selector: 'currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css'],
  providers: [CurrencyRepository ,ConfirmationService]
})
export class CurrenciesComponent implements OnInit {

  @ViewChild("ExchangeRate")
  ExchangeRate:AbstractControl;
  @ViewChild("CurrencyName")
  CurrencyName:AbstractControl;

  newObject : Currency = new Currency();
  list : Currency[] =[];  
  items: MenuItem[];
  selectedCurrency :Currency;
  editMode : boolean =false;
  constructor(private toaster: LogService,private langService:LanguageService ,  private confirmationService: ConfirmationService, private repo: CurrencyRepository ,private log : LogService ) { 
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
      {label: 'Edit', icon: 'fa-search', command: (event) => this.OnEditCurrency(this.selectedCurrency)},
      {label: 'Delete', icon: 'fa-close', command: (event) => this.onDeleteCurrency(this.selectedCurrency)}
  ];
  }

  Save() {
      debugger;
       this.newObject.Code = this.GeneratorCode();
       if (!this.newObject.Code) {
         return this.log.pop(LogLevel.Error, "Code is required");
      }
       if (!this.newObject.CurrencyName) {
        return this.log.pop(LogLevel.Error, "Currency Name is required");
      }
      if (!this.newObject.ExchangeRate) {
        return this.log.pop(LogLevel.Error, "Exchange Rate is required");
      }
     
      this.repo.create(this.newObject).subscribe((data: any) => { 
        debugger;
    
        
          this.list = [...this.list, data];
       
      
      this.Reset(); 
      });
    }
    Update(){

      debugger;
     
    if (!this.newObject.Code) {
        return this.log.pop(LogLevel.Error, "Code is required");
     }
      if (!this.newObject.CurrencyName) {
       return this.log.pop(LogLevel.Error, "Currency Name is required");
     }
     if (!this.newObject.ExchangeRate) {
       return this.log.pop(LogLevel.Error, "Exchange Rate is required");
     }
    
     let currency: Currency = this.newObject;
     let group_index = this.list.findIndex(g => g.Id === currency.Id);
     if (group_index >= 0) {
     this.list.splice(group_index, 1, currency);
     this.list = [...this.list];
     }
     this.repo.update(this.newObject).subscribe((data: any) => { 
       debugger; 
     this.Reset(); 
     });

    }
    GeneratorCode() {
      var text = "";
      var possible = "0123456789ADFGHJKLLZXCVBNMQWERTYUIOP";
    
      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
      return text;
    }
 Reset()
 {
   this.newObject = new Currency();
   this.editMode =false;
   this.ExchangeRate.reset();
   this.CurrencyName.reset();
 }

 OnEditCurrency(currency:Currency) {
  this.newObject = this.clone(currency);
  this.editMode =true;
}

OnEditCurrencyTable(event) {
  debugger;
  this.newObject = this.clone(event.data);
  this.editMode =true;
}

onDeleteCurrency(_currency: Currency) {
  debugger;
  if (_currency.Id) {
    let currency_index = this.list.findIndex(c => c.Id === _currency.Id);
    if (currency_index >= 0)
      this.list.splice(currency_index, 1);
      this.list = [...this.list];

    this.confirmationService.confirm({
      accept: () => {
        this.repo.delete(_currency.Id).subscribe((currency) => {
        });
      },
      message: "Do you want to delete this Currency ?"
    });
  }
}
// 

clone(c: Currency): Currency {
  let obj = new Currency();
  for (let prop in c) {
    obj[prop] = c[prop];
  }
  return obj;
}

}


// showDialogToAdd() {
//   this.isNew = true;
//   this.newObject = new Branch();
//   this.showDialog = true;
// }
// showDialogToEdit(object) {
//   this.isNew = false;
//   this.newObject = this.clone(object);
//   this.MobilesNumberArray =this.newObject.Mobiles.split(",");
//   this.newObject.Mobiles = null;
//   this.showDialog = true;
// }
// cancelDialog() {
//   this.showDialog = false;
//   this.newObject = new Branch();
//   this.MobilesNumberArray =null;
//   this.newObject.Mobiles = null;

// }
// showDialogToDelete(id, index) {
//   this.confirmationService.confirm({
//     message: 'Are you sure that you want to delete this?',
//     accept: () => {

//       this.repo.delete(id).subscribe((data: any) => {
//         this.newObject.Id = data.Id;
//         this.list.splice(index, 1);
//         this.list = [...this.list];
//         this.showDialog = false;
//       });
//     }
//   });
// }
// save() {
//   debugger;
//    this.newObject.Code = this.GeneratorCode();
//    if (!this.newObject.Code) {
//      return this.log.pop(LogLevel.Error, "Code is required");
//   }
//    if (!this.newObject.BranchName) {
//     return this.log.pop(LogLevel.Error, "Branch Name is required");
//   }
//   if (!this.newObject.Phone) {
//     return this.log.pop(LogLevel.Error, "Phone is required");
//   }
//   if (!this.newObject.CurrencyId) {
//     return this.log.pop(LogLevel.Error, "Currency is required");
//   }
//   this.newObject.Mobiles = this.MobilesNumberArray.toString();
//   this.repo.create(this.newObject).subscribe((data: any) => { 
//     debugger;

//     if (!this.newObject.Id) // add new in list
//     {
//       this.list = [...this.list, data];
//     }
//     else {  // edit
//       let branch: Branch = data;
//       let existed_branch = this.list.find((c: Branch) => c.Id === branch.Id);
//       if (existed_branch) {
//         this.list.splice(this.list.indexOf(existed_branch), 1, branch);
//         this.list = [...this.list];
//       }
//     }
//     this.newObject =new Branch();
//     this.MobileNumber  =null;
//     this.MobilesNumberArray=[];
//     this.showDialog = false;
//   });
// }

// CancelMobile(str)
// {
//   debugger;
//   var Index = this.MobilesNumberArray.indexOf(str,0);
//   this.MobilesNumberArray.splice(Index,1);

// }
// AddMobileNumber()
// {
//   if(this.MobileNumber != null)
//   {
//     this.MobilesNumberArray.push(this.MobileNumber);
//     this.MobileNumber = null
//   }
// }
// clone(c: Branch): Branch {
//   let object = new Branch();
//   for (let prop in c) {
//     object[prop] = c[prop];
//   }
//   return object;
// }

 