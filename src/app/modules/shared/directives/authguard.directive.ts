import { element } from 'protractor';
import { Directive, Input, SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core';
import { AuthService } from '../services/AuthService';
import { DoCheck } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ApplicationRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';

export enum ActionType {
  View = "view",
  Add = "add",
  Edit = "edit",
  Print = "print",
  Delete = "delete"
}

@Directive({
  selector: '[authGuard]',
})
export class AuthGuardDirective implements OnInit {





  @Input("authGuard")
  PagePath: string;

  @Input()
  actionType: ActionType;


  PermissionList = [];



  constructor(private router: Router, private renderer: Renderer2, private AuthService: AuthService, private elementRef: ElementRef) {

    AuthService.PermssionListAsObservable.subscribe((permission_list) => {
      this.PermissionList = permission_list;
      this.CheckPermissions();
    });




  }

  ngOnInit(): void {


    this.PermissionList = this.AuthService.PermisionList;

    this.CheckPermissions();


  }




  CheckPermissions(): void {

    if (!this.PagePath) {
      this.PagePath = this.router.url;

    }

    if (this.PermissionList && this.PermissionList.length && this.PagePath) {



      if (this.elementRef && this.elementRef.nativeElement) {

        let element = (<HTMLElement>this.elementRef.nativeElement);

        let can_show = true;

        if (this.actionType) { // action type specified

          if (this.actionType.toLowerCase() === ActionType.Edit.toLowerCase()) {

            can_show = (this.PermissionList.findIndex((n) => n.PagePath.toLowerCase() === this.PagePath.toLowerCase() && n.CanView && n.CanEdit) >= 0);

          }
          else if (this.actionType.toLowerCase() === ActionType.Add.toLowerCase()) {
            can_show = (this.PermissionList.findIndex((n) => n.PagePath.toLowerCase() === this.PagePath.toLowerCase() && n.CanView && n.CanAdd) >= 0);
          }
          else if (this.actionType.toLowerCase() === ActionType.Delete.toLowerCase()) {

            can_show = (this.PermissionList.findIndex((n) => n.PagePath.toLowerCase() === this.PagePath.toLowerCase() && n.CanView && n.CanDelete) >= 0);
          }
          else if (this.actionType.toLowerCase() === ActionType.Print.toLowerCase()) {

            can_show = (this.PermissionList.findIndex((n) => n.PagePath.toLowerCase() === this.PagePath.toLowerCase() && n.CanView && n.CanPrint) >= 0);
          }
          else if (this.actionType.toLowerCase() === ActionType.View.toLowerCase()) {

            can_show = (this.PermissionList.findIndex((n) => n.PagePath.toLowerCase() === this.PagePath.toLowerCase() && n.CanView) >= 0);
          }

        }
        else { // no action type

          can_show = (this.PermissionList.findIndex((n) => n.PagePath.toLowerCase() === this.PagePath.toLowerCase() && n.CanView) >= 0);
        }


        if (!can_show)
          this.renderer.setStyle(element, "display", "none");
        else
          this.renderer.setStyle(element, "display", "block");
      }
    }
  }


}
