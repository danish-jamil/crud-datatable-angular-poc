import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleModalContentComponent } from './simple-modal-content.component';

describe('SimpleModalContentComponent', () => {
  let component: SimpleModalContentComponent;
  let fixture: ComponentFixture<SimpleModalContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleModalContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
