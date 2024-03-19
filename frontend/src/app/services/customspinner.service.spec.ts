import { TestBed } from '@angular/core/testing';

import { CustomspinnerService } from './customspinner.service';

describe('CustomspinnerService', () => {
  let service: CustomspinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomspinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
