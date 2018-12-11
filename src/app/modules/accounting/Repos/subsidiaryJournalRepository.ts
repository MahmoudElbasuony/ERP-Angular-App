
import { BaseCrudRepository } from "../../shared/repos/BaseCrudRepository";
import { Inject } from "@angular/core";
import { SystemServiceService } from "../../../system-service.service";
import { SubsidiaryJournal } from "../models/subsidiary-journal";


        export class SubsidiaryJournalRepository  extends BaseCrudRepository<SubsidiaryJournal> {
            protected controllerUrl: string;
           constructor( @Inject(SystemServiceService) systemService: SystemServiceService){
               super("SubsidiaryJournal",systemService);
                  
           } 
        }
    