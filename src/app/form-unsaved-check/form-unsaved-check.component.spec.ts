import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUnsavedCheckComponent } from './form-unsaved-check.component';

describe('FormUnsavedCheckComponent', () => {
  let component: FormUnsavedCheckComponent;
  let fixture: ComponentFixture<FormUnsavedCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUnsavedCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUnsavedCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
