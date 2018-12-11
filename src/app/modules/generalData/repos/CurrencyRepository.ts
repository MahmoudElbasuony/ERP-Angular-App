import { Observable } from 'rxjs/Rx';
import { SystemServiceService } from '../../../system-service.service';
import { Inject } from '@angular/core';
import { Currency } from '../models/currency';
import { BaseCrudRepository } from '../../shared/repos/BaseCrudRepository';
  
      
export class CurrencyRepository  extends BaseCrudRepository<Currency> {
    protected controllerUrl: string;
    constructor( @Inject(SystemServiceService) systemService:  SystemServiceService){
        super("Currency",systemService); 
    } 
}
    
    