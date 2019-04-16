import { TestBed } from '@angular/core/testing';

import { SelectShoppingListService } from './select-shopping-list.service';

describe('SelectShoppingListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectShoppingListService = TestBed.get(SelectShoppingListService);
    expect(service).toBeTruthy();
  });
});
