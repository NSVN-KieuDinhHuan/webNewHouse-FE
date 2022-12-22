import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartsTableComponent } from './carts-table.component';

describe('CartTableComponent', () => {
  let component: CartsTableComponent;
  let fixture: ComponentFixture<CartsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
