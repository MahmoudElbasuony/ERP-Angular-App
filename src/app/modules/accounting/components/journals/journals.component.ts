import { AccountTreeRepository } from './../../Repos/AccountTreeRepository';
import { CostCenterRepository } from './../../Repos/CostCenterRepository';
import { EntryRepository } from './../../Repos/EntryRepository';
import { CurrencyRepository } from './../../Repos/CurrencyRepository';
import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { LanguageService } from '../../../shared/services/LanguageService';
import { Entry } from '../../models/Entry';
import { Branch } from '../../../generalData/models/Branch';
import { Currency } from '../../../generalData/models/currency';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { BranchRepository } from '../../../generalData/repos/BranchRepository';
import { Account } from '../../models/Account';
import { CostCenter } from '../../models/CostCenter';
import swal from "sweetalert2";
import {  GenerateReportUrl } from '../../../shared/urls/url-helper';
import { BrowserPopup } from '../../../shared/utils/utils';


@Component({
  selector: 'app-journals',
  templateUrl: './journals.component.html',
  styleUrls: ['./journals.component.css'],
  providers: [BranchRepository, CurrencyRepository, EntryRepository,
    CostCenterRepository, AccountTreeRepository]
})
export class JournalsComponent implements OnInit {




  @ViewChild("EntryForm")
  private EntryForm: NgForm;

  private IsEdit: boolean;

  private IsView: boolean;

  private CurrentEntry: Entry;

  private Branches: any[] = [];

  private CostCenters: any[] = [];

  private Accounts: any[] = [];

  private JournalData: any[] = [];

  private Currencies: Currency[] = [];

  private Entries: Entry[] = [];



  constructor(private langService: LanguageService, private CurrencyRepository: CurrencyRepository,
    private BranchRepository: BranchRepository, private EntryRepository: EntryRepository,
    private costCenterRepository: CostCenterRepository, private accountRepo: AccountTreeRepository) {

    this.CurrentEntry = new Entry();

  }

  ngOnInit() {

    // load branches
    this.BranchRepository.getAll().subscribe((brs) => {

      this.Branches = brs;

    });

    // load currencies
    this.CurrencyRepository.getAll().subscribe((crs: any) => {
      this.Currencies = crs;
    });

    // load accounts
    this.accountRepo.getAll().subscribe((acs) => {
      this.Accounts = acs;
    });

    // load cost centers
    this.costCenterRepository.getAll().subscribe((cs) => {
      this.CostCenters = cs;
    });

    this.LoadEntries();

  }

  public CreateNewEntry() {

    this.CurrentEntry = new Entry();
    this.IsEdit = true;
    this.IsView = false;

  }

  public LoadEntries() {
    this.EntryRepository.getAll().subscribe((entries) => {

      this.Entries = entries;

    });
  }

  public Refresh() {
    this.LoadEntries();
  }


  public OnEditEntry(entry: Entry) {
    this.CurrentEntry = entry;
    this.IsEdit = true;
    this.IsView = false;
  }

  public OnViewEntry(entry: Entry) {
    this.CurrentEntry = entry;
    this.IsEdit = false;
    this.IsView = true;
  }

  public OnDeleteEntry(entry: Entry) {

    swal({
      title: this.langService.IsEnglish ? 'Are you sure?' : "هل انت متاكد ",
      text: this.langService.IsEnglish ? "You won't be able to revert this!" : "لن تستطيع الرجوع فى ذلك",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.langService.IsEnglish ? 'Yes, delete it!' : "نعم احذف",
      cancelButtonText: this.langService.IsEnglish ? "Cancel" : "اغلق"
    }).then((result) => {

      if (result.value) {

        this.EntryRepository.delete(entry.Id).subscribe(() => {

          const entry_index = this.Entries.findIndex((en) => en.Id === entry.Id);

          if (entry_index >= 0) {

            this.Entries.splice(entry_index, 1);

            swal(
              this.langService.IsEnglish ? 'Deleted!' : "اتحذف",
              this.langService.IsEnglish ? 'Your entry has been deleted.' : "تم حذف القيد بنجاح",
              'success'
            );

          }

        });

      }

    });


  }

  public OnPrintEntry(entry: Entry) {

    if (entry) {
      BrowserPopup(GenerateReportUrl("EntryReport", { EntryId: entry.Id }),entry.Description,'900','900');
    }

  }

  public OnUpdateDone(done) {
    if (done) {
      this.Refresh();
    }
  }



  public Log(data) {
    console.log(data);


  }
}
