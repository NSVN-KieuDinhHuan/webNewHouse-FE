import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSaleComponent } from './best-sale.component';

describe('BestSaleComponent', () => {
  let component: BestSaleComponent;
  let fixture: ComponentFixture<BestSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
