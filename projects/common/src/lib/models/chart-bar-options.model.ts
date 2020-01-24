import { ChartGlobalOptionsModel } from './chart-global-options.model';

export class ChartBarOptionsModel extends ChartGlobalOptionsModel {
  public barPadding: number;
  public groupPadding?: number;
  public noBarWhenZero: boolean;
  public roundEdges: boolean;

  constructor(opts: ChartBarOptionsModel) {
    super(opts);
    Object.assign(this, opts);
  }
}
