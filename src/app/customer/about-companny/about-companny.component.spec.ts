import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCompannyComponent } from './about-companny.component';

describe('AboutCompannyComponent', () => {
  let component: AboutCompannyComponent;
  let fixture: ComponentFixture<AboutCompannyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutCompannyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutCompannyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
