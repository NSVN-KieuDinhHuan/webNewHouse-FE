import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionGroupEditComponent } from './option-group-edit.component';

describe('OptionGroupEditComponent', () => {
  let component: OptionGroupEditComponent;
  let fixture: ComponentFixture<OptionGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionGroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
