import { BaseModel } from "../../common/models/BaseModel";

export class Currency extends BaseModel {
   Id :string;
  CurrencyName: string;
  ExchangeRate: string;
  Code : string;
  DefaultCurrency: Boolean;
  }
