import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectShoppingListComponent } from './select-shopping-list.component';

describe('SelectShoppingListComponent', () => {
  let component: SelectShoppingListComponent;
  let fixture: ComponentFixture<SelectShoppingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectShoppingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
