import { LanguageService } from './../../../../shared/services/LanguageService';
import { Account } from './../../../models/Account';
import { EntryDetail } from './../../../models/EntryDetail';
import { NgForm, NgModel } from '@angular/forms';
import { Branch } from './../../../../generalData/models/Branch';
import { Entry } from './../../../models/Entry';
import { Component, Input, ViewChild, OnChanges, SimpleChanges, OnInit, OnDestroy, Output, EventEmitter, ElementRef } from '@angular/core';
import { Currency } from '../../../models/Currency';
import { CopyObject } from '../../../../shared/utils/utils';
import { EntryRepository } from '../../../Repos/EntryRepository';
import { Subscription } from 'rxjs';
import { CostCenter } from '../../../models/CostCenter';
import swal from "sweetalert2";
import moment from "moment-hijri";


@Component({
  selector: 'jouranl-details',
  templateUrl: 'jouranl-details.component.html',
  styleUrls: ['jouranl-details.component.css'],
  providers: [EntryRepository]
})
export class JouranlDetailsComponent implements OnInit, OnDestroy {



  @Input()
  IsEdit: boolean;

  @Input()
  IsView: boolean;

  @Input()
  EntryId: string;

  CurrentEntry: Entry;

  @Input()
  Branches: Branch[] = [];
  BranchList: any[] = [];

  @Input()
  CostCenters: CostCenter[] = [];
  CostCenterList: any[] = [];

  @Input()
  Accounts: Account[] = [];
  AccountList: any[] = [];

  @Input()
  JournalData: any[] = [];
  JournalDataList: any[] = [];

  @Input()
  Currencies: Currency[] = [];
  CurrencyList: any[] = [];


  // private _HiriDate;

  // get HijriDate() {
  //   return this._HiriDate;
  // }
  // set HijriDate(value) {
  //   this._HiriDate = moment(value).endOf('iMonth').format('iD/iM/iYYYY');
  // }

  @Output()
  EntryEditorClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  OnUpdateDone: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild("EntryForm")
  EntryForm: NgForm;

  @ViewChild("descritpion")
  Descritpion: ElementRef;


  private _subscription: Subscription[];


  constructor(private langService: LanguageService, private EntryRepository: EntryRepository) {
    this.CurrentEntry = new Entry();
    this._subscription = [];
    moment.locale(langService.IsEnglish ? 'en-US' : "ar-EG");
  }


  ngOnInit(): void {

    if (this.EntryId)
      this.LoadEntry(this.EntryId);

    if (this.Accounts && this.Accounts.length > 0)
      this.AccountList = this.Accounts.map((cr) => ({ label: cr.AccountName, value: cr.Id }));

    if (this.CostCenters && this.CostCenters.length)
      this.CostCenterList = this.CostCenters.map((cr: any) => ({ label: cr.AssociatedObject.CenterName, value: cr.AssociatedObject.Id }));

    if (this.Currencies && this.Currencies.length)
      this.CurrencyList = this.Currencies.map((cr) => ({ label: cr.CurrencyName, value: cr.Id }));

    if (this.Branches && this.Branches.length)
      this.BranchList = this.Branches.map((br) => ({ label: br.BranchName, value: br.Id }));



  }

  public SetDate(value, isHijri?: boolean) {

    let date = value instanceof Date ? value.toLocaleDateString() : value;

    if (this.CurrentEntry && date) {

      this.CurrentEntry.Date = value;

   //   this.HijriDate = value;


    }

  }



  public LoadEntry(Id: string) {

    this.EntryRepository.get(Id).subscribe((entry) => {

      this.CurrentEntry = entry;


      // date comes in different format angular doesn't understand
      // so convert it to js date to render correctly
      this.SetDate(new Date(entry.Date));


      // set account code for each account
      this.CurrentEntry.EntryDetails.forEach(ed => {
        this.OnChangeAccountId(ed);
      });


    });


  }


  OnEntryEditorClose() {

    this.EntryEditorClose.emit(true);

  }

  OnChangeDebitOrCredit() {

    const Credits = this.CurrentEntry.EntryDetails.map(e => e.Credit) || [0];

    const Debits = this.CurrentEntry.EntryDetails.map(e => e.Debit) || [0];

    const CreditTotal = Credits.reduce((a, b) => a + b, 0);

    const DebitsTotal = Debits.reduce((a, b) => a + b, 0);

    this.CurrentEntry.CreditTotal = CreditTotal;

    this.CurrentEntry.DebitTotal = DebitsTotal;
  }

  DeleteEntryDetail(entryDetail: EntryDetail) {

    if (entryDetail) {

      const entry_detail_indx = this.CurrentEntry.EntryDetails.indexOf(entryDetail);

      if (entry_detail_indx >= 0) {

        this.CurrentEntry.EntryDetails.splice(entry_detail_indx, 1);

        this.OnChangeDebitOrCredit();
      }

    }
  }


