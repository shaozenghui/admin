import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceManagementCreateComponent } from './insurance-management-create.component';

describe('InsuranceManagementCreateComponent', () => {
  let component: InsuranceManagementCreateComponent;
  let fixture: ComponentFixture<InsuranceManagementCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceManagementCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceManagementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
