import { ChartGlobalOptionsModel } from './chart-global-options.model';

export class ChartGaugeOptionsModel extends ChartGlobalOptionsModel {
  public gaugeAngleSpan: number;
  public gaugeLargeSegments: number;
  public gaugeMax: number;
  public gaugeMin: number;
  public gaugeShowAxis: boolean;
  public gaugeSmallSegments: number;
  public gaugeStartAngle: number;
  public gaugeTextValue: string;
  public gaugeUnits: string;
  public margin: boolean;
  public marginBottom: number;
  public marginLeft: number;
  public marginRight: number;
  public marginTop: number;
  public showText: boolean;

  constructor(opts: ChartGaugeOptionsModel) {
    super(opts);
    Object.assign(this, opts);
  }
}
