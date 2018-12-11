import { BaseModel } from "../../common/models/BaseModel";


export class CostCenter extends BaseModel {

  CenterName: string;
  Type: string;
  Code : string;
  Balance: string;
  parentId :string;
  }
