import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../shared/models/User';
import { ActivatedRoute } from '@angular/router';
import { UserRepository } from '../../../../shared/repos/UserRepository';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Group } from '../../../../shared/models/Group';
import { GroupRepository } from '../../../../shared/repos/GroupRepository';
import { LanguageService } from '../../../../shared/services/LanguageService';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css'],
  providers: [
    GroupRepository
  ]
})
export class UserEditorComponent implements OnInit {




  private IsEdit: boolean;

  @Input()
  User: User;

  @Output()
  OnCloseDialog: EventEmitter<any> = new EventEmitter();

  @Output()
  OnAddOrUpdateUser: EventEmitter<any> = new EventEmitter();

  @Input()
  Groups: Group[];

  constructor(private userRep: UserRepository, private groupRep: GroupRepository, private langService: LanguageService) {
    this.Groups = [];
  }

  ngOnInit() {

      if(this.User && this.User.Id)
          this.IsEdit = true;

  }



  SaveUser() {

    if (!this.User.Id) {
      this.userRep.create(this.User).subscribe((user) => {
        this.User = user;
        this.OnAddOrUpdateUser.emit({ user: this.User, isUpdate: false });
        this.OnCloseDialog.emit(false);
        this.Close();
      });
    }
    else {
      this.userRep.update(this.User).subscribe((user) => {
        this.User = user;
        this.OnAddOrUpdateUser.emit({ user: this.User, isUpdate: true });
        this.OnCloseDialog.emit(false);
        this.Close();
      });
    }
  }



  Close() {
    this.OnCloseDialog.emit(false);
  }
}
