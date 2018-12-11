import { BaseCrudRepository } from "../../shared/repos/BaseCrudRepository";
import { Inject } from "@angular/core";
import { SystemServiceService } from "../../../system-service.service";
import { BankData } from "../models/BankData";


        export class BankDataRepository  extends BaseCrudRepository<BankData> {
            protected controllerUrl: string;
           constructor( @Inject(SystemServiceService) systemService: SystemServiceService){
               super("BankData",systemService);
                  
           } 
        }
    