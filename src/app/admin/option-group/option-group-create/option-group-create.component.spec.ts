import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionGroupCreateComponent } from './option-group-create.component';

describe('OptionGroupCreateComponent', () => {
  let component: OptionGroupCreateComponent;
  let fixture: ComponentFixture<OptionGroupCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionGroupCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
