import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateEditingComponent } from './rate-editing.component';

describe('RateEditingComponent', () => {
  let component: RateEditingComponent;
  let fixture: ComponentFixture<RateEditingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateEditingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
