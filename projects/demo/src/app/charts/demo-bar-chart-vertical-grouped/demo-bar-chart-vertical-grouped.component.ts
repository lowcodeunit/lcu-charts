import { Component, OnInit } from '@angular/core';
import { colorSets } from '@lowcodeunit/lcu-charts-common';
import { multi } from '../../data';

@Component({
  selector: 'lcu-demo-bar-chart-vertical-grouped',
  templateUrl: './demo-bar-chart-vertical-grouped.component.html',
  styleUrls: ['./demo-bar-chart-vertical-grouped.component.scss']
})
export class DemoBarChartVerticalGroupedComponent implements OnInit {
  public animations: boolean = true;
  public barPadding: number = 8;
  public colorScheme: any;
  public gradient: boolean = false;
  public groupPadding: number = 16;
  public legendPosition: string = 'right';
  public legendTitle: string = '';
  public maxXAxisTickLength: number = 16;
  public maxYAxisTickLength: number = 16;
  public multi: any[];
  public noBarWhenZero: boolean = true;
  public rotateXAxisTicks: boolean = true;
  public roundDomains: boolean = false;
  public roundEdges: boolean = true;
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

  private colorSets: any;
  private fitContainer: boolean = false;
  private height: number = 400;
  private width: number = 1000;

  constructor() {
    Object.assign(this, {
      colorSets,
      multi
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
