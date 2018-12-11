import { ContactsData } from "../models/ContactsData";
import { BaseCrudRepository } from "../../shared/repos/BaseCrudRepository";
import { Inject } from "@angular/core";
import { SystemServiceService } from "../../../system-service.service";


        export class ContactsDataRepository  extends BaseCrudRepository<ContactsData> {
            protected controllerUrl: string;
           constructor( @Inject(SystemServiceService) systemService: SystemServiceService){
               super("ContactsData",systemService);
               
           } 
          
        }
    