import { BaseModel } from "../../common/models/BaseModel";
import { Group } from "./Group";



export class User extends BaseModel {
  Id: string;
  Name: string;
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
  Mobile: string;
  IsDisabled: boolean;
  IsSystemAdmin: boolean;
  Roles: Group[];

  constructor() {
    super();
    this.Roles = [];

  }
}

export enum LogLevel {
  Info = 1,
  Error,
  Warning,
  Success
}


