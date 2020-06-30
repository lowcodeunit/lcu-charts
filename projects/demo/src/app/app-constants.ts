import { ChartNavModel, ChartNavType } from './models/chart-nav.model';
import {
  colorSets,
  ChartGlobalOptionsModel,
  ChartLineAreaOptionsModel,
  ChartBarOptionsModel,
  ChartPieOptionsModel,
  ChartBubbleOptionsModel,
  ChartGaugeOptionsModel
} from '@lowcodeunit/lcu-charts-common';
import * as shape from 'd3-shape';

export class AppConstants {
  public static readonly FATHYM_THEMES: Array<any> = [
    { ColorSwatch: 'color-swatch-arctic', Icon: 'brightness_1', Label: 'Arctic Theme', Value: 'arctic-theme', Color: 'arctic' },
    { ColorSwatch: 'color-swatch-contrast', Icon: 'brightness_1', Label: 'Contrast Theme', Value: 'contrast-theme', Color: 'contrast' },
    { ColorSwatch: 'color-swatch-cool-candy', Icon: 'brightness_1', Label: 'Cool Candy Theme', Value: 'cool-candy-theme', Color: 'cool-candy' },
    { ColorSwatch: 'color-swatch-flipper', Icon: 'brightness_1', Label: 'Flipper Theme', Value: 'flipper-theme', Color: 'flipper' },
    { ColorSwatch: 'color-swatch-ice', Icon: 'brightness_1', Label: 'Ice Theme', Value: 'ice-theme', Color: 'ice' },
    { ColorSwatch: 'color-swatch-sea-green', Icon: 'brightness_1', Label: 'Sea Green Theme', Value: 'sea-green-theme', Color: 'sea-green' },
    { ColorSwatch: 'color-swatch-white-mint', Icon: 'brightness_1', Label: 'White Mint Theme', Value: 'white-mint-theme', Color: 'white-mint' },
    { ColorSwatch: 'color-swatch-ivy', Icon: 'brightness_1', Label: 'Ivy Theme', Value: 'ivy-theme', Color: 'ivy' }
  ];

  public static readonly CHART_NAV_ITEMS: Array<ChartNavModel> = [
    {
      title: 'Simple Line Chart',
      icon: 'show_chart',
      route: '/charts/simple-line-chart',
      type: ChartNavType.LINE_AREA,
      selector: 'lcu-charts-line-chart-simple'
    },
    {
      title: 'Simple Vertical Bar Chart',
      icon: 'bar_chart',
      route: '/charts/simple-vertical-bar-chart',
      type: ChartNavType.BAR,
      selector: 'lcu-charts-bar-vertical-simple'
    },
    {
      title: 'Simple Horizontal Bar Chart',
      icon: 'notes',
      route: '/charts/simple-horizonal-bar-chart',
      type: ChartNavType.BAR,
      selector: 'lcu-charts-bar-horizontal-simple'
    },
    {
      title: 'Grouped Vertical Bar Chart',
      icon: 'bar_chart',
      route: '/charts/grouped-vertical-bar-chart',
      type: ChartNavType.BAR,
      selector: 'lcu-charts-bar-vertical-grouped'
    },
    {
      title: 'Grouped Horizontal Bar Chart',
      icon: 'notes',
      route: '/charts/grouped-horizonal-bar-chart',
      type: ChartNavType.BAR,
      selector: 'lcu-charts-bar-horizontal-grouped'
    },
    {
      title: 'Simple Area Chart',
      icon: 'insert_photo',
      route: '/charts/simple-area-chart',
      type: ChartNavType.LINE_AREA,
      selector: 'lcu-charts-area-chart-simple'
    },
    {
      title: 'Simple Pie Chart',
      icon: 'pie_chart',
      route: '/charts/simple-pie-chart',
      type: ChartNavType.PIE,
      selector: 'lcu-charts-pie-chart-simple'
    },
    {
      title: 'Advanced Pie Chart',
      icon: 'pie_chart',
      route: '/charts/advanced-pie-chart',
      type: ChartNavType.PIE,
      selector: 'lcu-charts-pie-chart-advanced'
    },
    {
      title: 'Simple Bubble Chart',
      icon: 'bubble_chart',
      route: '/charts/simple-bubble-chart',
      type: ChartNavType.BUBBLE,
      selector: 'lcu-charts-bubble-chart-simple'
    },
    {
      title: 'Simple Gauge',
      icon: 'wifi_tethering',
      route: '/charts/simple-gauge',
      type: ChartNavType.GAUGE,
      selector: 'lcu-charts-gauge-simple'
    },
    {
      title: 'Chart Synchronization',
      icon: 'compare_arrows',
      route: '/examples/chart-synchronization',
      type: ChartNavType.EXAMPLE
    },
    {
      title: 'Real Time Data',
      icon: 'device_hub',
      route: '/examples/real-time-data',
      type: ChartNavType.EXAMPLE
    }
  ];

