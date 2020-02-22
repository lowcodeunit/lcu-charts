import { Component, OnInit } from '@angular/core';
import { generateData } from '../../data';
import { AppEventService } from '../../app-event.service';
import { ChartLineAreaOptionsModel } from '@lowcodeunit/lcu-charts-common';
import { AppConstants } from '../../app-constants';

@Component({
  selector: 'lcu-demo-line-chart',
  templateUrl: './demo-line-chart.component.html',
  styleUrls: ['./demo-line-chart.component.scss']
})
export class DemoLineChartComponent implements OnInit {
  public animations: boolean;
  public autoScale: boolean;
  public colorScheme: any;
  public curve: any;
  public dateData: any[];
  public dateDataWithRange: any[];
  public gradient: boolean;
  public legendPosition: string;
  public legendTitle: string;
  public lineChartOptions: ChartLineAreaOptionsModel;
  public maxXAxisTickLength: number;
  public maxYAxisTickLength: number;
  public range: boolean;
  public rangeFillOpacity: number;
  public rotateXAxisTicks: boolean;
  public roundDomains: boolean;
  public schemeType: string;
  public showGridLines: boolean;
  public showLegend: boolean;
  public showXAxis: boolean;
  public showXAxisLabel: boolean;
  public showYAxis: boolean;
  public showYAxisLabel: boolean;
  public timeline: boolean;
  public tooltipDisabled: boolean;
  public trimXAxisTicks: boolean;
  public trimYAxisTicks: boolean;
  public view: any[];
  public xAxisLabel: string;
  public xScaleMax: any;
  public xScaleMin: any;
  public yAxisLabel: string;
  public yScaleMax: number;
  public yScaleMin: number;

  private colorSets: any;
  private fitContainer: boolean = false;
  private height: number;
  private width: number;

  get dateDataWithOrWithoutRange() {
    if (this.range) {
      return this.dateDataWithRange;
    } else {
      return this.dateData;
    }
  }

  constructor(
    private appEventService: AppEventService
  ) {
    this.lineChartOptions = {...AppConstants.DEFAULT_GLOBAL_CHART_OPTIONS, ...AppConstants.DEFAULT_LINE_AREA_CHART_OPTIONS};
    this.appEventService.getDemoFormValueEvent().subscribe(
      (value: any) => {
        this.updateChartOptions(value);
      }
    );
    Object.assign(this, this.lineChartOptions);
    this.setColorScheme(this.colorScheme);
    this.dateData = generateData(5, false);
    this.dateDataWithRange = generateData(2, true);
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
    this.colorScheme = this.colorSets.find((s: any) => s.name === name);
  }

  private updateChartOptions(value: any): void {
    Object.assign(this, value);

    if (!this.fitContainer) {
      this.applyDimensions();
    } else {
      this.view = undefined;
    }
  }

}
