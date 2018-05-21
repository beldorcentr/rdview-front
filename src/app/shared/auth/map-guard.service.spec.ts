import { TestBed, inject } from '@angular/core/testing';

import { MapGuardService } from './map-guard.service';

describe('MapGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapGuardService]
    });
  });

  it('should be created', inject([MapGuardService], (service: MapGuardService) => {
    expect(service).toBeTruthy();
  }));
});
