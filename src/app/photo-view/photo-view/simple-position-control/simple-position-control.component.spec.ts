import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePositionControlComponent } from './simple-position-control.component';

describe('SimplePositionControlComponent', () => {
  let component: SimplePositionControlComponent;
  let fixture: ComponentFixture<SimplePositionControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplePositionControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplePositionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
