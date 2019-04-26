import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesComponentComponent } from './employees-component.component';

describe('EmployeesComponentComponent', () => {
  let component: EmployeesComponentComponent;
  let fixture: ComponentFixture<EmployeesComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
