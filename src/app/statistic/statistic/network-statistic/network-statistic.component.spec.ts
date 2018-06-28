import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkStatisticComponent } from './network-statistic.component';

describe('NetworkStatisticComponent', () => {
  let component: NetworkStatisticComponent;
  let fixture: ComponentFixture<NetworkStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
