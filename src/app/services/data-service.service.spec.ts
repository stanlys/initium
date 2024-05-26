import { TestBed } from '@angular/core/testing';

import { ClientsDataService } from './data-service.service';

describe('DataServiceService', () => {
  let service: ClientsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
