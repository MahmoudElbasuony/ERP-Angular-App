import { Component, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from '../../../shared/services/LanguageService';
import { TreeNode } from 'primeng/primeng';
import { Group } from '../../../shared/models/Group';
import { GroupPermissionRepository } from '../../../shared/repos/GroupPermissionRepository';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Permission } from '../../../shared/models/Permission';
import { GroupRepository } from '../../../shared/repos/GroupRepository';
import { LogService } from '../../../shared/services/LogService';
import { LogLevel } from '../../../shared/models/User';
import { AuthService } from '../../../shared/services/AuthService';


@Component({
  selector: 'app-group-permissions',
  templateUrl: './group-permissions.component.html',
  styleUrls: ['./group-permissions.component.css'],
  providers: [GroupPermissionRepository, GroupRepository]
})
export class GroupPermissionsComponent implements OnInit {


  tree: TreeNode[] = [];

  groups: Group[] = [];


  permissions: Permission[];

  selectedGroup: Group;

  constructor(private toaster: LogService, private langService: LanguageService,
    private groupRepository: GroupRepository,
    private groupPermissionRep: GroupPermissionRepository,
    private authService: AuthService) { }

  ngOnInit() {

    this.permissions = [];

    this.groupRepository.getAll().subscribe((resp: any) => {
      this.groups = resp;
    }, () => { });

  }

  OnChangeGroup() {


    if (this.selectedGroup) {
      this.groupPermissionRep.get(this.selectedGroup.Id).subscribe((resp: any) => {
        this.tree = resp;

      },
        (error: HttpErrorResponse) => {

        });
    }
  }

  SaveChanges() {

    if (this.permissions.length > 0) {
      this.groupPermissionRep.updateAll({ permissions: this.permissions, RoleId: this.selectedGroup.Id }).subscribe((resp: any) => {
        this.toaster.pop(LogLevel.Success, "Done");
        this.permissions = [];
        this.authService.LoadPermissionTree();
      },
        (error: HttpErrorResponse) => {
          this.toaster.pop(LogLevel.Error, error.statusText);
        });
    }
    else {
      this.toaster.pop(LogLevel.Warning, "No Changes to save");
    }


    //this.groupPermissionRep.updateAll()

  }

  onPermissionChanged(node: TreeNode) {

    let permission: Permission = node.data;
    if (permission && !this.permissions.find(p => p.RoleId === permission.RoleId && p.PageId === permission.PageId)) {

      this.permissions.push(node.data);
      this.getChildPermissions(node);
    }



  }

  getChildPermissions(node: TreeNode) {
    for (let child of node.children) {
      let permission: Permission = child.data;
      if (permission && !this.permissions.find(p => p.RoleId === permission.RoleId && p.PageId === permission.PageId)) {
        this.permissions.push(child.data);
      }
      this.getChildPermissions(child);
    }
  }

  CanDo(node: TreeNode, event: Event, action: string) {

    if (!action || !action.trim()) return;

    let action_name: string = action.trim().toLowerCase();

    let ischeck: boolean = (<HTMLInputElement>event.target).checked;

    let node_data: Permission = node.data;

    if (node_data) {
      let node_data: Permission = node.data;
      if (action_name === "view") {
        node_data.CanView = ischeck;
        if (!ischeck)
          node_data.CanAdd = node_data.CanDelete = node_data.CanEdit = node_data.CanPrint = ischeck;
      }
      else if (action_name === "add") {
        node_data.CanAdd = ischeck;
      }
      else if (action_name === "edit") {
        node_data.CanEdit = ischeck;
      }
      else if (action_name === "delete") {
        node_data.CanDelete = ischeck;
      }
      else if (action_name === "print") {
        node_data.CanPrint = ischeck;
      }
      else if (action === "all") {

        node_data.CanView = node_data.CanAdd = node_data.CanDelete
          = node_data.CanPrint = node_data.CanEdit = ischeck;

      }
      this.UpdateChildren(node, ischeck, action_name);
    }
    this.onPermissionChanged(node);
  }


  UpdateChildren(node: TreeNode, ischeck: boolean, action: string) {
    if (node.children && node.children.length > 0) {

      let node_data: Permission = node.data;

      for (let child of node.children) {

        let child_node_data: Permission = child.data;

        if (action === "view") {


          child_node_data.CanView = node_data.CanView;

          if (!child_node_data.CanView)
            child_node_data.CanAdd = child_node_data.CanPrint = child_node_data.CanDelete = child_node_data.CanEdit = child_node_data.CanView;



        }
        else if (action === "add") {
          if (node_data.CanView)
            child_node_data.CanAdd = ischeck;

        }
        else if (action === "edit") {

          if (node_data.CanView)
            child_node_data.CanEdit = ischeck;

        }
        else if (action === "delete") {
          if (node_data.CanView)
            child_node_data.CanDelete = ischeck;

        }
        else if (action === "print") {
          if (node_data.CanView)
            child_node_data.CanPrint = ischeck;

        }
        else if (action === "all") {
          child_node_data.CanView = child_node_data.CanAdd = child_node_data.CanDelete
            = child_node_data.CanPrint = child_node_data.CanEdit = ischeck;

        }



        this.UpdateChildren(child, ischeck, action);
      }
    }
  }

}
