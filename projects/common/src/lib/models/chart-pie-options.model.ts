import { ChartGlobalOptionsModel } from './chart-global-options.model';

export class ChartPieOptionsModel extends ChartGlobalOptionsModel {
  public arcWidth?: number;
  public doughnut?: boolean;
  public explodeSlices?: boolean;
  public showLabels?: boolean;

  constructor(opts: ChartPieOptionsModel) {
    super(opts);
    Object.assign(this, opts);
  }
}
