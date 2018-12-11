import { BaseModel } from "../../common/models/BaseModel";

export class Branch extends BaseModel {
  Id:string;
  BranchName: string;
  Code:string;
  Phone:string;
  Fax:string;
  Mobiles:string;
  UserId:string;
  CurrencyId:string;
  Close:boolean;
  CloseDate:boolean;
  
  }
