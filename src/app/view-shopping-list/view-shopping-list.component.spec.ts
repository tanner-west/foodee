import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShoppingListComponent } from './view-shopping-list.component';

describe('ViewShoppingListComponent', () => {
  let component: ViewShoppingListComponent;
  let fixture: ComponentFixture<ViewShoppingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewShoppingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
