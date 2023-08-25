import { TestBed } from '@angular/core/testing';

import { GenesisService } from './genesis.service';

describe('GenesisService', () => {
  let service: GenesisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenesisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
