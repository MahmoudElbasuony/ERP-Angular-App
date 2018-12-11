import { Observable } from 'rxjs/Rx';
import { SystemServiceService } from '../../../system-service.service';
import { Inject } from '@angular/core';
import { Country } from '../models/Country';
import { BaseCrudRepository } from '../../shared/repos/BaseCrudRepository';
  
      
export class CountryRepository  extends BaseCrudRepository<Country> {
    protected controllerUrl: string;
    constructor( @Inject(SystemServiceService) systemService:  SystemServiceService){
        super("Country",systemService); 
    } 
}
    
    