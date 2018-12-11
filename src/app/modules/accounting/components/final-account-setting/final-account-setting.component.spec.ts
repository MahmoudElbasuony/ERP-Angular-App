import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalAccountSettingComponent } from './final-account-setting.component';

describe('FinalAccountSettingComponent', () => {
  let component: FinalAccountSettingComponent;
  let fixture: ComponentFixture<FinalAccountSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalAccountSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalAccountSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
