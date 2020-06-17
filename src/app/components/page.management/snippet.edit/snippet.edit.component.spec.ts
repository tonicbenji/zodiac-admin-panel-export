import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Snippet.EditComponent } from './snippet.edit.component';

describe('Snippet.EditComponent', () => {
  let component: Snippet.EditComponent;
  let fixture: ComponentFixture<Snippet.EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Snippet.EditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Snippet.EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
