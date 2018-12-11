import { BaseModel } from "../../common/models/BaseModel";

export class Group extends BaseModel{

    Id: string;
    Name: string;
    Description : string;

    First : number;
    Rows : number;

    IsDefault : boolean;
    CanDelete : boolean;
    IsAdminGroup : boolean;
}

