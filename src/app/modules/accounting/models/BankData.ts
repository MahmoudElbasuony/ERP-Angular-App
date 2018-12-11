import { BaseModel } from "../../common/models/BaseModel";


export class BankData extends BaseModel {
  Code :string;
  BankName: string;
  BankBranch: string;
  AccountNumber : string;
  AccountName: string;
  Currency :string;
  Branch :string;
  OpiningBalance :number;
  BalanceDate :Date;
  Account :string;
  SubsidiaryJournal :string;
  parentId :string;
  }
