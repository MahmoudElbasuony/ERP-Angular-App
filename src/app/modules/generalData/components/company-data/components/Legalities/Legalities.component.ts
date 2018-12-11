import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../../../shared/services/LanguageService';
import { LogService, LogLevel } from '../../../../../shared/services/LogService';
import { Legality } from '../../../../models/Legality';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Country } from '../../../../models/Country';
import { ApplicationRef } from '@angular/core/src/application_ref';
import { ConfirmationService } from 'primeng/primeng';
import { LegalityRepository } from '../../../../repos/LegalityRepository';

@Component({
  selector: 'Legalities',
  templateUrl: './Legalities.component.html',
  styleUrls: ['./Legalities.component.css'],
  providers: [LegalityRepository]
})

export class LegalitiesComponent implements OnInit {
newObject : Legality = new Legality();
LegalityObject : Legality = new Legality();
editMode:boolean= false;
constructor(private langService: LanguageService , private repo: LegalityRepository,private log : LogService ) {

  this.repo.getAll().subscribe((res) => {
    if (res.length !=0) {
        this.newObject = res[0];
        this.editMode=true;
    } else {
      this.newObject = new Legality();
    }
});
}

ngOnInit() {
}

save(){
  

  this.repo.create(this.newObject).subscribe((data: any)=>{
    debugger;
     this.newObject.Id=data.Id;
     this.editMode= true;
  });
  
}
update(){

  this.repo.update(this.newObject).subscribe((data: any)=>{
     
  });
}
clone(c: Legality): Legality {
  let object = new Legality();
  for (let prop in c) {
      object[prop] = c[prop];
  }
  return object;
}
}
