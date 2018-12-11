import { Observable } from 'rxjs/Observable';
import * as service from '../../../system-service.service';
import { Inject } from '@angular/core';
import { BaseModel } from '../../common/models/BaseModel';


export interface IBaseCrudRepository<TAggregate> {

  getAll(): Observable<TAggregate[]>;

  get(id: string): Observable<TAggregate>;

  create(value: TAggregate): Observable<TAggregate>;

  update(value: TAggregate): Observable<TAggregate>;

  delete(id: string): Observable<TAggregate>;



}

export abstract class BaseCrudRepository<TAggregate extends BaseModel>
  implements IBaseCrudRepository<TAggregate> {

  protected controllerUrl: string;


  constructor(controllerName: string, private systemService: service.SystemServiceService) {
    this.controllerUrl = controllerName;
  }


  getAll(first?: number, rows?: number): Observable<TAggregate[]> {
    return this.systemService.getAll(this.controllerUrl, first, rows);
  }

  get(id: string): Observable<TAggregate> {
    return this.systemService.get(this.controllerUrl, id);
  }

  create(value: TAggregate): Observable<TAggregate> {
    return this.systemService.post(this.controllerUrl, value);
  }
  /**
   * Update
   * @param value
   */
  update(value: TAggregate): Observable<TAggregate> {
    return this.systemService.update(this.controllerUrl, value);
  }

  updateAll(value: any): Observable<any> {
    return this.systemService.update(this.controllerUrl, value);
  }

  /**
   * Remove using ID
   * @param value
   */
  delete(id: string): Observable<TAggregate> {
    return this.systemService.delete(this.controllerUrl, id);
  }


}
