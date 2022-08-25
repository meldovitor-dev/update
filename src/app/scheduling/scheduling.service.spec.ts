import { TestBed } from '@angular/core/testing';

import { SchedulingService } from './scheduling.service';

xdescribe('SchedulingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchedulingService = TestBed.get(SchedulingService);
    expect(service).toBeTruthy();
  });
});
