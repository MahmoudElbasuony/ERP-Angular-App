import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../shared/services/LanguageService';
import { FinancialYear } from '../../models/Financial-years';
import { LogService } from '../../../shared/services/LogService';
import { ConfirmationService } from 'primeng/primeng';
import { FinancialYearRepository } from '../../Repos/FinancialYearsRepository';
import { LogLevel } from '../../../shared/models/User';

@Component({
  selector: 'financial-years',
  templateUrl: './financial-years.component.html',
  styleUrls: ['./financial-years.component.css'],
  providers: [FinancialYearRepository ,ConfirmationService]
})
export class FinancialYearsComponent implements OnInit {

  newObject : FinancialYear = new FinancialYear();
  list : FinancialYear[] =[];  
  editMode : boolean =false;
  constructor(private toaster: LogService,private langService:LanguageService ,  private confirmationService: ConfirmationService, private repo: FinancialYearRepository ,private log : LogService ) { 
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

  }

  Save() {
      debugger;
       this.newObject.Code = this.GeneratorCode();
       if (!this.newObject.Code) {
         return this.log.pop(LogLevel.Error, "Code is required");
      }
       if (!this.newObject.YearName) {
        return this.log.pop(LogLevel.Error, "Year Name is required");
      }
      if (!this.newObject.YearStart) {
        return this.log.pop(LogLevel.Error, "Year Start is required");
      }

      if (!this.newObject.YearEnd) {
        return this.log.pop(LogLevel.Error, "Year End is required");
      }
      if (!this.newObject.PeriodsCount) {
        return this.log.pop(LogLevel.Error, "Periods Count is required");
      }
      
     
      let financialYear: FinancialYear = this.newObject;
      let group_index = this.list.findIndex(g => g.Id === financialYear.Id);
      if (group_index >= 0) {
      this.list.splice(group_index, 1, financialYear);
      this.list = [...this.list,this.newObject];
      }
      this.repo.create(this.newObject).subscribe((data: any) => { 
        debugger;
    
        if (!this.newObject.Id) // Add
        {
          this.list = [...this.list, data];
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
   this.newObject = new FinancialYear();
   this.editMode =false;
 }

 OnEditFinancialYear(financialYears:FinancialYear) {
  this.newObject = this.clone(financialYears);
  this.editMode =true;
}

onDeleteFinancialYear(_financialYears: FinancialYear) {
  debugger;
  if (_financialYears.Id) {
    this.confirmationService.confirm({
      accept: () => {

        this.repo.delete(_financialYears.Id).subscribe((currency) => {
          let currency_index = this.list.findIndex(c => c.Id === currency.Id);
          if (currency_index >= 0)
            this.list.splice(currency_index, 1);
          this.toaster.pop(LogLevel.Success, "Financial Year Deleted Successfully");
        });
      },
      message: "Do you want to delete Financial Year ?"
    });
  }
}
// 

clone(c: FinancialYear): FinancialYear {
  let obj = new FinancialYear();
  for (let prop in c) {
    obj[prop] = c[prop];
  }
  return obj;
}

}
