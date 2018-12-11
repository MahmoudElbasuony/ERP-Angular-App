import { Observable } from 'rxjs/Rx';
import { SystemServiceService } from '../../../system-service.service';
import { Inject } from '@angular/core';
import { BaseCrudRepository } from '../../shared/repos/BaseCrudRepository';
import { City } from '../models/City';


export class CityRepository  extends BaseCrudRepository<City> {
    protected controllerUrl: string;
    constructor( @Inject(SystemServiceService) systemService:  SystemServiceService){
        super("City",systemService);
    }
}

