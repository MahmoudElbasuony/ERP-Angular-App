import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingChartComponent } from './accounting-chart.component';

describe('AccountingChartComponent', () => {
  let component: AccountingChartComponent;
  let fixture: ComponentFixture<AccountingChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
