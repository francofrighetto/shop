import { TestBed } from '@angular/core/testing';

import { ManejoJsonService } from './manejo-json.service';

describe('ManejoJsonService', () => {
  let service: ManejoJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManejoJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
