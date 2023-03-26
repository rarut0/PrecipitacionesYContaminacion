import { TestBed } from '@angular/core/testing';

import { BehaviorControlService } from './behavior-control.service';

describe('BehaviourControlService', () => {
  let service: BehaviorControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BehaviorControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