  OnChangeAccountCode(entryDetail) {

    if (entryDetail) {

      const matched_entry = this.Accounts.find((ac) => (ac.ShortcutCode === entryDetail.AccountCode));

      if (matched_entry) {

        entryDetail.AccountId = matched_entry.Id;

      }
      else {
        entryDetail.AccountId = null;
      }

    }
  }


  OnChangeAccountId(entryDetail: EntryDetail) {

    if (entryDetail) {

      const matched_entry = this.Accounts.find((ac) => (ac.Id === entryDetail.AccountId));

      if (matched_entry) {

        entryDetail.AccountCode = matched_entry.ShortcutCode;

      }

    }
  }

  SaveEntry() {

    let isvalid_entry = true;

    if (this.CurrentEntry.DebitTotal - this.CurrentEntry.CreditTotal !== 0) {
      const popup_title = this.langService.IsEnglish ? "Warning" : "تحذير";
      const popup_body = this.langService.IsEnglish ? "Difference between debit and credit must be zero(0)" : "الفرق بين المدين والدائن لابد ان يساوى صفر";
      swal(popup_title,popup_body, "warning");
      isvalid_entry = false;
    }

    if (!this.CurrentEntry.CurrencyId) {
      const popup_title = this.langService.IsEnglish ? "Warning" : "تحذير";
      const popup_body = this.langService.IsEnglish ? "Currency must be set" : "يجب ادخال العمله";
      swal(popup_title,popup_body, "warning");
      isvalid_entry = false;
    }



    if (!this.CurrentEntry.EntryDetails || !this.CurrentEntry.EntryDetails.length) {
      const popup_title = this.langService.IsEnglish ? "Warning" : "تحذير";
      const popup_body = this.langService.IsEnglish ? "Entry doesn't have any details" : "القيد فارغ لابد من وضع تفصيل واحد على الاقل ";
      swal(popup_title, popup_body, "warning");
      isvalid_entry = false;
    }

    else {

      this.CurrentEntry.EntryDetails.forEach((ed) => {

        if (!ed.Debit) {
          const popup_title = this.langService.IsEnglish ? "Warning" : "تحذير";
          const popup_body = this.langService.IsEnglish ? "Some Entry detail missed debit value": "تفصيل ما ليس لديه القيمه المدينه ";
          swal(popup_title,popup_body , "warning");
          isvalid_entry = false;
        }

        if (!ed.Credit) {
          const popup_title = this.langService.IsEnglish ? "Warning" : "تحذير";
          const popup_body = this.langService.IsEnglish ? "Some Entry credit missed credit value": "تفصيل ما ليس لديه القيمه الدائنه ";
          swal(popup_title,popup_body , "warning");
          isvalid_entry = false;
        }

        if (!ed.CostCenterId) {
          const popup_title = this.langService.IsEnglish ? "Warning" : "تحذير";
          const popup_body = this.langService.IsEnglish ?"Some Entry cost center not set": "تفصيل ما ليس لديه مركز التكلفه ";
          swal(popup_title,popup_body , "warning");
          isvalid_entry = false;
        }

      });



    }

    if (isvalid_entry) {

      if (!this.CurrentEntry.Date) {
        this.CurrentEntry.Date = new Date().toLocaleDateString();
      }


      console.log(this.CurrentEntry);

      if (this.IsEdit) {
        if (this.CurrentEntry.Id) { // update
          this.EntryRepository.update(this.CurrentEntry).subscribe(() => {
            this.OnUpdateDone.emit(true);
          });
        }
        else { // create
          this.EntryRepository.create(this.CurrentEntry).subscribe((entry) => {
            this.CurrentEntry.Id = entry.Id;
            this.OnUpdateDone.emit(true);
          });
        }
      }
    }



  }




  AddNewEntryDetail() {

    let new_entry_detail = new EntryDetail();

    this.CurrentEntry.EntryDetails.push(new_entry_detail);

  }

  DeleteAllEntryDetails() {
    this.CurrentEntry.EntryDetails.splice(0, this.CurrentEntry.EntryDetails.length);
  }


  ApplyDescription(input: Event) {

    if (this.Descritpion) {

      const apply_description_input = (<HTMLInputElement>input.target);

      this.CurrentEntry.EntryDetails.forEach((ed) => {
        ed.Description = apply_description_input.checked ? (<HTMLInputElement>this.Descritpion.nativeElement).value : ed.Description;
      });

    }
  }

  ngOnDestroy(): void {
    this._subscription.forEach((sub) => sub.unsubscribe());
  }


}
