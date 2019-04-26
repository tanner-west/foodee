import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIngredientsComponent } from './view-ingredients.component';

describe('ViewIngredientsComponent', () => {
  let component: ViewIngredientsComponent;
  let fixture: ComponentFixture<ViewIngredientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIngredientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
