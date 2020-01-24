import { ChartGlobalOptionsModel } from './chart-global-options.model';

export class ChartLineAreaOptionsModel extends ChartGlobalOptionsModel {
  public curveType: string;
  public curves: any;
  public curve: any;
  public rangeFillOpacity: number;
  public timeline: boolean;
  public xAxisLabel: string;
  public yAxisLabel: string;

  constructor(opts: ChartLineAreaOptionsModel) {
    super(opts);
    Object.assign(this, opts);
  }
}
