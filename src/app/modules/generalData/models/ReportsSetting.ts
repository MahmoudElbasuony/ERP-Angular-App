import { BaseModel } from "../../common/models/BaseModel";
import { DocumentFile } from "./Document";
export class ReportsSetting extends BaseModel {


  public LogoFile: DocumentFile;

  public ManagerSignFile: DocumentFile;

  public HeaderFile: DocumentFile;

  public FooterFile: DocumentFile;

}
