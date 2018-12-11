import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../../../shared/services/LanguageService';
import { BasicDataRepository } from '../../../../repos/BasicDataRepository';
import { LogService, LogLevel } from '../../../../../shared/services/LogService';
import { CountryRepository } from '../../../../repos/CountryRepository';
import { BasicData } from '../../../../models/BasicData';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Country } from '../../../../models/Country';
import { ApplicationRef } from '@angular/core/src/application_ref';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'basic-data',
  templateUrl: './basic-data.component.html',
  styleUrls: ['./basic-data.component.css'],
  providers: [BasicDataRepository, CountryRepository]
})

export class BasicDataComponent implements OnInit {
  showDialog = false;
  isNew: boolean;
  editMode :boolean =false;
  selectedObject: BasicData;
  Countries: SelectItem[] = [];
  Currencies: SelectItem[] = [];
  listOfCurrencies: object[] = [];
  listOfCountries: object[] = [];
  newObject: BasicData = new BasicData();
  resCountry: Country[];
  constructor(private langService: LanguageService, private repo: BasicDataRepository, private repoCountry: CountryRepository, private log: LogService) {

    this.repo.getAll().subscribe((res) => {

      if (res.length !== 0) {
        this.newObject = res[0];
        this.editMode =true;
      } else {
        this.newObject = new BasicData();
      }
    });
    this.repoCountry.getAll().subscribe((resCountry) => {

      if (resCountry) {
        this.listOfCountries = resCountry;
        this.listOfCountries.forEach(<Country>(element) => {

          this.Countries.push(
            { label: element.NameEn, value: element.Id }
          );

        });
      } else {
        console.log(resCountry);
      }
    });

  }

  ngOnInit() {
  }

  save() {

    if (!this.newObject.NameAr) {
      return this.log.pop(LogLevel.Error, "Name Arabic is required");
    }
    if (!this.newObject.NameEn) {
      return this.log.pop(LogLevel.Error, "Name english is required");
    }

    this.repo.create(this.newObject).subscribe((data: any) => {
      
      debugger;
        this.newObject.Id = data.Id;
        this.editMode =true;
    });
  }

  update (){
    if (!this.newObject.NameAr) {
      return this.log.pop(LogLevel.Error, "Name Arabic is required");
    }
    if (!this.newObject.NameEn) {
      return this.log.pop(LogLevel.Error, "Name english is required");
    }

    this.repo.update(this.newObject).subscribe((data: any) => {
     
    });

  }
  clone(c: BasicData): BasicData {
    let object = new BasicData();
    for (let prop in c) {
      object[prop] = c[prop];
    }
    return object;
  }
}



