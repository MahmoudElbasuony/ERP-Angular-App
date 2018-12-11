import { BaseModel } from "../../common/models/BaseModel";
import { EntryDetail } from "./EntryDetail";

export class Entry extends BaseModel {



  public EntryNo : string = null;
  public Date: any = new Date();
  public PeriodId: string = null;
  public DailyId: string = null;
  public EntryDataId : string = null;
  public CurrencyId: string = null;
  public Description: string = null;
  public BillId: string = null;
  public DebitTotal = 0.0;
  public CreditTotal = 0.0;
  public BranchId: string = null;
  public EntrySerial: string = null;
  public IsOpeningHeader = false;

  public EntryDetails: EntryDetail[] = [];




}




