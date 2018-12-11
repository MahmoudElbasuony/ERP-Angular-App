import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafesPermissionsComponent } from './safes-permissions.component';

describe('SafesPermissionsComponent', () => {
  let component: SafesPermissionsComponent;
  let fixture: ComponentFixture<SafesPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafesPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafesPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
