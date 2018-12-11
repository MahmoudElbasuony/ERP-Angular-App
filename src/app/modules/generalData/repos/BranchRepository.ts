import { Observable } from 'rxjs/Rx';
  import { SystemServiceService } from '../../../system-service.service';
import { Inject } from '@angular/core';
import { Branch } from '../models/Branch';
import { BaseCrudRepository } from '../../shared/repos/BaseCrudRepository';
  
      
export class BranchRepository  extends BaseCrudRepository<Branch> {
    protected controllerUrl: string;
    constructor( @Inject(SystemServiceService) systemService:  SystemServiceService){
        super("Branch",systemService); 
        
    } 
    
}
    
    