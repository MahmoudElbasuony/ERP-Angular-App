import { SystemServiceService } from './../../../system-service.service';
import { BaseCrudRepository } from "../../shared/repos/BaseCrudRepository";
import { Entry } from "../models/Entry";
import { Inject } from "@angular/core";

export class EntryRepository  extends BaseCrudRepository<Entry>  {

  protected controllerUrl: string;
  constructor(@Inject(SystemServiceService) systemService: SystemServiceService) {
    super("Entry", systemService);

  }

}
