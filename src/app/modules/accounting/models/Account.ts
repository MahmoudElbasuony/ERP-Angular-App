import { BaseModel } from "../../common/models/BaseModel";


export class Account extends BaseModel {
  ShortcutCode: string;
  AccountCode: string;
  AccountName: string;
  AccountType: string;
  AccountNatural: string;
  ParentAccount: string;
  FinalAccount: number;
  Currency: Date;
  HasCostCenter: boolean;
  CostCenter: string;
  AccountBalance: Number;
  parentId: string;
}


