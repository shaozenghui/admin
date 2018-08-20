import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AshManagementDetaileComponent } from './ash-management-detaile.component';

describe('AshManagementDetaileComponent', () => {
  let component: AshManagementDetaileComponent;
  let fixture: ComponentFixture<AshManagementDetaileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AshManagementDetaileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AshManagementDetaileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
