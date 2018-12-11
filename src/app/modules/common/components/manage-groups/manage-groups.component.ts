import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../shared/services/LanguageService';
import { Group } from '../../../shared/models/Group';
import { GroupRepository } from '../../../shared/repos/GroupRepository';
import { ConfirmationService } from 'primeng/primeng';
import { LogService, LogLevel } from '../../../shared/services/LogService';

@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.css'],
  providers: [GroupRepository, ConfirmationService]
})
export class ManageGroupsComponent implements OnInit {


  Groups: Group[];

  DisplayGroupEditor: boolean;

  selectedGroup: Group;


  constructor(private toaster: LogService, private confirmationService: ConfirmationService, private langService: LanguageService, private groupRep: GroupRepository) {

    this.Groups = [];


  }

  ngOnInit() {
    this.LoadGroups();
  }


  LoadGroups(First?: number, Rows?: number) {

    this.groupRep.getAll(First, Rows).subscribe((groups) => {
      this.Groups = groups;
    });
  }

  OnEditGroup(group: Group) {

    this.selectedGroup = this.clone(group);
    this.DisplayGroupEditor = true;

  }

  onDeleteGroup(_group: Group) {
    if (_group.Id) {
      this.confirmationService.confirm({
        accept: () => {

          this.groupRep.delete(_group.Id).subscribe((group) => {

            let group_index = this.Groups.findIndex(g => g.Id === group.Id);
            if (group_index >= 0)
              this.Groups.splice(group_index, 1);
            this.toaster.pop(LogLevel.Success, "Group Deleted Successfully");
          });
        },
        message: this.langService.IsEnglish ? "are you sure ? " : "هل انت متاكد"
      });
    }
  }

  onRequireLoadGroups(event) {


    let first: number = event.first;
    let rows = event.rows;
    this.LoadGroups();


  }

  ShowAddGroupDialog() {
    this.DisplayGroupEditor = true;
    this.selectedGroup = new Group();
  }

  clone(c: Group): Group {
    let obj = new Group();
    for (let prop in c) {
      obj[prop] = c[prop];
    }
    return obj;
  }

  OnGroupAddOrUpdate(group: Group) {
    if (group) {
      let existed_group_indx = this.Groups.findIndex((u) => u.Id === group.Id);
      if (existed_group_indx >= 0) {
        this.Groups[existed_group_indx] = group;

      }
      else {
        this.Groups.push(group);
      }
    }
  }




}
