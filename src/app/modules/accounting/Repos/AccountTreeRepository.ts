import { BaseCrudRepository } from "../../shared/repos/BaseCrudRepository";
import { Inject } from "@angular/core";
import { SystemServiceService } from "../../../system-service.service";
import { Account } from "../models/Account";



export class AccountTreeRepository extends BaseCrudRepository<Account> {
  protected controllerUrl: string;
  public systemServ: SystemServiceService;
  constructor( @Inject(SystemServiceService) systemService: SystemServiceService) {
    super("Accounts", systemService);
    this.systemServ = systemService;

  }

  GetAccountTree() {
    return this.systemServ.getAll(this.controllerUrl + "/GetAccountTree");
  }

}
