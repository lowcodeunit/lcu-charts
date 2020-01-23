import { Component, OnInit } from '@angular/core';
import { colorSets, DateFormatModel } from '@lowcodeunit/lcu-charts-common';
import * as shape from 'd3-shape';
import { weatherData } from '../../data';
import { ViewDimensions } from 'projects/common/src/lcu.api';
@Component({
  selector: 'lcu-example-chart-synchronization',
  templateUrl: './example-chart-synchronization.component.html',
  styleUrls: ['./example-chart-synchronization.component.scss']
})
export class ExampleChartSynchronizationComponent implements OnInit {
  public animations: boolean = true;
  public autoScale: boolean = false;
  public colorScheme: any;
  public curve: any;
  public gradient: boolean = false;
  public legendPosition: string = 'right';
  public legendTitle: string = '';
  public maxXAxisTickLength: number = 16;
  public maxYAxisTickLength: number = 16;
  public rangeFillOpacity: number = 0.15;
  public rotateXAxisTicks: boolean = true;
  public roundDomains: boolean = false;
  public schemeType: string = 'ordinal';
  public showGridLines: boolean = true;
  public showLegend: boolean = false;
  public showXAxis: boolean = true;
  public showXAxisLabel: boolean = false;
  public showYAxis: boolean = true;
  public showYAxisLabel: boolean = false;
  public timeline: boolean = false;
  public tooltipDisabled: boolean = false;
  public trimXAxisTicks: boolean = true;
  public trimYAxisTicks: boolean = true;
  public view: any[];
  public weatherData: any[];
  public xAxisLabel: string = 'Time';
  public xScaleMax: any;
  public xScaleMin: any;
  public yAxisLabel: string = 'Temperature (F)';
  public yScaleMax: number = 100;
  public yScaleMin: number;
  public yUnits: string = '\u00B0';
  public backgroundGradientConfigs: BackgroundGradientConfigurationNode[] = [];
  public showPercentage: boolean = false;
  public yAxisTickFormatting = this.FormatYAxisTicks.bind(this);
  public yAxisTicks: Array<any> = [0, 30, 70, 100];
  public xAxisIsDate: boolean = true;
  public xAxisDateFormat: DateFormatModel = {
    DayOfWeek: true,
    Month: false,
    DayOfMonth: true,
    Year: false,
    Time: true,
    TimeZone: false
  };

  public dims: ViewDimensions= {width:550, height: 275, xOffset:70}
  public formatTooltip:boolean = true;

  private colorSets: any;
  private curveType: string = 'Linear';
  private curves: any;
  private fitContainer: boolean = false;
  private height: number = 310;
  private width: number = 625;


  constructor() {
    Object.assign(this, {
      colorSets,
      weatherData
    });
    this.setColorScheme('cool');
    this.setBackgroundGradientConfigs();
  }

  public hoveredVerticalChange(e) {
    // console.log('message from tooltip - the x value hover has changed to: ', e)

    this.ManualHover = e;
    // now send it back to the tooltip to manually show that vertical line
  }

  public ManualHover: any;

  public onHoverChange(e) {
    this.ManualHover = e;
    // console.log('on hover change...: ', e)
    this.ManualHover = e;
  }



  public ngOnInit(): void {
    if (!this.fitContainer) {
      this.applyDimensions();
    }
    this.curves = {
      'Basis': shape.curveBasis,
      'Basis Closed': shape.curveBasisClosed,
      'Bundle': shape.curveBundle.beta(1),
      'Cardinal': shape.curveCardinal,
      'Cardinal Closed': shape.curveCardinalClosed,
      'Catmull Rom': shape.curveCatmullRom,
      'Catmull Rom Closed': shape.curveCatmullRomClosed,
      'Linear': shape.curveLinear,
      'Linear Closed': shape.curveLinearClosed,
      'Monotone X': shape.curveMonotoneX,
      'Monotone Y': shape.curveMonotoneY,
      'Natural': shape.curveNatural,
      'Step': shape.curveStep,
      'Step After': shape.curveStepAfter,
      'Step Before': shape.curveStepBefore,
      'default': shape.curveLinear
    };
    this.curve = this.curves[this.curveType];
  }

  public FormatYAxisTicks(value: any) {
    if (value <= 0) {
      return "Freezing";
    }
    if (value > 0 && value <= 32) {
      return "Cold";
    }
    if (value > 32 && value <= 70) {
      return "Warm";
    }
    if (value > 70) {
      return "Hot";
    }
  }


  public FormatYAxisTicksDegree(value: any) {
    return value + this.yUnits;
  }

  public BuildSeriesTooltip(model: any) {
    console.log("model=", model);
    console.log("type=", model.type())
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

  protected setBackgroundGradientConfigs() {
    const backgroundMarker = this.weatherData[0].series;

    backgroundMarker.forEach((ser, idx) => {
      const idxPercentage = idx * 100 / backgroundMarker.length;
      if (ser.value > 38) {
        this.backgroundGradientConfigs.push({
          offset: idxPercentage,
          color: 'red'
        });
      } else if (ser.value > 33) {
        this.backgroundGradientConfigs.push({
          offset: idxPercentage,
          color: 'orange'
        });
      } else {
        this.backgroundGradientConfigs.push({
          offset: idxPercentage,
          color: 'blue'
        });
      }
    });
  }

}

export class BackgroundGradientConfigurationNode {
  offset: number;
  color: string;

  constructor(node: BackgroundGradientConfigurationNode) {
    this.offset = node.offset;
    this.color = node.color;
  }
}
