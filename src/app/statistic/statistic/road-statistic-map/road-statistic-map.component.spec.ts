import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadStatisticMapComponent } from './road-statistic-map.component';

describe('RoadStatisticMapComponent', () => {
  let component: RoadStatisticMapComponent;
  let fixture: ComponentFixture<RoadStatisticMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadStatisticMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadStatisticMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
