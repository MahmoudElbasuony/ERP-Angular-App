import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialYearsComponent } from './financial-years.component';

describe('FinancialYearsComponent', () => {
  let component: FinancialYearsComponent;
  let fixture: ComponentFixture<FinancialYearsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialYearsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
