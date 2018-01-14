import { TestBed, inject } from '@angular/core/testing';

import { DevicePipeService } from './device-pipe.service';

describe('DevicePipeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevicePipeService]
    });
  });

  it('should be created', inject([DevicePipeService], (service: DevicePipeService) => {
    expect(service).toBeTruthy();
  }));
});
