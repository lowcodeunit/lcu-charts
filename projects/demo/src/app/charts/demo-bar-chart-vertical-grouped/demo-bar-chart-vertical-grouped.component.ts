import { Component, OnInit } from '@angular/core';
import { multi } from '../../data';
import { AppEventService } from '../../app-event.service';
import { AppConstants } from '../../app-constants';
import { ChartBarOptionsModel } from '@lowcodeunit/lcu-charts-common';

@Component({
  selector: 'lcu-demo-bar-chart-vertical-grouped',
  templateUrl: './demo-bar-chart-vertical-grouped.component.html',
  styleUrls: ['./demo-bar-chart-vertical-grouped.component.scss']
})
export class DemoBarChartVerticalGroupedComponent implements OnInit {
  public animations: boolean;
  public barChartOptions: ChartBarOptionsModel;
  public barPadding: number;
  public colorScheme: any;
  public gradient: boolean;
  public groupPadding: number;
  public legendPosition: string;
  public legendTitle: string;
  public maxXAxisTickLength: number;
  public maxYAxisTickLength: number;
  public multi: any[];
  public noBarWhenZero: boolean;
  public rotateXAxisTicks: boolean;
  public roundDomains: boolean;
  public roundEdges: boolean;
  public schemeType: string;
  public showDataLabel: boolean;
  public showGridLines: boolean;
  public showLegend: boolean;
  public showXAxis: boolean;
  public showXAxisLabel: boolean;
  public showYAxis: boolean;
  public showYAxisLabel: boolean;
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

  constructor(
    private appEventService: AppEventService
  ) {
    this.barChartOptions = {...AppConstants.DEFAULT_GLOBAL_CHART_OPTIONS, ...AppConstants.DEFAULT_BAR_CHART_OPTIONS};
    this.appEventService.getDemoFormValueEvent().subscribe(
      (value: any) => {
        this.updateChartOptions(value);
      }
    );
    Object.assign(this, this.barChartOptions);
    this.setColorScheme(this.colorScheme);
    this.multi = [...multi];
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
