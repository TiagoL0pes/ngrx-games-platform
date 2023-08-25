import { TestBed } from '@angular/core/testing';

import { SnesService } from './snes.service';

describe('SnesService', () => {
  let service: SnesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
