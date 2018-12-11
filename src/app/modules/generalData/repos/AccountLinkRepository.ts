import { SystemServiceService } from "../../../system-service.service";
import { BaseCrudRepository } from "../../shared/repos/BaseCrudRepository";
import { AccountLink } from "../models/AccountLink";
import { Inject } from "@angular/core";

export class AccountLinkRepository extends BaseCrudRepository<AccountLink> {
  protected controllerUrl: string;
  constructor( @Inject(SystemServiceService) systemService: SystemServiceService) {
    super("AccountsLink", systemService);

  }

}

