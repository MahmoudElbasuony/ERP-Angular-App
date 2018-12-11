import { BaseCrudRepository } from "./BaseCrudRepository";
import { Group } from "../models/Group";
import { SystemServiceService } from "../../../system-service.service";
import { Injectable } from "@angular/core";

@Injectable()
export class GroupRepository extends BaseCrudRepository<Group>{


  constructor( systemService: SystemServiceService) {

    super("Group", systemService);

  }



}
