import { AccountLink } from './../../../../../models/AccountLink';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core';
import { AccountsLinkType } from '../../../../../models/Enums/AccountsLinkType';
import { LanguageService } from '../../../../../../shared/services/LanguageService';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AccountLinkRepository } from '../../../../../repos/AccountLinkRepository';

@Component({
  moduleId: module.id,
  selector: 'account-link-details',
  templateUrl: 'account-link-details.component.html',
  styleUrls: ['account-link-details.component.css'],
  providers: [
    AccountLinkRepository
  ]
})
export class AccountLinkDetailsComponent implements OnInit {


  @Input()
  AccountLink: AccountLink;

  @Input()
  Accounts: Account[];

  AccountDetailsFrom: FormGroup;

  AccountsLinkType: any = AccountsLinkType;

  InProgress: boolean;


  constructor(private fb: FormBuilder, private langService: LanguageService, private AccountLinkRepository: AccountLinkRepository) {

    this.Accounts = [];

  }

  ngOnInit(): void {

    if (this.AccountLink && this.AccountLink.AccountLinkDetails && this.AccountLink.AccountLinkDetails.length > 0) {


      let controls = {};


      for (let control of this.AccountLink.AccountLinkDetails) {
        controls[control.Id] = [(control.AccountID ? control.AccountID : '')];

      }

      this.AccountDetailsFrom = this.fb.group(controls);


    }

  }

  UpdateAccountLink() {

    this.InProgress = true;

    // bind details with controls
    for (let ald of this.AccountLink.AccountLinkDetails) {
      let detail_control = this.AccountDetailsFrom.get(ald.Id);
      if (detail_control) {
        ald.AccountID = detail_control.value;

      }
    }

    this.AccountLinkRepository.update(this.AccountLink).subscribe(() => {
      this.InProgress = false;
    }, () => {
      this.InProgress = false;
    });

  }



}
