import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsComponentComponent } from './positions-component.component';

describe('PositionsComponentComponent', () => {
  let component: PositionsComponentComponent;
  let fixture: ComponentFixture<PositionsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
