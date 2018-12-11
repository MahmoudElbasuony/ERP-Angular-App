
export enum ObjectState {
  Unchanged,
  Created,
  Changed,
  Deleted
}

export abstract class BaseModel {

  constructor() {
  }

  Id: string;
  State: ObjectState = ObjectState.Unchanged;
  RowVersion: any;
  CreatedOn?: Date;
  ModifiedOn?: Date;
  CreatedBy?: Date;
  ModifiedBy?: Date;
}


