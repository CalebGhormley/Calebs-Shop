import { TestBed } from '@angular/core/testing';

import { SvgSubscriptionService } from './svg-subscription.service';

describe('SvgSubscriptionService', () => {
  let service: SvgSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvgSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
