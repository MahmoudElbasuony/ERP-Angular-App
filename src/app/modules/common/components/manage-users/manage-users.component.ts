import { Component, OnInit } from '@angular/core';
import { UserRepository } from '../../../shared/repos/UserRepository';
import { User } from '../../../shared/models/User';
import { LanguageService } from '../../../shared/services/LanguageService';
import { Group } from '../../../shared/models/Group';
import { GroupRepository } from '../../../shared/repos/GroupRepository';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
  providers: [UserRepository, GroupRepository]

})
export class ManageUsersComponent implements OnInit {

  Users: User[] = [];
  displayDialog: boolean;
  selecteduser: User;
  newUser: boolean;
  user: User = new User();
  Groups: Group[];


  constructor(private repo: UserRepository, private groupRep: GroupRepository, private langService: LanguageService) {

    this.Groups = [];

  }

  showDialogToAdd() {
    this.newUser = true;
    this.user = new User();
    this.displayDialog = true;
  }

  onUserSelect(user: User) {
    this.newUser = false;
    this.user = this.clone(user);
    this.displayDialog = true;
  }

  clone(c: User): User {
    let obj = new User();
    for (let prop in c) {
      obj[prop] = c[prop];
    }
    return obj;
  }
  ngOnInit() {


    this.repo.getAll().subscribe((res) => {
      if (res) {
        this.Users = res;
      } else {
        console.log(res);
      }
    });

    this.groupRep.getAll().subscribe((groups) => {
      this.Groups = groups;

    });


  }



  OnUserAddOrUpdate(event: { user: User, isUpdate: boolean }) {

    if (event.user) {
      let existed_user_indx = this.Users.findIndex((u) => u.Id === event.user.Id);
      if (existed_user_indx >= 0) {
        this.Users[existed_user_indx] = event.user;
      }
      else {
        this.Users.push(event.user);
      }
      this.Users = [...this.Users];
    }
  }

}
