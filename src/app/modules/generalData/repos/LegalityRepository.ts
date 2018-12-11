import { Legality } from "../models/Legality";
import { BaseCrudRepository } from "../../shared/repos/BaseCrudRepository";
import { Inject } from "@angular/core";
import { SystemServiceService } from "../../../system-service.service";


        export class LegalityRepository  extends BaseCrudRepository<Legality> {
            protected controllerUrl: string;
           constructor( @Inject(SystemServiceService) systemService: SystemServiceService){
               super("Legality",systemService);
               
           } 
          
        }
    