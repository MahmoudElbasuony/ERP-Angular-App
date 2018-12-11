import { BaseModel } from "../../common/models/BaseModel";

export class EntryDetail extends BaseModel {


  public Debit = 0;
  public Credit = 0;
  public OrderId: string = null;
  public Description: string = null;
  public AccountId: string = null;
  public AccountCode: string = null;
  public EntryId: string = null;
  public CostCenterId: string = null;
  public CumulativeBalance = 0.0;


}
