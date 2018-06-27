import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadStatisticComponent } from './road-statistic.component';

describe('RoadStatisticComponent', () => {
  let component: RoadStatisticComponent;
  let fixture: ComponentFixture<RoadStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