  public static readonly DEFAULT_GLOBAL_CHART_OPTIONS: ChartGlobalOptionsModel = {
    animations: true,
    autoScale: false,
    colorScheme: 'cool',
    colorSets: [...colorSets],
    fitContainer: false,
    gradient: false,
    height: 400,
    legendPosition: 'right',
    legendTitle: '',
    maxXAxisTickLength: 16,
    maxYAxisTickLength: 16,
    range: false,
    rotateXAxisTicks: true,
    roundDomains: false,
    schemeType: 'ordinal',
    showDataLabel: false,
    showGridLines: true,
    showLegend: true,
    showXAxis: true,
    showXAxisLabel: true,
    showYAxis: true,
    showYAxisLabel: true,
    tooltipDisabled: false,
    trimXAxisTicks: true,
    trimYAxisTicks: true,
    view: null,
    width: 1000,
    xAxisLabel: 'Country',
    xScaleMax: null,
    xScaleMin: null,
    yAxisLabel: 'GDP Per Capita',
    yScaleMax: null,
    yScaleMin: null
  };

  public static readonly DEFAULT_LINE_AREA_CHART_OPTIONS: ChartLineAreaOptionsModel = {
    curve: shape.curveLinear,
    curves: {
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
    },
    curveType: 'Linear',
    legendTitle: 'Country',
    rangeFillOpacity: 0.15,
    timeline: true,
    xAxisLabel: 'Census Date',
    yAxisLabel: 'GDP Per Capita',
  };

  public static readonly DEFAULT_BAR_CHART_OPTIONS: ChartBarOptionsModel = {
    barPadding: 8,
    groupPadding: 16,
    noBarWhenZero: true,
    roundEdges: true
  };

  public static readonly DEFAULT_PIE_CHART_OPTIONS: ChartPieOptionsModel = {
    arcWidth: 0.25,
    doughnut: false,
    explodeSlices: false,
    showLabels: true
  };

  public static readonly DEFAULT_ADVANCED_PIE_CHART_OPTIONS: ChartPieOptionsModel = {
    arcWidth: 0.25,
    doughnut: true,
    explodeSlices: false,
    showLabels: false,
    width: 1100
  };

  public static readonly DEFAULT_BUBBLE_CHART_OPTIONS: ChartBubbleOptionsModel = {
    maxRadius: 20,
    minRadius: 5,
    xAxisLabel: 'Census Date',
    yAxisLabel: 'Life expectancy [years]',
    yScaleMax: 82,
    yScaleMin: 74
  };

  public static readonly DEFAULT_GAUGE_CHART_OPTIONS: ChartGaugeOptionsModel = {
    gaugeAngleSpan: 240,
    gaugeLargeSegments: 10,
    gaugeMax: 50000,
    gaugeMin: 0,
    gaugeShowAxis: true,
    gaugeSmallSegments: 5,
    gaugeStartAngle: -120,
    gaugeTextValue: '',
    gaugeUnits: 'alerts',
    margin: true,
    marginBottom: 40,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 40,
    showText: true
  }

}
