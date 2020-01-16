import { Component, OnInit } from '@angular/core';
import { colorSets, formatLabel, escapeLabel } from '@lowcodeunit/lcu-charts-common';
import { single } from '../../data';

@Component({
  selector: 'lcu-demo-pie-chart-advanced',
  templateUrl: './demo-pie-chart-advanced.component.html',
  styleUrls: ['./demo-pie-chart-advanced.component.scss']
})
export class DemoPieChartAdvancedComponent implements OnInit {
  public animations: boolean = true;
  public colorScheme: any;
  public gradient: boolean = false;
  public single: any[];
  public tooltipDisabled: boolean = false;
  public view: any[];

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

}
