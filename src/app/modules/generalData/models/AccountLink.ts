import { BaseModel } from "../../common/models/BaseModel";
import { AccountLinkDetail } from "./AccountLinkDetail";
import { AccountsLinkType } from "./Enums/AccountsLinkType";

export class AccountLink extends BaseModel{
  public NameAr: string;
  public NameEn: string;
  public AccountsLinkType  : AccountsLinkType;
  public AccountLinkDetails : AccountLinkDetail[] = [];
}
