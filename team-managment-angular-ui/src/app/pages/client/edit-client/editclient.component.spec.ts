import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditclientComponent } from './editclient.component';

describe('EditclientComponent', () => {
  let component: EditclientComponent;
  let fixture: ComponentFixture<EditclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditclientComponent]
    });
    fixture = TestBed.createComponent(EditclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
