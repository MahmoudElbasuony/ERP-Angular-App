import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCentersComponent } from './cost-centers.component';

describe('CostCentersComponent', () => {
  let component: CostCentersComponent;
  let fixture: ComponentFixture<CostCentersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostCentersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
