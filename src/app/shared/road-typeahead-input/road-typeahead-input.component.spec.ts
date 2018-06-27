import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadTypeaheadInputComponent } from './road-typeahead-input.component';

describe('RoadTypeaheadInputComponent', () => {
  let component: RoadTypeaheadInputComponent;
  let fixture: ComponentFixture<RoadTypeaheadInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadTypeaheadInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadTypeaheadInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
