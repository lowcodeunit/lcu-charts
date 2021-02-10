import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoggedInUserComponent } from './logged-in-user.component';

describe('LoggedInUserComponent', () => {
  let component: LoggedInUserComponent;
  let fixture: ComponentFixture<LoggedInUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedInUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedInUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
