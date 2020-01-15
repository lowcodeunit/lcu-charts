import { Component, OnInit } from '@angular/core';
import { colorSets } from '@lowcodeunit/lcu-charts-common';
import * as shape from 'd3-shape';
import { weatherData } from '../../data';

@Component({
  selector: 'lcu-demo-line-chart',
  templateUrl: './demo-line-chart.component.html',
  styleUrls: ['./demo-line-chart.component.scss']
})
export class DemoLineChartComponent implements OnInit {

  public animations: boolean = true;
  public autoScale = true;
  public colorScheme: any;
  public curve: any;
  public gradient = false;
  public legendPosition = 'right';
  public legendTitle = '';
  public maxXAxisTickLength = 16;
  public maxYAxisTickLength = 16;
  public rangeFillOpacity: number = 0.15;
  public rotateXAxisTicks = true;
  public roundDomains = false;
  public schemeType: string = 'ordinal';
  public showGridLines = true;
  public showLegend = true;
  public showXAxis = true;
  public showXAxisLabel = true;
  public showYAxis = true;
  public showYAxisLabel = true;
  public timeline = false;
  public tooltipDisabled = false;
  public trimXAxisTicks = true;
  public trimYAxisTicks = true;
  public view: any[];
  public weatherData: any[];
  public xAxisLabel = 'Time';
  public xScaleMax: any;
  public xScaleMin: any;
  public yAxisLabel = 'Temperature (F)';
  public yScaleMax: number;
  public yScaleMin: number;

  private colorSets: any;
  private curveType: string = 'Linear';
  private curves: any;
  private fitContainer: boolean = false;
  private height: number = 400;
  private width: number = 1000;

  constructor() {
    Object.assign(this, {
      colorSets,
      weatherData
    });
    this.setColorScheme('cool');
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
