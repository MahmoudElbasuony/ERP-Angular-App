import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../../../shared/services/LanguageService';
import { LogService, LogLevel } from '../../../../../shared/services/LogService';
import {ContactsDataRepository } from '../../../../repos/ContactsDataRepository';
import { ContactsData } from '../../../../models/ContactsData';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Country } from '../../../../models/Country';
import { ApplicationRef } from '@angular/core/src/application_ref';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'contacts-data',
  templateUrl: './contacts-data.component.html',
  styleUrls: ['./contacts-data.component.css'],
  providers: [ContactsDataRepository]
})

export class ContactsDataComponent implements OnInit {
    showDialog = false;
    MobileNumber :string =null;
    PhoneNumber : string = null;
    FaxNumber :string=null;
    PhoneNumberArray : string[]=[];
    MobilesNumberArray : string[]=[];
    FaxesNumberArray : string[]=[];
    editMode:boolean =false;
    newObject : ContactsData = new ContactsData();
    
  constructor(private langService: LanguageService , private repo: ContactsDataRepository,private log : LogService ) {

    this.repo.getAll().subscribe((res) => {
      if (res.length !=0) {
        debugger;
          this.newObject = res[0];
          this.editMode =true;
         
          this.PhoneNumberArray =this.newObject.PhonesNumber.split(",");
          this.MobilesNumberArray =this.newObject.Mobiles.split(",");
          this.FaxesNumberArray =this.newObject.Faxes.split(",");
      } else {
          console.log(res);
          this.newObject = new ContactsData(); 
      }
  });

 
}

  ngOnInit() {
  }

save(){
   
   this.newObject.PhonesNumber = this.PhoneNumberArray.toString();
   this.newObject.Mobiles = this.MobilesNumberArray.toString();
   this.newObject.Faxes = this.FaxesNumberArray.toString();
   this.repo.create(this.newObject).subscribe((data: any)=>{
       this.newObject.Id= data.Id;
       this.editMode =true;
    });
  }

  update(){
   
    this.newObject.PhonesNumber = this.PhoneNumberArray.toString();
    this.newObject.Mobiles = this.MobilesNumberArray.toString();
    this.newObject.Faxes = this.FaxesNumberArray.toString();
    this.repo.update(this.newObject).subscribe((data: any)=>{
      this.newObject.Id= data.Id;
      this.editMode =true;
     });
   }
  CancelPhone(str)
  {
     
    var Index = this.PhoneNumberArray.indexOf(str,0);
    this.PhoneNumberArray.splice(Index,1);

  }
  CancelMobile(str)
  {
    
    var Index = this.MobilesNumberArray.indexOf(str,0);
    this.MobilesNumberArray.splice(Index,1);

  }
  CancelFax(str)
  {
    
    var Index = this.FaxesNumberArray.indexOf(str,0);
    this.FaxesNumberArray.splice(Index,1);

  }
  AddPhoneNumber()
  {
    if(this.PhoneNumber != null)
    {
      this.PhoneNumberArray.push(this.PhoneNumber);
      this.PhoneNumber = null
    }
  }
  AddMobileNumber()
  {
    if(this.MobileNumber != null)
    {
      this.MobilesNumberArray.push(this.MobileNumber);
      this.MobileNumber = null
    }
  }
  AddFaxNumber()
  {
    if(this.FaxNumber != null)
    {
      this.FaxesNumberArray.push(this.FaxNumber);
      this.FaxNumber =null;
    }
  }
clone(c: ContactsData): ContactsData {
    let object = new ContactsData();
    for (let prop in c) {
        object[prop] = c[prop];
    }
    return object;
  }
}



