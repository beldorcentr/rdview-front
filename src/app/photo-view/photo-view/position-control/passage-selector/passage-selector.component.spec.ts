import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassageSelectorComponent } from './passage-selector.component';

describe('PassageSelectorComponent', () => {
  let component: PassageSelectorComponent;
  let fixture: ComponentFixture<PassageSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassageSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
