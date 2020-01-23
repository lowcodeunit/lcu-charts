// TODO: Move to common
export class ChartLineOptionsModel {
  public curveType: string;
  public curves: any;
  public curve: any;
  public rangeFillOpacity: number;
  public timeline: boolean;
  public xAxisLabel: string;
  public yAxisLabel: string;

  constructor(opts: ChartLineOptionsModel) {
    Object.assign(this, opts);
  }
}
