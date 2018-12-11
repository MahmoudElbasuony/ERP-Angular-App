import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanksDataComponent } from './banks-data.component';

describe('BanksDataComponent', () => {
  let component: BanksDataComponent;
  let fixture: ComponentFixture<BanksDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanksDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanksDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
