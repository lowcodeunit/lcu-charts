import { Component, OnInit } from '@angular/core';
import { bubble } from '../../data';
import { AppEventService } from '../../app-event.service';
import { AppConstants } from '../../app-constants';
import { ChartBubbleOptionsModel } from '@lowcodeunit/lcu-charts-common';

@Component({
  selector: 'lcu-demo-bubble-chart-simple',
  templateUrl: './demo-bubble-chart-simple.component.html',
  styleUrls: ['./demo-bubble-chart-simple.component.scss']
})
export class DemoBubbleChartSimpleComponent implements OnInit {
  public animations: boolean;
  public autoScale: boolean;
  public bubble: any;
  public bubbleChartOptions: ChartBubbleOptionsModel;
  public colorScheme: any;
  public legendPosition: string;
  public legendTitle: string;
  public maxRadius: number;
  public maxXAxisTickLength: number;
  public maxYAxisTickLength: number;
  public minRadius: number;
  public rotateXAxisTicks: boolean;
  public roundDomains: boolean;
  public schemeType: string;
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
    this.bubbleChartOptions = {...AppConstants.DEFAULT_GLOBAL_CHART_OPTIONS, ...AppConstants.DEFAULT_BUBBLE_CHART_OPTIONS};
    this.appEventService.getDemoFormValueEvent().subscribe(
      (value: any) => {
        this.updateChartOptions(value);
      }
    );
    Object.assign(this, this.bubbleChartOptions);
    this.setColorScheme(this.colorScheme);
    this.bubble = [...bubble];
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
