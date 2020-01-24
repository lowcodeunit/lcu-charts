import { Component, OnInit } from '@angular/core';
import { formatLabel, escapeLabel } from '@lowcodeunit/lcu-charts-common';
import { single } from '../../data';
import { ChartPieOptionsModel } from '@lowcodeunit/lcu-charts-common';
import { AppEventService } from '../../app-event.service';
import { AppConstants } from '../../app-constants';

@Component({
  selector: 'lcu-demo-pie-chart-advanced',
  templateUrl: './demo-pie-chart-advanced.component.html',
  styleUrls: ['./demo-pie-chart-advanced.component.scss']
})
export class DemoPieChartAdvancedComponent implements OnInit {
  public animations: boolean;
  public arcWidth: number;
  public colorScheme: any;
  public doughnut: boolean;
  public gradient: boolean;
  public legendPosition: string;
  public legendTitle: string;
  public pieChartOptions: ChartPieOptionsModel;
  public showLegend: boolean;
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
    this.pieChartOptions = {...AppConstants.DEFAULT_GLOBAL_CHART_OPTIONS, ...AppConstants.DEFAULT_ADVANCED_PIE_CHART_OPTIONS};
    this.appEventService.getDemoFormValueEvent().subscribe(
      (value) => {
        this.updateChartOptions(value);
      }
    );
    Object.assign(this, this.pieChartOptions);
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

  public dblclick(event): void {
    console.log('Doube click', event);
  }

  public deactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  public onLegendLabelClick(entry: any): void {
    console.log('Legend clicked', entry);
  }

  public pieTooltipText({ data }): string {
    const label = formatLabel(data.name);
    const val = formatLabel(data.value);

    return `
      <span class="tooltip-label">${escapeLabel(label)}</span>
      <span class="tooltip-val">$${val}</span>
    `;
  }

  public select(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  public valueFormatting(value: number): string {
    return `${Math.round(value).toLocaleString()} €`;
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
