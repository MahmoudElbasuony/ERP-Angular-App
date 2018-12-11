import { Component, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from '../../../shared/services/LanguageService';
import { Country } from '../../models/Country';
import { CountryRepository } from '../../repos/CountryRepository';
import { LogService, LogLevel } from '../../../shared/services/LogService';
import { ConfirmationService } from 'primeng/primeng';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
  providers: [CountryRepository]
})
export class CountriesComponent implements OnInit {
  showDialog = false;
  isNew: boolean;
  selectedObject: Country;
  list: object[] = [];
  newObject: Country = new Country();


  @ViewChild("countryForm")
  countryForm: NgForm;


  constructor(private repo: CountryRepository, private confirmationService: ConfirmationService, private log: LogService, private langService: LanguageService) {
    this.repo.getAll().subscribe((res) => {
      if (res) {
        this.list = res;
      } else {
        console.log(res);
      }
    });
  }

  ngOnInit() {

  }
  showDialogToAdd() {
    this.isNew = true;
    this.newObject = new Country();
    this.showDialog = true;
  }
  showDialogToEdit(object) {
    this.isNew = false;
    this.newObject = this.clone(object);
    this.showDialog = true;
  }
  cancelDialog() {
    this.showDialog = false;
    this.newObject = new Country();
  }
  showDialogToDelete(id, index) {
    this.confirmationService.confirm({
      message: this.langService.IsEnglish ? "are you sure ? " : "هل انت متاكد",
      accept: () => {

        this.repo.delete(id).subscribe((data: any) => {


          this.newObject.Id = data.Id;
          this.list.splice(index, 1);
          this.showDialog = false;
        });
      }
    });
  }
  save() {
    if (!this.newObject.NameAr) {
      return this.log.pop(LogLevel.Error, "Name Arabic is required");
    }
    if (!this.newObject.NameEn) {
      return this.log.pop(LogLevel.Error, "Name english is required");
    }



    if (!this.newObject.Id) {

      this.repo.create(this.newObject).subscribe((data: any) => {

        this.list = [...this.list, this.clone(data)];
        this.showDialog = false;

      });
    }
    else {


      this.repo.update(this.newObject).subscribe((data: any) => {

        let country: Country = data;

        let existed_country = this.list.find((c: Country) => c.Id === country.Id);
        if (existed_country) {
          this.list.splice(this.list.indexOf(existed_country), 1, country);
        }

        this.showDialog = false;

        //this.LoadAllCities();
      });
    }

    this.countryForm.reset(new Country());


  }
  clone(c: Country): Country {
    let object = new Country();
    for (let prop in c) {
      object[prop] = c[prop];
    }
    return object;
  }
}
