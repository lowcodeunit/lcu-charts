import { Component, OnInit } from '@angular/core';
import { colorSets, formatLabel, escapeLabel } from '@lowcodeunit/lcu-charts-common';
import { single } from '../../data';

@Component({
  selector: 'lcu-demo-gauge-simple',
  templateUrl: './demo-gauge-simple.component.html',
  styleUrls: ['./demo-gauge-simple.component.scss']
})
export class DemoGaugeSimpleComponent implements OnInit {
  public animations: boolean = true;
  public colorScheme: any;
  public gaugeAngleSpan: number = 240;
  public gaugeLargeSegments: number = 10;
  public gaugeMax: number = 100;
  public gaugeMin: number = 0;
  public gaugeShowAxis: boolean = true;
  public gaugeSmallSegments: number = 5;
  public gaugeStartAngle: number = -120;
  public gaugeTextValue: string = '';
  public gaugeUnits: string = 'alerts';
  public legendPosition: string = 'right';
  public legendTitle: string = '';
  public margin: boolean = false;
  public marginBottom: number = 40;
  public marginLeft: number = 40;
  public marginRight: number = 40;
  public marginTop: number = 40;
  public showLegend: boolean = true;
  public showText: boolean = true;
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
