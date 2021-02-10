import { TestBed, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ChartCommonModule } from '../chart-common.module';

@Component({
  selector: 'lcu-test-component',
  template: ''
})
class TestComponent {
  barData: any;
}

describe('<lcu-charts-chart>', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NoopAnimationsModule, ChartCommonModule]
    });
  });

  describe('basic setup', () => {
    beforeEach(waitForAsync(() => {
      // set up a  basic chart
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
                    <lcu-charts-chart
                        [view]="[400,800]"
                        >
                        <p>lcu-charts is cool!</p>
                    </lcu-charts-chart>
                `
        }
      }).compileComponents();
    }));

    it('should set the svg width and height', waitForAsync(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const svg = fixture.debugElement.nativeElement.querySelector('svg');

      expect(svg.getAttribute('width')).toBe('400');
      expect(svg.getAttribute('height')).toBe('800');
    }));

    it('should correctly project the inner content', waitForAsync(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const textNode = fixture.debugElement.nativeElement.querySelector('svg p');

      expect(textNode.textContent).toEqual('lcu-charts is cool!');
    }));
  });
});
