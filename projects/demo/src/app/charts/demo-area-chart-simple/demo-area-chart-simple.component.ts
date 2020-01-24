import { Component, OnInit } from '@angular/core';
import { generateData } from '../../data';
import { ChartLineAreaOptionsModel } from '../../models/chart-line-area-options.model';
import { AppEventService } from '../../app-event.service';
import { AppConstants } from '../../app-constants';

@Component({
  selector: 'lcu-demo-area-chart-simple',
  templateUrl: './demo-area-chart-simple.component.html',
  styleUrls: ['./demo-area-chart-simple.component.scss']
})
export class DemoAreaChartSimpleComponent implements OnInit {
  public animations: boolean;
  public autoScale: boolean;
  public colorScheme: any;
  public curve: any;
  public dateData: any[];
  public dateDataWithRange: any[];
  public gradient: boolean;
  public legendPosition: string;
  public legendTitle: string;
  public areaChartOptions: ChartLineAreaOptionsModel;
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
    this.areaChartOptions = {...AppConstants.DEFAULT_GLOBAL_CHART_OPTIONS, ...AppConstants.DEFAULT_LINE_AREA_CHART_OPTIONS};
    this.appEventService.getDemoFormValueEvent().subscribe(
      (value) => {
        this.updateChartOptions(value);
      }
    );
    Object.assign(this, this.areaChartOptions);
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
    this.colorScheme = this.colorSets.find(s => s.name === name);
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
