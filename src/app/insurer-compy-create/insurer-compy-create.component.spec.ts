import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurerCompyCreateComponent } from './insurer-compy-create.component';

describe('InsurerCompyCreateComponent', () => {
  let component: InsurerCompyCreateComponent;
  let fixture: ComponentFixture<InsurerCompyCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurerCompyCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurerCompyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
