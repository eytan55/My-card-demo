import { TestBed } from '@angular/core/testing';

import { MyCardService } from './my-card.service';

describe('MyCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyCardService = TestBed.get(MyCardService);
    expect(service).toBeTruthy();
  });
});
