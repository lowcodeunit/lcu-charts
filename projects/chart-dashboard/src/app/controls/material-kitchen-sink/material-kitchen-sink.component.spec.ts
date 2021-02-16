import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaterialKitchenSinkComponent } from './material-kitchen-sink.component';

describe('MaterialKitchenSinkComponent', () => {
  let component: MaterialKitchenSinkComponent;
  let fixture: ComponentFixture<MaterialKitchenSinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialKitchenSinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialKitchenSinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
