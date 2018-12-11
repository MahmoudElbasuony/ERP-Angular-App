
import { BaseCrudRepository } from "../../shared/repos/BaseCrudRepository";
import { Inject } from "@angular/core";
import { SystemServiceService } from "../../../system-service.service";
import { CostCenter } from "../models/CostCenter";


        export class CostCenterRepository  extends BaseCrudRepository<CostCenter> {
            protected controllerUrl: string;
           constructor( @Inject(SystemServiceService) systemService: SystemServiceService){
               super("CostCenter",systemService);
                  
           } 
        }
    