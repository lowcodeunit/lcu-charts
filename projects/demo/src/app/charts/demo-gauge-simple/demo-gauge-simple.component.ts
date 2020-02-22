import { Component, OnInit } from '@angular/core';
import { single } from '../../data';
import { ChartGaugeOptionsModel } from '@lowcodeunit/lcu-charts-common';
import { AppEventService } from '../../app-event.service';
import { AppConstants } from '../../app-constants';

@Component({
  selector: 'lcu-demo-gauge-simple',
  templateUrl: './demo-gauge-simple.component.html',
  styleUrls: ['./demo-gauge-simple.component.scss']
})
export class DemoGaugeSimpleComponent implements OnInit {
  public animations: boolean;
  public colorScheme: any;
  public gaugeAngleSpan: number = 240;
  public gaugeChartOptions: ChartGaugeOptionsModel;
  public gaugeLargeSegments: number = 10;
  public gaugeMax: number = 100;
  public gaugeMin: number = 0;
  public gaugeShowAxis: boolean = true;
  public gaugeSmallSegments: number = 5;
  public gaugeStartAngle: number = -120;
  public gaugeTextValue: string = '';
  public gaugeUnits: string = 'alerts';
  public legendPosition: string;
  public legendTitle: string;
  public margin: boolean = false;
  public marginBottom: number = 40;
  public marginLeft: number = 40;
  public marginRight: number = 40;
  public marginTop: number = 40;
  public showLegend: boolean;
  public showText: boolean = true;
  public single: any[];
  public tooltipDisabled: boolean;
  public view: any[];

  private colorSets: any;
  private fitContainer: boolean = false;
  private height: number;
  private width: number;

  constructor(
    private appEventService: AppEventService
  ) {
    this.gaugeChartOptions = {...AppConstants.DEFAULT_GLOBAL_CHART_OPTIONS, ...AppConstants.DEFAULT_GAUGE_CHART_OPTIONS};
    this.appEventService.getDemoFormValueEvent().subscribe(
      (value: any) => {
        this.updateChartOptions(value);
      }
    );
    Object.assign(this, this.gaugeChartOptions);
    this.setColorScheme(this.colorScheme);
    this.single = [...single];
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
