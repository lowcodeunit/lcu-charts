import { Component, OnInit, Input, ContentChildren, QueryList, AfterContentInit, OnChanges } from '@angular/core';
import { SingleSeries, MultiSeries, BubbleChartMultiSeries } from '../../models/chart-data.model';
import { PieChartAdvancedComponent } from '../pie-chart/pie-advanced/pie-chart-advanced.component';
import { AreaChartSimpleComponent } from '../area-chart/area-simple/area-chart-simple.component';
import { BubbleChartSimpleComponent } from '../bubble-chart/bubble-simple/bubble-chart-simple.component';
import { GaugeSimpleComponent } from '../gauge/gauge-simple/gauge-simple.component';
import { BarHorizontalGroupedComponent } from '../bar-chart/bar-horizontal-grouped/bar-horizontal-grouped.component';
import { BarHorizontalSimpleComponent } from '../bar-chart/bar-horizontal-simple/bar-horizontal-simple.component';
import { LineChartSimpleComponent } from '../line-chart/line-simple/line-chart-simple.component';
import { PieChartSimpleComponent } from '../pie-chart/pie-simple/pie-chart-simple.component';
import { BarVerticalGroupedComponent } from '../bar-chart/bar-vertical-grouped/bar-vertical-grouped.component';
import { BarVerticalSimpleComponent } from '../bar-chart/bar-vertical-simple/bar-vertical-simple.component';

/**
 * DataWrapper
 *
 * Data Object that defines the Data set(s) for one-to-many charts inside the `DataWrapperComponent`.
 * Currently supports Line/Area, Bar, Pie, Gauge, and Bubble charts.
 *
 * @property {SingleSeries} singleSeries - Data structure for single tiered charts. Currently supports the following charts:
 *  @see `BarHorizontalSimpleComponent`
 *  @see `BarVerticalSimpleComponent`
 *  @see `PieChartSimpleComponent`
 *  @see `PieChartAdvancedComponent`
 *  @see `GaugeSimpleComponent`
 *
 * @property {MultiSeries} multiSeries - Data structure for multi tiered charts. Currently supports the following charts:
 *  @see `AreaChartSimpleComponent`
 *  @see `LineChartSimpleComponent`
 *  @see `BarHorizontalGroupedComponent`
 *  @see `BarVerticalGroupedComponent`
 *
 * @property {BubbleChartMultiSeries} bubbleSeries - Data structure for bubble charts.
 */
export class DataWrapper {
  singleSeries?: SingleSeries;
  multiSeries?: MultiSeries;
  bubbleSeries?: BubbleChartMultiSeries;

  constructor(opts: DataWrapper) {
    Object.assign(this, opts);
  }
}

/**
 * DataWrapperComponent
 *
 * Provides the code for wrapping one-to-many charts with one single datasource.
 */
@Component({
  selector: 'lcu-data-wrapper',
  templateUrl: './data-wrapper.component.html',
  styleUrls: ['./data-wrapper.component.scss']
})
export class DataWrapperComponent implements OnInit, OnChanges, AfterContentInit {
  private advPieCharts: PieChartAdvancedComponent[] = [];
  private areaCharts: AreaChartSimpleComponent[] = [];
  private bubbleCharts: BubbleChartSimpleComponent[] = [];
  private gaugeCharts: GaugeSimpleComponent[] = [];
  private hBarGroupedCharts: BarHorizontalGroupedComponent[] = [];
  private hBarSimpleCharts: BarHorizontalSimpleComponent[] = [];
  private lineCharts: LineChartSimpleComponent[] = [];
  private pieCharts: PieChartSimpleComponent[] = [];
  private vBarGroupedCharts: BarVerticalGroupedComponent[] = [];
  private vBarSimpleCharts: BarVerticalSimpleComponent[] = [];

  @ContentChildren(PieChartAdvancedComponent, { descendants: true }) advPieChartsQuery !: QueryList<PieChartAdvancedComponent>;
  @ContentChildren(AreaChartSimpleComponent, { descendants: true }) areaChartsQuery !: QueryList<AreaChartSimpleComponent>;
  @ContentChildren(BubbleChartSimpleComponent, { descendants: true }) bubbleChartsQuery !: QueryList<BubbleChartSimpleComponent>;
  @ContentChildren(GaugeSimpleComponent, { descendants: true }) gaugeChartsQuery !: QueryList<GaugeSimpleComponent>;
  @ContentChildren(BarHorizontalGroupedComponent, { descendants: true }) hBarGroupedChartsQuery !: QueryList<BarHorizontalGroupedComponent>;
  @ContentChildren(BarHorizontalSimpleComponent, { descendants: true }) hBarSimpleChartsQuery !: QueryList<BarHorizontalSimpleComponent>;
  @ContentChildren(LineChartSimpleComponent, { descendants: true }) lineChartsQuery !: QueryList<LineChartSimpleComponent>;
  @ContentChildren(PieChartSimpleComponent, { descendants: true }) pieChartsQuery !: QueryList<PieChartSimpleComponent>;
  @ContentChildren(BarVerticalGroupedComponent, { descendants: true }) vBarGroupedChartsQuery !: QueryList<BarVerticalGroupedComponent>;
  @ContentChildren(BarVerticalSimpleComponent, { descendants: true }) vBarSimpleChartsQuery !: QueryList<BarVerticalSimpleComponent>;

