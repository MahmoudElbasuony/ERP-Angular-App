import { BaseModel } from "../../common/models/BaseModel";

export class FinancialYear extends BaseModel {

  YearName: string;
  YearStart : DateTimeFormat;
  YearEnd: DateTimeFormat;
  PeriodsCount :number;
  Code : string;

}
