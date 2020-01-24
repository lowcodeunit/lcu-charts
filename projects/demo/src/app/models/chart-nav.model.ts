export class ChartNavModel {
  public icon: string;
  public route: string;
  public selector?: string;
  public title: string;
  public type: ChartNavType;

  constructor(opts: ChartNavModel) {
    Object.assign(this, opts);
  }
}

export enum ChartNavType {
  LINE_AREA = 'Line_Area',
  BAR = 'Bar',
  PIE = 'Pie',
  EXAMPLE = 'Example',
  BUBBLE = 'Bubble',
  GAUGE = 'Gauge',
  OTHER = 'Other'
}
