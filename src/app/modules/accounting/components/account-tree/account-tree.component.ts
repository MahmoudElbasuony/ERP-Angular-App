import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../shared/services/LanguageService';
import { LogService } from '../../../shared/services/LogService';
import { ConfirmationService } from 'primeng/primeng';
import { CostCenterRepository } from '../../Repos/CostCenterRepository';
import { LogLevel } from '../../../shared/models/User';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MenuItem } from 'primeng/components/common/menuitem';
import { fakeAsync } from '@angular/core/testing';
import { TreeNode } from 'primeng/primeng';
import { forEach } from '@angular/router/src/utils/collection';
import { BankDataRepository } from '../../Repos/bankDataRepository';
import { UserRepository } from '../../../shared/repos/UserRepository';
import { BranchRepository } from '../../../generalData/repos/BranchRepository';
import { SubsidiaryJournalRepository } from '../../Repos/subsidiaryJournalRepository';
import { Currency } from '../../models/Currency';
import { CurrencyRepository } from '../../../generalData/repos/CurrencyRepository';
import { AccountTreeRepository } from '../../Repos/AccountTreeRepository';
import { Account } from '../../models/Account';


@Component({
  selector: 'app-account-tree',
  templateUrl: './account-tree.component.html',
  styleUrls: ['./account-tree.component.css'],
  providers: [BankDataRepository, ConfirmationService, UserRepository,
    BranchRepository, AccountTreeRepository, CostCenterRepository, CurrencyRepository]
})
export class AccountTreeComponent implements OnInit {

  newObject: Account;
  item: Account;
  CheckParent = false;
  list: any = [];
  listOfCostCenter: any = [];
  obj: any;
  files: TreeNode[] = [];
  selectedFile: TreeNode;
  selectedAccountTree: Account;
  items: MenuItem[];

  editMode = false;
  data: Account[] = [];
  Accounts: SelectItem[] = [];
  CostCenters: SelectItem[] = [];
  AccountTypes: SelectItem[] = [];
  Branchs: SelectItem[] = [];
  Currencies: SelectItem[] = [];
  SubsidiaryJournals: SelectItem[] = [];

  @ViewChild("AccountCode")
  AccountCode: AbstractControl;
  @ViewChild("AccountName")
  AccountName: AbstractControl;

  @ViewChild("AccountType")
  AccountType: AbstractControl;
  @ViewChild("AccountNatural")
  AccountNatural: AbstractControl;
  @ViewChild("ParentAccount")
  ParentAccount: AbstractControl;
  @ViewChild("Currency")
  Currency: AbstractControl;

  @ViewChild("CostCenter")
  CostCenter: AbstractControl;
  @ViewChild("AccountBalance")
  AccountBalance: AbstractControl;
  @ViewChild("FinalAccount")
  FinalAccount: AbstractControl;

  constructor(private toaster: LogService, private langService: LanguageService, private confirmationService: ConfirmationService, private repo: AccountTreeRepository
    , private UserRepo: UserRepository
    , private BranchRepo: BranchRepository
    , private CurrencyRepo: CurrencyRepository
    , private CostCenterRepo: CostCenterRepository

    , private log: LogService) {

    this.item = new Account();
    this.newObject = new Account();

    this.repo.GetAccountTree().subscribe((res) => {

      if (res.length !== 0) {

        this.obj = res[0];
        this.PutRoot(res[0]);
        this.RestructTree(res[0], this.files[0]);
        this.newObject.AccountCode = (this.list.length + 1).toString();
      }
      else {
        this.newObject.AccountCode = ("1");
        this.list = [];
      }
    });

    this.CostCenterRepo.getAll().subscribe((Res) => {

      if (Res) {
        this.CostCenters = [];
        this.GenerateList(Res[0]);
        this.CostCenters.push(
          { label: "", value: "" }
        );

        this.listOfCostCenter.forEach(<CostCenter>(element) => {

          this.CostCenters.push(
            { label: element.CenterName, value: element.Id }
          );
        });
        this.listOfCostCenter = [];
      }
    });
    this.UserRepo.getAll().subscribe((Res) => {

      if (Res) {
        this.Accounts.push(
          { label: "", value: "" }
        );
        Res.forEach(<Users>(element) => {

          this.Accounts.push(
            { label: element.Name, value: element.Id }
          );

        });
      }
    });



    this.CurrencyRepo.getAll().subscribe((Res) => {

      if (Res) {
        this.Currencies.push(
          { label: "", value: "" }
        );

        Res.forEach(<Currency>(element) => {

          this.Currencies.push(
            { label: element.CurrencyName, value: element.Id }
          );

        });
      }
    });

    this.AccountTypes.push(
      { label: "", value: "" },
      { label: "Main", value: "Main" },
      { label: "Sub", value: "Sub" }

    );

  }

  ngOnInit() {
    this.items = [
      { label: 'Edit', icon: 'fa-search', command: (event) => this.OnEditAccountTree(this.selectedAccountTree) },
      { label: 'Delete', icon: 'fa-close', command: (event) => this.onDeleteAccountTree(this.selectedAccountTree) }
    ];
  }

