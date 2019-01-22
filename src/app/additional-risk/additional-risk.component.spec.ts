import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalRiskComponent } from './additional-risk.component';

describe('AdditionalRiskComponent', () => {
  let component: AdditionalRiskComponent;
  let fixture: ComponentFixture<AdditionalRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
