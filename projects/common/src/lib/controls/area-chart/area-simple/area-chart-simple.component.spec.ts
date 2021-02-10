import { TestBed, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { multi } from '../../../../../../demo/src/app/data';
import { APP_BASE_HREF } from '@angular/common';

import { AreaChartModule } from '../area-chart.module';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

const colors = ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'];

@Component({
  selector: 'lcu-test-component',
  template: ''
})
class TestComponent {
  data: any = multi;
  colorScheme = {
    domain: colors
  };
}

describe('<lcu-charts-area-chart-simple>', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NoopAnimationsModule, AreaChartModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    });
  });

  describe('basic setup', () => {
    beforeEach(waitForAsync(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
               <lcu-charts-area-chart-simple
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="data">
              </lcu-charts-area-chart-simple>`
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

    it('should render 4 area elements', waitForAsync(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelectorAll('path.area').length).toEqual(4);
    }));

    it('should match specified colors for area elements', waitForAsync(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;

      const fills = Array.from(compiled.querySelectorAll('path.area')).map((areaElement: Element) =>
        areaElement.getAttribute('fill')
      );
      expect(colors.every(color => fills.includes(color))).toBeTruthy();
    }));
  });
});
