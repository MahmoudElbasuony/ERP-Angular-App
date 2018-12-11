import { BaseModel } from "../../common/models/BaseModel";

export class Safe extends BaseModel {

  Code: string;
  SafeName : DateTimeFormat;
  OpeningBalance : DateTimeFormat;
  BalanceDate :number;
  Branch : string;

}
