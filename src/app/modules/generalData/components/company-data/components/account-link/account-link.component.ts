import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LanguageService } from '../../../../../shared/services/LanguageService';
import { AccountLink } from '../../../../models/AccountLink';
import { AccountLinkRepository } from '../../../../repos/AccountLinkRepository';
import { AccountTreeRepository } from '../../../../../accounting/Repos/AccountTreeRepository';
import { Account } from '../../../../../accounting/models/Account';

@Component({
  moduleId: module.id,
  selector: 'account-link',
  templateUrl: 'account-link.component.html',
  styleUrls: ['account-link.component.css'],
  providers: [
    AccountLinkRepository,
    AccountTreeRepository
  ]
})
export class AccountLinkComponent implements OnInit {


  private AccountLinks: AccountLink[];

  private Accounts: Account[];



  constructor(private langService: LanguageService, private accountLinkRepo: AccountLinkRepository
    , private accountRepo: AccountTreeRepository) {

    this.AccountLinks = [];

    this.Accounts = [];
  }




  ngOnInit(): void {
    this.LoadAccounts();

  }




  LoadAccountLinks() {
    this.accountLinkRepo.getAll().subscribe((als) => {
      this.AccountLinks = als;
    }, () => {

    });
  }

  LoadAccounts() {
    this.accountRepo.getAll().subscribe((acs) => {
      this.Accounts = acs;
      this.LoadAccountLinks();
    }, () => {

    });
  }

}
