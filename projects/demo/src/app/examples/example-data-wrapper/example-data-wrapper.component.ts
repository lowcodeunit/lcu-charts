import { Component, OnInit, OnDestroy } from '@angular/core';
import { colorSets, formatLabel, escapeLabel } from '@lowcodeunit/lcu-charts-common';
import * as shape from 'd3-shape';
import { single, multi } from '../../data';
import { data as countries } from 'emoji-flags';
import { AppEventService } from '../../app-event.service';
import { DataService } from '../../data.service';
import { DataWrapper } from '@lowcodeunit/lcu-charts-common';

@Component({
  selector: 'lcu-example-data-wrapper',
  templateUrl: './example-data-wrapper.component.html',
  styleUrls: ['./example-data-wrapper.component.scss'],
  providers: [DataService]
})
export class ExampleDataWrapperComponent implements OnInit, OnDestroy {

  /** SHARED OPTIONS */
  public animations: boolean = true;
  public autoScale: boolean = true;
  public colorScheme: any;
  public dataWrapper: DataWrapper = new DataWrapper({});
  public gradient: boolean = false;
  public legendPosition: string = 'right';
  public legendTitle: string = '';
  public maxXAxisTickLength: number = 16;
  public maxYAxisTickLength: number = 16;
  public range: boolean = false;
  public realTimeData: boolean = false;
  public rotateXAxisTicks: boolean = true;
  public roundDomains: boolean = false;
  public schemeType: string = 'ordinal';
  public showDataLabel: boolean = false;
  public showGridLines: boolean = true;
  public showLegend: boolean = true;
  public showXAxis: boolean = true;
  public showXAxisLabel: boolean = true;
  public showYAxis: boolean = true;
  public showYAxisLabel: boolean = true;
  public tooltipDisabled: boolean = false;
  public trimXAxisTicks: boolean = true;
  public trimYAxisTicks: boolean = true;
  public view: any[];
  public xScaleMax: any;
  public xScaleMin: any;
  public yScaleMax: number;
  public yScaleMin: number;

  /** LINE/AREA OPTIONS */
  public areaGradient: boolean = true;
  public curve: any;
  public lineXAxisLabel: string = 'Time';
  public lineYAxisLabel: string = 'Temperature (F)';
  public rangeFillOpacity: number = 0.15;
  public timeline: boolean = false;

  /** BAR OPTIONS */
  public barPadding: number = 8;
  public barXAxisLabel: string = 'Average Temp (F)';
  public barYAxisLabel: string = '';
  public groupPadding: number = 16;
  public multi: any[];
  public noBarWhenZero: boolean = true;
  public roundEdges: boolean = true;

  /** PIE OPTIONS */
  public arcWidth: number = 0.25;
  public doughnut: boolean = false;
  public explodeSlices: boolean = false;
  public showLabels: boolean = true;
  public single: any[];

  /** GAUGE OPTIONS */
  public gaugeAngleSpan: number = 240;
  public gaugeLargeSegments: number = 10;
  public gaugeMax: number = 100;
  public gaugeMin: number = 0;
  public gaugeShowAxis: boolean = true;
  public gaugeSmallSegments: number = 5;
  public gaugeStartAngle: number = -120;
  public gaugeTextValue: string = 'Average';
  public gaugeUnits: string = 'Temps';
  public margin: boolean = false;
  public marginBottom: number = 40;
  public marginLeft: number = 40;
  public marginRight: number = 40;
  public marginTop: number = 40;
  public showText: boolean = true;

  /** BUBBLE OPTIONS */
  public bubbleWeather: any;
  public bubbleXAxisLabel: string = 'Time';
  public bubbleYAxisLabel: string = 'Route Delay Risk';
  public maxRadius: number = 10;
  public minRadius: number = 5;

  /** STAND ALONE CHARTS */
  public countryXAxisLabel: string = 'Census Date';
  public countryYAxisLabel: string = 'GDP Per Capita';

  /** PRIVATE VARIABLES */
  private colorSets: any;
  private countries: any[];
  private countryInterval: any;
  private currentMilliseconds: number;
  private curveType: string = 'Linear';
  private curves: any;
  private fitContainer: boolean = false;
  private height: number = 300;
  private lastRoadTemp: number;
  private lastSurfaceTemp: number;
  private weatherInterval: any;
  private width: number = 600;

