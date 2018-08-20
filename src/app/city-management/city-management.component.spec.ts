import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityManagementComponent } from './city-management.component';

describe('CityManagementComponent', () => {
  let component: CityManagementComponent;
  let fixture: ComponentFixture<CityManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
