import { BaseModel } from "../../common/models/BaseModel";
import { Country } from "./Country";

export class City extends BaseModel {
  NameAr: string;
  NameEn: string;
  CountryId : string;
  Country : Country;
}

