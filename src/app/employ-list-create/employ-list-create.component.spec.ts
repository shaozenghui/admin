import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployListCreateComponent } from './employ-list-create.component';

describe('EmployListCreateComponent', () => {
  let component: EmployListCreateComponent;
  let fixture: ComponentFixture<EmployListCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployListCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployListCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
