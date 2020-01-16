import { Component, OnInit } from '@angular/core';
import { colorSets } from '@lowcodeunit/lcu-charts-common';
import { single } from '../../data';

@Component({
  selector: 'lcu-demo-demo-bar-chart-horizontal-simple',
  templateUrl: './demo-bar-chart-horizontal-simple.component.html',
  styleUrls: ['./demo-bar-chart-horizontal-simple.component.scss']
})
export class DemoBarChartHorizontalSimpleComponent implements OnInit {
  public animations: boolean = true;
  public barPadding: number = 8;
  public colorScheme: any;
  public gradient: boolean = false;
  public legendPosition: string = 'right';
  public legendTitle: string = '';
  public maxXAxisTickLength: number = 16;
  public maxYAxisTickLength: number = 16;
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
  public single: any[];
  public tooltipDisabled: boolean = false;
  public trimXAxisTicks: boolean = true;
  public trimYAxisTicks: boolean = true;
  public view: any[];
  public xAxisLabel: string = 'Country';
  public yAxisLabel: string = 'GDP Per Capita';

  private colorSets: any;
  private fitContainer: boolean = false;
  private height: number = 400;
  private width: number = 1000;

  constructor() {
    Object.assign(this, {
      colorSets,
      single
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
