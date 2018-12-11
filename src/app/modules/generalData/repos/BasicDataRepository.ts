import { BasicData } from "../models/BasicData";
import { BaseCrudRepository } from "../../shared/repos/BaseCrudRepository";
import { Inject } from "@angular/core";
import { SystemServiceService } from "../../../system-service.service";


        export class BasicDataRepository  extends BaseCrudRepository<BasicData> {
            protected controllerUrl: string;
           constructor( @Inject(SystemServiceService) systemService: SystemServiceService){
               super("BasicData",systemService);
               
           } 
          
        }
    