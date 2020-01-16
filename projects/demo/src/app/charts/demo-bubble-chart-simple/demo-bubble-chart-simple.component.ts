import { Component, OnInit } from '@angular/core';
import { colorSets } from '@lowcodeunit/lcu-charts-common';
import { bubble } from '../../data';

@Component({
  selector: 'lcu-demo-bubble-chart-simple',
  templateUrl: './demo-bubble-chart-simple.component.html',
  styleUrls: ['./demo-bubble-chart-simple.component.scss']
})
export class DemoBubbleChartSimpleComponent implements OnInit {
  public animations: boolean = true;
  public autoScale: boolean = false;
  public bubble: any;
  public colorScheme: any;
  public legendPosition: string = 'right';
  public legendTitle: string = '';
  public maxRadius: number = 20;
  public maxXAxisTickLength: number = 16;
  public maxYAxisTickLength: number = 16;
  public minRadius: number = 5;
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
  public tooltipDisabled: boolean = false;
  public trimXAxisTicks: boolean = true;
  public trimYAxisTicks: boolean = true;
  public view: any[];
  public xAxisLabel: string = 'Census Date';
  public xScaleMax: any;
  public xScaleMin: any;
  public yAxisLabel: string = 'Life expectancy [years]';
  public yScaleMax: number = 82;
  public yScaleMin: number = 74;

  private colorSets: any;
  private fitContainer: boolean = false;
  private height: number = 400;
  private width: number = 1000;

  constructor() {
    Object.assign(this, {
      colorSets,
      bubble
    });
    this.setColorScheme('cool');
  }

  public ngOnInit(): void {
    if (!this.fitContainer) {
      this.applyDimensions();
    }
  }

  public activate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  public deactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
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
