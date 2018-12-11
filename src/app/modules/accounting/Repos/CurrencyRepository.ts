
import { BaseCrudRepository } from "../../shared/repos/BaseCrudRepository";
import { Inject } from "@angular/core";
import { SystemServiceService } from "../../../system-service.service";
import { Currency } from "../models/Currency";


export class CurrencyRepository extends BaseCrudRepository<Currency> {
  protected controllerUrl: string;
  constructor(@Inject(SystemServiceService) systemService: SystemServiceService) {
    super("Currency", systemService);

  }
}
