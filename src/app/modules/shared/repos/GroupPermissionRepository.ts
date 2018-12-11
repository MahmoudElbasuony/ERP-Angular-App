import { BaseCrudRepository } from "./BaseCrudRepository";
import { SystemServiceService } from "../../../system-service.service";
import { Permission } from "../models/Permission";
import { Injectable } from "@angular/core";

@Injectable()
export class GroupPermissionRepository extends BaseCrudRepository<Permission>{


  constructor(systemService: SystemServiceService) {
    super("GroupPermission", systemService);
  }


  updateAllPermissions(permissions: Permission[]) {
     return this.updateAll(permissions);
  }

}
