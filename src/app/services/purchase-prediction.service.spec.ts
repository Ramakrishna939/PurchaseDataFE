import { TestBed } from '@angular/core/testing';

import { PurchasePredictionService } from './purchase-prediction.service';

describe('PurchasePredictionService', () => {
  let service: PurchasePredictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchasePredictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
