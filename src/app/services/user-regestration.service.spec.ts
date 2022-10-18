import { TestBed } from '@angular/core/testing';

import { UserRegestrationService } from './user-regestration.service';

describe('UserRegestrationService', () => {
  let service: UserRegestrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegestrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
