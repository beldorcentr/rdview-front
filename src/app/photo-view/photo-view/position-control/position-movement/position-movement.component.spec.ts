import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionMovementComponent } from './position-movement.component';

describe('PositionMovementComponent', () => {
  let component: PositionMovementComponent;
  let fixture: ComponentFixture<PositionMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
