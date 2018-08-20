import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceRateComponent } from './insurance-rate.component';

describe('InsuranceRateComponent', () => {
  let component: InsuranceRateComponent;
  let fixture: ComponentFixture<InsuranceRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