  constructor(
    private appEventService: AppEventService,
    private dataService: DataService
  ) {
    Object.assign(this, {
      colorSets,
      countries,
      single,
      multi
    });
    this.dataService.GetSingleWeatherData().subscribe(
      (data: any) => {
        this.dataWrapper.singleSeries = data;
      }
    );
    this.dataService.GetMultiWeatherData().subscribe(
      (data: any) => {
        this.dataWrapper.multiSeries = data;
        this.lastSurfaceTemp = data[0].series[data[0].series.length - 1].value;
        this.lastRoadTemp = data[1].series[data[1].series.length - 1].value;
      }
    );
    this.dataService.GetBubbleWeatherData().subscribe(
      (data: any) => {
        this.dataWrapper.bubbleSeries = data;
      }
    );
    this.appEventService.getDemoFormValueEvent().subscribe(
      (value: any) => {
        this.dataWrapper = value.dataWrapper;
      }
    );
    this.appEventService.getRealTimeCheckedEvent().subscribe(
      (value: boolean) => {
        this.realTimeData = value;

        if (this.realTimeData) {
          this.countryInterval = setInterval(this.updateCountryData.bind(this), 5000);
          this.weatherInterval = setInterval(this.updateWeatherData.bind(this), 1000);
        } else {
          this.clearIntervals();
        }
      }
    );

    this.setColorScheme('fathym');
    this.currentMilliseconds = 1582960213000;
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

  public ngOnDestroy(): void {
    this.clearIntervals();
  }

  private clearIntervals(): void {
    clearInterval(this.countryInterval);
    clearInterval(this.weatherInterval);
  }

  public updateCountryData(): void {
    const country = this.countries[Math.floor(Math.random() * this.countries.length)];
    const add = Math.random() <= 0.5;
    const remove = Math.random() > 0.5;

    if (remove) {
      if (this.single.length > 1) {
        const index = Math.floor(Math.random() * this.single.length);
        this.single.splice(index, 1);
        this.single = [...this.single];
      }

      if (this.multi.length > 1) {
        const index = Math.floor(Math.random() * this.multi.length);
        this.multi.splice(index, 1);
        this.multi = [...this.multi];
      }
    }

    if (add) {
      // single
      const entry = {
        name: country.name,
        value: Math.floor(10000 + Math.random() * 50000)
      };
      this.single = [...this.single, entry];

      // multi
      const multiEntry = {
        name: country.name,
        series: [
          {
            name: '1990',
            value: Math.floor(10000 + Math.random() * 50000)
          },
          {
            name: '2000',
            value: Math.floor(10000 + Math.random() * 50000)
          },
          {
            name: '2010',
            value: Math.floor(10000 + Math.random() * 50000)
          }
        ]
      };

      this.multi = [...this.multi, multiEntry];
    }
  }

  public updateWeatherData(): void {
    const add = Math.random() <= 0.6;

    if (add) {
      const isPlus: boolean = Math.random() <= 0.5;
      const numToCalc: number = Number.parseFloat((Math.random() * (3 - 0) + 0).toFixed(13));
      const surfaceTemp = isPlus ? (this.lastSurfaceTemp += numToCalc) : (this.lastSurfaceTemp -= numToCalc);
      const roadTemp = isPlus ? (this.lastRoadTemp += numToCalc) : (this.lastRoadTemp -= numToCalc);
      this.currentMilliseconds = this.currentMilliseconds + 60000;
      const date = new Date(this.currentMilliseconds);

      const newSingleSeries = [...this.dataWrapper.singleSeries];
      const newMultiSeries = [...this.dataWrapper.multiSeries];
      const newBubbleSeries = [...this.dataWrapper.bubbleSeries];
      const currValue: any = newSingleSeries[0].value;

      newSingleSeries[0].value = isPlus ? (currValue + (numToCalc * 2)) : (currValue - (numToCalc * 2));

      newMultiSeries[0].series.push({
        value: surfaceTemp,
        name: date
      });

      newMultiSeries[1].series.push({
        value: roadTemp,
        name: date
      });

      newBubbleSeries.forEach((bubble: any) => {
        bubble.series.map((s: any) => s.y = isPlus ? (s.y + (Math.random() * (1 - 0) + 0)) : (s.y - (Math.random() * (2 - 0) + 0)));
      });

      this.dataWrapper = {
        multiSeries: newMultiSeries,
        singleSeries: newSingleSeries,
        bubbleSeries: newBubbleSeries
      };
    }
  }

  public pieTooltipText({ data }: any): string {
    const label = formatLabel(data.name);
    const val = formatLabel(data.value);

    return `
      <span class="tooltip-label">${escapeLabel(label)}</span>
      <span class="tooltip-val">${val}</span>
    `;
  }

  private applyDimensions(): void {
    this.view = [this.width, this.height];
  }

  private setColorScheme(name: string): void {
    this.colorScheme = this.colorSets.find((s: any) => s.name === name);
  }

}
