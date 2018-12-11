import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Group } from '../../../../shared/models/Group';
import { GroupRepository } from '../../../../shared/repos/GroupRepository';

@Component({
  selector: 'group-editor',
  templateUrl: 'group-editor.component.html',
  styleUrls: ['group-editor.component.css']
})
export class GroupEditorComponent implements OnInit {


  private IsEdit: boolean;

  @Input()
  Group: Group;

  @Output()
  OnCloseDialog: EventEmitter<any> = new EventEmitter();

  @Output()
  OnAddOrUpdateGroup: EventEmitter<any> = new EventEmitter();


  constructor(private groupRep: GroupRepository) {
  }

  ngOnInit() {

    if(this.Group && this.Group.Id)
      this.IsEdit = true;

  }


  SaveGroup() {

    if (!this.Group.Id) {
      this.groupRep.create(this.Group).subscribe((group) => {
        this.Group = group;
        this.OnAddOrUpdateGroup.emit(this.Group);
        this.OnCloseDialog.emit(false);
        this.Close();
      });
    }
    else {
      this.groupRep.update(this.Group).subscribe((group) => {
        this.Group = group;
        this.OnAddOrUpdateGroup.emit(this.Group);
        this.OnCloseDialog.emit(false);
        this.Close();
      });
    }
  }



  Close() {
    this.OnCloseDialog.emit(false);
  }


}
