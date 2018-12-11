import { Component, OnInit,ViewChild } from '@angular/core';
import { LanguageService } from '../../../shared/services/LanguageService';

import { LogService, LogLevel } from '../../../shared/services/LogService';
import { ConfirmationService } from 'primeng/primeng';
import { CityRepository } from '../../repos/CityRepository';
import { City } from '../../models/City';
import { Country } from '../../models/Country';
import { CountryRepository } from '../../repos/CountryRepository';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
  providers: [CityRepository, CountryRepository]
})
export class CitiesComponent implements OnInit {

  showDialog = false;
  isNew: boolean;
  selectedObject: City;
  list: object[] = [];
  newObject: City = new City();
  Countries: Country[];

 @ViewChild("cityForm")
 CityForm : NgForm;

  constructor(private repo: CityRepository, private countryRepos: CountryRepository, private confirmationService: ConfirmationService, private log: LogService, private langService: LanguageService) {

    this.Countries = [];

    this.LoadAllCities();

    this.countryRepos.getAll().subscribe((countries) => {

      this.Countries = countries;

    });


  }

  ngOnInit() {



  }
  showDialogToAdd() {
    this.isNew = true;
    this.newObject = new City();
    this.showDialog = true;
  }
  showDialogToEdit(object) {
    this.isNew = false;
    this.newObject = this.clone(object);
    this.showDialog = true;
  }
  cancelDialog() {
    this.showDialog = false;
    this.newObject = new City();
  }

  showDialogToDelete(id, index) {
    this.confirmationService.confirm({
      message: this.langService.IsEnglish ? "are you sure ? " : "هل انت متاكد",
      accept: () => {

        this.repo.delete(id).subscribe((data: any) => {

          this.list.splice(index, 1);
          this.list = [...this.list];
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
    if ( !this.newObject.CountryId) {
      return this.log.pop(LogLevel.Error, "Country is required");
    }


    if (!this.newObject.Id) {
      this.repo.create(this.newObject).subscribe((data: any) => {



        this.list = [...this.list, this.clone(data)];
        this.showDialog = false;


        //this.LoadAllCities();
      });
    }
    else {


      this.repo.update(this.newObject).subscribe((data: any) => {

        let city: City = data;

        let existed_country = this.list.find((c: City) => c.Id === city.Id);
        if (existed_country) {
          this.list.splice(this.list.indexOf(existed_country), 1, city);
        }

        this.showDialog = false;

        //this.LoadAllCities();
      });
    }

    this.CityForm.reset(new City());
  }
  clone(c: City): City {
    let object = new City();
    for (let prop in c) {
      object[prop] = c[prop];
    }
    return object;
  }



  LoadAllCities(){
    this.repo.getAll().subscribe((res) => {
      if (res) {
        this.list = res;
      }
    });
  }
}









