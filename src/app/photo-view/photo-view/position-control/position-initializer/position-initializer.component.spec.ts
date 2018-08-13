import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionInitializerComponent } from './position-initializer.component';

describe('PositionInitializerComponent', () => {
  let component: PositionInitializerComponent;
  let fixture: ComponentFixture<PositionInitializerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionInitializerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionInitializerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
