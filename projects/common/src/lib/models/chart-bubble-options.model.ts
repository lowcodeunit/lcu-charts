import { ChartGlobalOptionsModel } from './chart-global-options.model';

export class ChartBubbleOptionsModel extends ChartGlobalOptionsModel {
  public maxRadius: number;
  public minRadius: number;

  constructor(opts: ChartBubbleOptionsModel) {
    super(opts);
    Object.assign(this, opts);
  }
}
