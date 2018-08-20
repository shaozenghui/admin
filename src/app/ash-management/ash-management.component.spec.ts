import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AshManagementComponent } from './ash-management.component';

describe('AshManagementComponent', () => {
  let component: AshManagementComponent;
  let fixture: ComponentFixture<AshManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AshManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AshManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
