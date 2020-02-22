import { Component, OnInit } from '@angular/core';
import { colorSets, formatLabel, escapeLabel } from '@lowcodeunit/lcu-charts-common';
import * as shape from 'd3-shape';
import { single, multi, generateData } from '../../data';
import { data as countries } from 'emoji-flags';

@Component({
  selector: 'lcu-example-real-time-data',
  templateUrl: './example-real-time-data.component.html',
  styleUrls: ['./example-real-time-data.component.scss']
})
export class ExampleRealTimeDataComponent implements OnInit {

  /** SHARED OPTIONS */
  public animations: boolean = true;
  public autoScale: boolean = false;
  public colorScheme: any;
  public gradient: boolean = false;
  public legendPosition: string = 'right';
  public legendTitle: string = '';
  public maxXAxisTickLength: number = 16;
  public maxYAxisTickLength: number = 16;
  public range: boolean = false;
  public rotateXAxisTicks: boolean = true;
  public roundDomains: boolean = false;
  public schemeType: string = 'ordinal';
  public showDataLabel: boolean = false;
  public showGridLines: boolean = true;
  public showLegend: boolean = true;
  public showXAxis: boolean = true;
  public showXAxisLabel: boolean = true;
  public showYAxis: boolean = true;
  public showYAxisLabel: boolean = true;
  public tooltipDisabled: boolean = false;
  public trimXAxisTicks: boolean = true;
  public trimYAxisTicks: boolean = true;
  public view: any[];
  public xAxisLabel: string = 'Country';
  public xScaleMax: any;
  public xScaleMin: any;
  public yAxisLabel: string = 'GDP Per Capita';
  public yScaleMax: number;
  public yScaleMin: number;

  /** LINE OPTIONS */
  public curve: any;
  public dateData: any[];
  public dateDataWithRange: any[];
  public rangeFillOpacity: number = 0.15;
  public timeline: boolean = false;

  /** BAR OPTIONS */
  public barPadding: number = 8;
  public groupPadding: number = 16;
  public multi: any[];
  public noBarWhenZero: boolean = true;
  public roundEdges: boolean = true;

  /** PIE OPTIONS */
  public arcWidth: number = 0.25;
  public doughnut: boolean = false;
  public explodeSlices: boolean = false;
  public showLabels: boolean = true;
  public single: any[];

  /** GAUGE OPTIONS */
  public gaugeAngleSpan: number = 240;
  public gaugeLargeSegments: number = 10;
  public gaugeMax: number = 100;
  public gaugeMin: number = 0;
  public gaugeShowAxis: boolean = true;
  public gaugeSmallSegments: number = 5;
  public gaugeStartAngle: number = -120;
  public gaugeTextValue: string = '';
  public gaugeUnits: string = 'alerts';
  public margin: boolean = false;
  public marginBottom: number = 40;
  public marginLeft: number = 40;
  public marginRight: number = 40;
  public marginTop: number = 40;
  public showText: boolean = true;

  /** PRIVATE VARIABLES */
  private colorSets: any;
  private countries: any[];
  private curveType: string = 'Linear';
  private curves: any;
  private fitContainer: boolean = false;
  private height: number = 300;
  private width: number = 600;

  get dateDataWithOrWithoutRange() {
    if (this.range) {
      return this.dateDataWithRange;
    } else {
      return this.dateData;
    }
  }

  constructor() {
    Object.assign(this, {
      colorSets,
      countries,
      single,
      multi
    });
    this.setColorScheme('fathym');
    this.dateData = generateData(5, false);
    this.dateDataWithRange = generateData(2, true);
  }


  public ngOnInit(): void {
    if (!this.fitContainer) {
      this.applyDimensions();
    }

    setInterval(this.updateData.bind(this), 3000);

    this.curves = {
      'Basis': shape.curveBasis,
      'Basis Closed': shape.curveBasisClosed,
      'Bundle': shape.curveBundle.beta(1),
      'Cardinal': shape.curveCardinal,
      'Cardinal Closed': shape.curveCardinalClosed,
      'Catmull Rom': shape.curveCatmullRom,
      'Catmull Rom Closed': shape.curveCatmullRomClosed,
      'Linear': shape.curveLinear,
      'Linear Closed': shape.curveLinearClosed,
      'Monotone X': shape.curveMonotoneX,
      'Monotone Y': shape.curveMonotoneY,
      'Natural': shape.curveNatural,
      'Step': shape.curveStep,
      'Step After': shape.curveStepAfter,
      'Step Before': shape.curveStepBefore,
      'default': shape.curveLinear
    };
    this.curve = this.curves[this.curveType];
  }

  public updateData(): void {
    const country = this.countries[Math.floor(Math.random() * this.countries.length)];
    const add = Math.random() <= 0.5;
    const remove = Math.random() > 0.5;

    if (remove) {
      if (this.single.length > 1) {
        const index = Math.floor(Math.random() * this.single.length);
        this.single.splice(index, 1);
        this.single = [...this.single];
      }

      if (this.multi.length > 1) {
        const index = Math.floor(Math.random() * this.multi.length);
        this.multi.splice(index, 1);
        this.multi = [...this.multi];
      }
    }

    if (add) {
      // single
      const entry = {
        name: country.name,
        value: Math.floor(10000 + Math.random() * 50000)
      };
      this.single = [...this.single, entry];

      // multi
      const multiEntry = {
        name: country.name,
        series: [
          {
            name: '1990',
            value: Math.floor(10000 + Math.random() * 50000)
          },
          {
            name: '2000',
            value: Math.floor(10000 + Math.random() * 50000)
          },
          {
            name: '2010',
            value: Math.floor(10000 + Math.random() * 50000)
          }
        ]
      };

      this.multi = [...this.multi, multiEntry];
    }

    const date = new Date(Math.floor(1473700105009 + Math.random() * 1000000000));
    for (const series of this.dateData) {
      series.series.push({
        name: date,
        value: Math.floor(2000 + Math.random() * 5000)
      });
    }
    this.dateData = [...this.dateData];
    this.dateDataWithRange = generateData(2, true);
  }

  public activate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  public dblclick(event: any): void {
    console.log('Doube click', event);
  }

  public deactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  public onLegendLabelClick(entry: any): void {
    console.log('Legend clicked', entry);
  }

  public pieTooltipText({ data }: any): string {
    const label = formatLabel(data.name);
    const val = formatLabel(data.value);

    return `
      <span class="tooltip-label">${escapeLabel(label)}</span>
      <span class="tooltip-val">$${val}</span>
    `;
  }

  public select(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  private applyDimensions(): void {
    this.view = [this.width, this.height];
  }

  private setColorScheme(name: string): void {
    this.colorScheme = this.colorSets.find((s: any) => s.name === name);
  }

}
