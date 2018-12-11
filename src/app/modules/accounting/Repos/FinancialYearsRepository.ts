import { BaseCrudRepository } from "../../shared/repos/BaseCrudRepository";
import { Inject } from "@angular/core";
import { SystemServiceService } from "../../../system-service.service";
import { FinancialYear } from "../models/Financial-years";


        export class FinancialYearRepository  extends BaseCrudRepository<FinancialYear> {
            protected controllerUrl: string;
           constructor( @Inject(SystemServiceService) systemService: SystemServiceService){
               super("FinancialYear",systemService);
                  
           } 
        }
    