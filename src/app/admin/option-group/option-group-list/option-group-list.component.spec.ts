import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionGroupListComponent } from './option-group-list.component';

describe('OptionGroupListComponent', () => {
  let component: OptionGroupListComponent;
  let fixture: ComponentFixture<OptionGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
