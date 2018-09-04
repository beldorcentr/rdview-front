import { TestBed, inject } from '@angular/core/testing';

import { AuthStatisticsService } from './auth-statistics.service';

describe('AuthStatisticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthStatisticsService]
    });
  });

  it('should be created', inject([AuthStatisticsService], (service: AuthStatisticsService) => {
    expect(service).toBeTruthy();
  }));
});
