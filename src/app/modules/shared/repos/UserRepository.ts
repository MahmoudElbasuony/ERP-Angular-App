import { Observable } from 'rxjs/Rx';
import { BaseCrudRepository } from './BaseCrudRepository';
import { User } from '../models/User';
import { SystemServiceService } from '../../../system-service.service';
import { Inject } from '@angular/core';


export class UserRepository  extends BaseCrudRepository<User> {
    protected controllerUrl: string;
    constructor( @Inject(SystemServiceService) systemService: SystemServiceService){
        super("User",systemService);

    }

}

