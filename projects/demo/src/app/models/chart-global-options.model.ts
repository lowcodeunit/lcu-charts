// TODO: Move to common
export class ChartGlobalOptionsModel {
  public animations: boolean;
  public autoScale: boolean;
  public colorScheme: any;
  public fitContainer: boolean;
  public gradient: boolean;
  public height: number;
  public legendPosition: string;
  public legendTitle: string;
  public maxXAxisTickLength: number;
  public maxYAxisTickLength: number;
  public range: boolean;
  public rotateXAxisTicks: boolean;
  public roundDomains: boolean;
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
  public width: number;
  public xAxisLabel: string;
  public xScaleMax: any;
  public xScaleMin: any;
  public yAxisLabel: string;
  public yScaleMax: number;
  public yScaleMin: number;

  constructor(opts: ChartGlobalOptionsModel) {
    Object.assign(this, opts);
  }
}
