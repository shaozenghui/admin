import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCreatComponent } from './customer-creat.component';

describe('CustomerCreatComponent', () => {
  let component: CustomerCreatComponent;
  let fixture: ComponentFixture<CustomerCreatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCreatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
