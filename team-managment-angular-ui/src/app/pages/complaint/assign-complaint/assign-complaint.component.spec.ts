import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignComplaintComponent } from './assign-complaint.component';

describe('AssignComplaintComponent', () => {
  let component: AssignComplaintComponent;
  let fixture: ComponentFixture<AssignComplaintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignComplaintComponent]
    });
    fixture = TestBed.createComponent(AssignComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
