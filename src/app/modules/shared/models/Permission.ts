import { BaseModel } from "../../common/models/BaseModel";

export class Permission extends BaseModel {


  public CanView: boolean;
  public CanAdd: boolean;
  public CanEdit: boolean;
  public CanDelete: boolean;
  public CanPrint: boolean;
  public PageId: string;
  public RoleId: string;
  public PagePath :string;

}