  @Input() public dataWrapper: DataWrapper;

  constructor() { }

  public ngOnInit(): void { }

  public ngOnChanges(): void {
    console.log('DataWrapperComponent ngOnChanges()', this.dataWrapper);
    this.onChartChanges();
  }

  public ngAfterContentInit(): void {
    this.filterCharts();
  }

  private filterCharts(): void {
    if (this.advPieChartsQuery) {
      this.advPieCharts = this.advPieChartsQuery.filter(
        (chart: PieChartAdvancedComponent) => chart.results && !chart.results.length
      );
    }
    if (this.areaChartsQuery) {
      this.areaCharts = this.areaChartsQuery.filter(
        (chart: AreaChartSimpleComponent) => chart.results && !chart.results.length
      );
    }
    if (this.bubbleChartsQuery) {
      this.bubbleCharts = this.bubbleChartsQuery.filter(
        (chart: BubbleChartSimpleComponent) => chart.results && !chart.results.length
      );
    }
    if (this.gaugeChartsQuery) {
      this.gaugeCharts = this.gaugeChartsQuery.filter(
        (chart: GaugeSimpleComponent) => chart.results && !chart.results.length
      );
    }
    if (this.hBarGroupedChartsQuery) {
      this.hBarGroupedCharts = this.hBarGroupedChartsQuery.filter(
        (chart: BarHorizontalGroupedComponent) => chart.results && !chart.results.length
      );
    }
    if (this.hBarSimpleChartsQuery) {
      this.hBarSimpleCharts = this.hBarSimpleChartsQuery.filter(
        (chart: BarHorizontalSimpleComponent) => chart.results && !chart.results.length
      );
    }
    if (this.pieChartsQuery) {
      this.pieCharts = this.pieChartsQuery.filter(
        (chart: PieChartSimpleComponent) => chart.results && !chart.results.length
      );
    }
    if (this.lineChartsQuery) {
      this.lineCharts = this.lineChartsQuery.filter(
        (chart: LineChartSimpleComponent) => chart.results && !chart.results.length
      );
    }
    if (this.vBarGroupedChartsQuery) {
      this.vBarGroupedCharts = this.vBarGroupedChartsQuery.filter(
        (chart: BarVerticalGroupedComponent) => chart.results && !chart.results.length
      );
    }
    if (this.vBarSimpleChartsQuery) {
      this.vBarSimpleCharts = this.vBarSimpleChartsQuery.filter(
        (chart: BarVerticalSimpleComponent) => chart.results && !chart.results.length
      );
    }

    this.onChartChanges();
  }

  private onChartChanges(): void {
    if (this.lineCharts.length) {
      this.setChartData(this.lineCharts, 'multi');
    }
    if (this.areaCharts.length) {
      this.setChartData(this.areaCharts, 'multi');
    }
    if (this.hBarGroupedCharts.length) {
      this.setChartData(this.hBarGroupedCharts, 'multi');
    }
    if (this.vBarGroupedCharts.length) {
      this.setChartData(this.vBarGroupedCharts, 'multi');
    }
    if (this.hBarSimpleCharts.length) {
      this.setChartData(this.hBarSimpleCharts, 'single');
    }
    if (this.vBarSimpleCharts.length) {
      this.setChartData(this.vBarSimpleCharts, 'single');
    }
    if (this.pieCharts.length) {
      this.setChartData(this.pieCharts, 'single');
    }
    if (this.advPieCharts.length) {
      this.setChartData(this.advPieCharts, 'single');
    }
    if (this.gaugeCharts.length) {
      this.setChartData(this.gaugeCharts, 'single');
    }
    if (this.bubbleCharts.length) {
      this.setChartData(this.bubbleCharts, 'bubble');
    }
  }

  private setChartData(charts: any, dataType: string): void {
    charts.map(
      (c: any) => {
        if (dataType === 'single') {
          if (!this.dataWrapper.singleSeries) {
            c.errorText = 'SingleSeries not defined, please initialize a single series data object.';
          } else {
            c.results = this.dataWrapper.singleSeries;
          }
        } else if (dataType === 'multi') {
          if (!this.dataWrapper.multiSeries) {
            c.errorText = 'MultiSeries not defined, please initialize a multi series data object.';
          } else {
            c.results = this.dataWrapper.multiSeries;
          }
        } else if (dataType === 'bubble') {
          if (!this.dataWrapper.bubbleSeries) {
            c.errorText = 'BubbleSeries not defined, please initialize a bubble series data object.';
          } else {
            c.results = this.dataWrapper.bubbleSeries;
          }
        }
        c.update();
      }
    );
  }

}
