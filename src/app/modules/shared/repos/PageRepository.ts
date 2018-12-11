import { BaseCrudRepository } from "./BaseCrudRepository";
import { SystemServiceService } from "../../../system-service.service";
import { Injectable } from "@angular/core";
import { Page } from "../models/Page";

@Injectable()
export class PageRepository extends BaseCrudRepository<Page>{


  constructor( systemService: SystemServiceService) {

    super("Page", systemService);

  }



}
