import { TestBed } from '@angular/core/testing';

import { SpringConnectService } from './spring-connect.service';

describe('SpringConnectService', () => {
  let service: SpringConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpringConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
