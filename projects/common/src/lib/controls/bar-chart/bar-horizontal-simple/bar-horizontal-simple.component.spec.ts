import { TestBed, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { single } from '../../../../../../demo/src/app/data';
import { APP_BASE_HREF } from '@angular/common';

import { BarChartModule } from '../bar-chart.module';
import { BarComponent } from '../bar.component';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

@Component({
  selector: 'lcu-test-component',
  template: ''
})
class TestComponent {
  single: any = single;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
}

describe('<lcu-charts-bar-horizontal-simple>', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NoopAnimationsModule, BarChartModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    });
  });

  describe('basic setup', () => {
    beforeEach(waitForAsync(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
               <lcu-charts-bar-horizontal-simple
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="single">
              </lcu-charts-bar-horizontal-simple>`
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

    it('should render 12 cell elements', waitForAsync(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelectorAll('path.bar').length).toEqual(6);
    }));

    it('should render correct cell size', waitForAsync(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const bar = fixture.debugElement.query(By.directive(BarComponent));

      expect(bar.componentInstance.height).toEqual(123); // ~(780 - 5 * barPadding) / 6
    }));
  });

  describe('padding', () => {
    it('should render correct cell size, with zero padding', waitForAsync(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
               <lcu-charts-bar-horizontal-simple
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="single"
                [barPadding]="0">
              </lcu-charts-bar-horizontal-simple>`
        }
      });

      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const bar = fixture.debugElement.query(By.directive(BarComponent));

        expect(bar.componentInstance.height).toEqual(130); // ~(780 - 5 * barPadding) / 6
      });
    }));

    it('should render correct cell size, with padding', waitForAsync(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
               <lcu-charts-bar-horizontal-simple
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="single"
                [barPadding]="20">
              </lcu-charts-bar-horizontal-simple>`
        }
      });

      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const bar = fixture.debugElement.query(By.directive(BarComponent));

        expect(bar.componentInstance.height).toEqual(113); // ~(780 - 5 * barPadding) / 6
      });
    }));
  });
});