  GenerateList(obj: any) {

    this.listOfCostCenter = [...this.list, obj.AssociatedObject];
    if (obj.Children.length === 0) {
      return;
    }


    for (let i = 0; i < obj.Children.length; i++) {
      this.GenerateList(obj.Children[i]);
    }
  }
  PutRoot(obj) {

    this.files = [
      {
        label: obj.AssociatedObject.AccountName,
        data: obj.AssociatedObject,
        expandedIcon: "fa-folder-open",
        collapsedIcon: "fa-folder",
        children: [],
      }];
  }
  RestructTree(obj: any, objres: any) {

    this.list = [...this.list, obj.AssociatedObject];
    if (obj.Children.length === 0) {
      return;
    }


    for (let i = 0; i < obj.Children.length; i++) {
      objres.children.push({
        label: obj.Children[i].AssociatedObject.AccountName,
        data: obj.Children[i].AssociatedObject,
        expandedIcon: "fa-folder-open",
        collapsedIcon: "fa-folder",
        children: [],
      });

      this.RestructTree(obj.Children[i], objres.children[i]);
    }
  }

  checkHaveParent(obj: any, TargetObj: Account) {


    if (obj.AssociatedObject === TargetObj) {
      if (obj.Children.length !== 0) {
        this.CheckParent = true;
      }
    }

    if (obj.Children.length === 0) {
      return;
    }


    for (let i = 0; i < obj.Children.length; i++) {
      this.checkHaveParent(obj.Children[i], TargetObj);
    }
  }
  Save() {


    if ((!this.selectedFile) && (this.list !== 0)) {
      return this.log.pop(LogLevel.Error, "Must Select Account From Tree");
    }

    //  if (!this.newObject.AccountCode) {
    //    return this.log.pop(LogLevel.Error, "Account Code is required");
    //  }

    if (!this.newObject.AccountName) {
      return this.log.pop(LogLevel.Error, "Account Name required");
    }
    if (!this.newObject.AccountType) {
      return this.log.pop(LogLevel.Error, "Account Type required");
    }
    if (!this.newObject.AccountNatural) {
      return this.log.pop(LogLevel.Error, "Account Natural required");
    }
    if (!this.newObject.ParentAccount) {
      return this.log.pop(LogLevel.Error, "Parent Account required");
    }
    if (!this.newObject.FinalAccount) {
      return this.log.pop(LogLevel.Error, "Final Account required");
    }

    if (!this.newObject.Currency) {
      return this.log.pop(LogLevel.Error, "Currency required");
    }



    if (this.selectedFile) {
      this.newObject.parentId = this.selectedFile.data.Id;
    }
    this.repo.create(this.newObject).subscribe((data: any) => {


      if (this.list.length === 0) {
        this.files = [
          {
            label: this.newObject.AccountName,
            data: data,
            expandedIcon: "fa-folder-open",
            collapsedIcon: "fa-folder",
            children: [],
          }];

      }
      if (this.selectedFile) {
        this.selectedFile.children.push({
          label: this.newObject.AccountName, data: data,
          expandedIcon: "fa-folder-open",
          collapsedIcon: "fa-folder",
          children: [],
        });

      }
      if (!this.newObject.Id) // Add
      {
        this.list = [...this.list, data];
      }

      this.Reset();
    });
  }

  update() {
    this.repo.update(this.newObject).subscribe((data: any) => {


      let accountTree: Account = this.newObject;
      let accountTree_index = this.list.findIndex(g => g.Id === accountTree.Id);
      if (accountTree_index >= 0) {

      }
      this.repo.GetAccountTree().subscribe((res) => {
        this.list = [];

        if (res.length !== 0) {

          this.obj = res[0];
          this.PutRoot(res[0]);
          this.RestructTree(res[0], this.files[0]);
        }
        else {
          this.list = [];
        }
      });
      this.Reset();
    });
  }

  GeneratorCode() {
    let text = "";
    let possible = "0123456789";

    for (let i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  Reset() {

    this.newObject = new Account();
    this.newObject.AccountCode = (this.list.length + 1).toString();

    this.AccountName.reset();
    this.AccountName.reset();
    this.AccountType.reset();
    this.AccountNatural.reset();
    this.Currency.reset();
    this.ParentAccount.reset();
    this.Currency.reset();
    this.CostCenter.reset();
    this.AccountBalance.reset();
    this.FinalAccount.reset();
    this.editMode = false;
  }
  nodeSelect(event) {

    /// event.data

  }

  OnEditAccountTree(accountTree: Account) {
    this.newObject = this.clone(accountTree);
    this.editMode = true;
  }

  OnEditAccountTreeTable(event) {

    this.newObject = this.clone(event.data);
    this.editMode = true;
  }


  onDeleteAccountTree(_accountTree: Account) {

    this.checkHaveParent(this.obj, _accountTree);

    if (this.CheckParent) {
      this.CheckParent = false;
      return this.log.pop(LogLevel.Error, "Bank Data" + " " + _accountTree.AccountName + "  " + " Have Childrens Node");

    }
    if (confirm("Do you want to delete this bank Data")) {
      this.repo.delete(_accountTree.Id).subscribe((bankData) => {
        let accountTree_index = this.list.findIndex(c => c.Id === _accountTree.Id);
        if (accountTree_index >= 0)
          this.list.splice(accountTree_index, 1);
        this.list = [...this.list];
      });


      this.repo.GetAccountTree().subscribe((res) => {
        this.list = [];
        this.files = [];

        if (res.length !== 0) {

          this.obj = res[0];
          this.PutRoot(res[0]);
          this.RestructTree(res[0], this.files[0]);
        }
        else {
          this.list = [];
        }
      });
    }
  }
  //

  clone(c: Account): Account {
    let obj = new Account();
    for (let prop in c) {
      obj[prop] = c[prop];
    }
    return obj;
  }

}

