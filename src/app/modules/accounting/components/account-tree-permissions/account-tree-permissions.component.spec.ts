import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTreePermissionsComponent } from './account-tree-permissions.component';

describe('AccountTreePermissionsComponent', () => {
  let component: AccountTreePermissionsComponent;
  let fixture: ComponentFixture<AccountTreePermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTreePermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTreePermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
