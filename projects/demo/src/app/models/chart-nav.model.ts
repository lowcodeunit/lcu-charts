export class ChartNavModel {
  public title: string;
  public icon: string;
  public route: string;
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
  OTHER = 'Other'
}
