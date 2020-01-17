import { Component, OnInit } from '@angular/core';
import { colorSets } from '@lowcodeunit/lcu-charts-common';
import * as shape from 'd3-shape';
import { generateData } from '../../data';

@Component({
  selector: 'lcu-demo-area-chart-simple',
  templateUrl: './demo-area-chart-simple.component.html',
  styleUrls: ['./demo-area-chart-simple.component.scss']
})
export class DemoAreaChartSimpleComponent implements OnInit {
  public animations: boolean = true;
  public autoScale: boolean = false;
  public colorScheme: any;
  public curve: any;
  public dateData: any[];
  public dateDataWithRange: any[];
  public gradient: boolean = false;
  public legendPosition: string = 'right';
  public legendTitle: string = 'Country';
  public maxXAxisTickLength: number = 16;
  public maxYAxisTickLength: number = 16;
  public range: boolean = false;
  public rangeFillOpacity: number = 0.15;
  public rotateXAxisTicks: boolean = true;
  public roundDomains: boolean = false;
  public schemeType: string = 'ordinal';
  public showGridLines: boolean = true;
  public showLegend: boolean = true;
  public showXAxis: boolean = true;
  public showXAxisLabel: boolean = true;
  public showYAxis: boolean = true;
  public showYAxisLabel: boolean = true;
  public timeline: boolean = true;
  public tooltipDisabled: boolean = false;
  public trimXAxisTicks: boolean = true;
  public trimYAxisTicks: boolean = true;
  public view: any[];
  public xAxisLabel: string = 'Census Date';
  public xScaleMax: any;
  public xScaleMin: any;
  public yAxisLabel: string = 'GDP Per Capita';
  public yScaleMax: number;
  public yScaleMin: number;

  private colorSets: any;
  private curveType: string = 'Linear';
  private curves: any;
  private fitContainer: boolean = false;
  private height: number = 400;
  private width: number = 1000;

  get dateDataWithOrWithoutRange() {
    if (this.range) {
      return this.dateDataWithRange;
    } else {
      return this.dateData;
    }
  }

  constructor() {
    Object.assign(this, {
      colorSets
    });
    this.setColorScheme('cool');
    this.dateData = generateData(5, false);
    this.dateDataWithRange = generateData(2, true);
  }

  public ngOnInit(): void {
    if (!this.fitContainer) {
      this.applyDimensions();
    }
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

  public activate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  public deactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  public onLegendLabelClick(entry: any): void {
    console.log('Legend clicked', entry);
  }

  public select(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  private applyDimensions(): void {
    this.view = [this.width, this.height];
  }

  private setColorScheme(name: string): void {
    this.colorScheme = this.colorSets.find(s => s.name === name);
  }

}
