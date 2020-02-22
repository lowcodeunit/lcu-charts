import {
  Component,
  Input,
  Output,
  ViewEncapsulation,
  EventEmitter,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { scaleBand, scaleLinear } from 'd3-scale';
import { calculateViewDimensions, ViewDimensions } from '../../../common/view-dimensions.helper';
import { ColorHelper } from '../../../common/color.helper';
import { BaseChartComponent } from '../../../common/base-chart.component';

@Component({
  selector: 'lcu-charts-bar-vertical-grouped',
  templateUrl: './bar-vertical-grouped.component.html',
  styleUrls: ['../../../common/base-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition(':leave', [
        style({
          opacity: 1,
          transform: '*'
        }),
        animate(500, style({ opacity: 0, transform: 'scale(0)' }))
      ])
    ])
  ]
})
export class BarVerticalGroupedComponent extends BaseChartComponent {
  @Input() legend = false;
  @Input() legendTitle: string = 'Legend';
  @Input() legendPosition: string = 'right';
  @Input() xAxis: any;
  @Input() yAxis: any;
  @Input() showXAxisLabel: any;
  @Input() showYAxisLabel: any;
  @Input() xAxisLabel: any;
  @Input() yAxisLabel: any;
  @Input() tooltipDisabled: boolean = false;
  @Input() scaleType = 'ordinal';
  @Input() gradient: boolean;
  @Input() showGridLines: boolean = true;
  @Input() activeEntries: any[] = [];
  @Input() schemeType: string;
  @Input() trimXAxisTicks: boolean = true;
  @Input() trimYAxisTicks: boolean = true;
  @Input() rotateXAxisTicks: boolean = true;
  @Input() maxXAxisTickLength: number = 16;
  @Input() maxYAxisTickLength: number = 16;
  @Input() xAxisTickFormatting: any;
  @Input() yAxisTickFormatting: any;
  @Input() xAxisTicks: any[];
  @Input() yAxisTicks: any[];
  @Input() groupPadding = 16;
  @Input() barPadding = 8;
  @Input() roundDomains: boolean = false;
  @Input() roundEdges: boolean = true;
  @Input() yScaleMax: number;
  @Input() showDataLabel: boolean = false;
  @Input() dataLabelFormatting: any;
  @Input() noBarWhenZero: boolean = true;

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;

  dims: ViewDimensions;
  groupDomain: any[];
  innerDomain: any[];
  valuesDomain: any[];
  groupScale: any;
  innerScale: any;
  valueScale: any;
  transform: string;
  colors: ColorHelper;
  margin = [10, 20, 10, 20];
  xAxisHeight: number = 0;
  yAxisWidth: number = 0;
  legendOptions: any;
  dataLabelMaxHeight: any = { negative: 0, positive: 0 };

  update(): void {
    super.update();

    if (!this.showDataLabel) {
      this.dataLabelMaxHeight = { negative: 0, positive: 0 };
    }
    this.margin = [10 + this.dataLabelMaxHeight.positive, 20, 10 + this.dataLabelMaxHeight.negative, 20];

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin,
      showXAxis: this.xAxis,
      showYAxis: this.yAxis,
      xAxisHeight: this.xAxisHeight,
      yAxisWidth: this.yAxisWidth,
      showXLabel: this.showXAxisLabel,
      showYLabel: this.showYAxisLabel,
      showLegend: this.legend,
      legendType: this.schemeType,
      legendPosition: this.legendPosition
    });

    if (this.showDataLabel) {
      this.dims.height -= this.dataLabelMaxHeight.negative;
    }

    this.formatDates();

    this.groupDomain = this.getGroupDomain();
    this.innerDomain = this.getInnerDomain();
    this.valuesDomain = this.getValueDomain();

    this.groupScale = this.getGroupScale();
    this.innerScale = this.getInnerScale();
    this.valueScale = this.getValueScale();

    this.setColors();
    this.legendOptions = this.getLegendOptions();
    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0] + this.dataLabelMaxHeight.negative})`;
  }

  onDataLabelMaxHeightChanged(event: { size: { negative: any; height: number; }; }, groupIndex: number) {
    if (event.size.negative) {
      this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event.size.height);
    } else {
      this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event.size.height);
    }
    if (groupIndex === this.results.length - 1) {
      setTimeout(() => this.update());
    }
  }

  getGroupScale(): any {
    const spacing = this.groupDomain.length / (this.dims.height / this.groupPadding + 1);

    return scaleBand()
      .rangeRound([0, this.dims.width])
      .paddingInner(spacing)
      .paddingOuter(spacing / 2)
      .domain(this.groupDomain);
  }

  getInnerScale(): any {
    const width = this.groupScale.bandwidth();
    const spacing = this.innerDomain.length / (width / this.barPadding + 1);
    return scaleBand()
      .rangeRound([0, width])
      .paddingInner(spacing)
      .domain(this.innerDomain);
  }

  getValueScale(): any {
    const scale = scaleLinear()
      .range([this.dims.height, 0])
      .domain(this.valuesDomain);
    return this.roundDomains ? scale.nice() : scale;
  }

  getGroupDomain() {
    const domain: any[] = [];
    for (const group of this.results) {
      if (!domain.includes(group.label)) {
        domain.push(group.label);
      }
    }

    return domain;
  }

  getInnerDomain() {
    const domain: any[] = [];
    for (const group of this.results) {
      for (const d of group.series) {
        if (!domain.includes(d.label)) {
          domain.push(d.label);
        }
      }
    }

    return domain;
  }

  getValueDomain() {
    const domain: any[] = [];
    for (const group of this.results) {
      for (const d of group.series) {
        if (!domain.includes(d.value)) {
          domain.push(d.value);
        }
      }
    }

    const min = Math.min(0, ...domain);
    const max = this.yScaleMax ? Math.max(this.yScaleMax, ...domain) : Math.max(0, ...domain);

    return [min, max];
  }

  groupTransform(group: { label: any; }) {
    return `translate(${this.groupScale(group.label)}, 0)`;
  }

  onClick(data: { series: any; }, group?: { name: any; }) {
    if (group) {
      data.series = group.name;
    }

    this.select.emit(data);
  }

  trackBy(index: any, item: { name: any; }) {
    return item.name;
  }

  setColors(): void {
    let domain;
    if (this.schemeType === 'ordinal') {
      domain = this.innerDomain;
    } else {
      domain = this.valuesDomain;
    }

    this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
  }

  getLegendOptions() {
    const opts: any = {
      scaleType: this.schemeType,
      colors: undefined,
      domain: [],
      title: undefined,
      position: this.legendPosition
    };
    if (opts.scaleType === 'ordinal') {
      opts.domain = this.innerDomain;
      opts.colors = this.colors;
      opts.title = this.legendTitle;
    } else {
      opts.domain = this.valuesDomain;
      opts.colors = this.colors.scale;
    }

    return opts;
  }

  updateYAxisWidth({ width }: any) {
    this.yAxisWidth = width;
    this.update();
  }

  updateXAxisHeight({ height }: any) {
    this.xAxisHeight = height;
    this.update();
  }

  onActivate(event: any, group: { name: any; }, fromLegend = false) {
    const item = Object.assign({}, event);
    if (group) {
      item.series = group.name;
    }

    const items = this.results
      .map((g: { series: any; }) => g.series)
      .flat()
      .filter((i: { label: any; name: any; series: any; }) => {
        if (fromLegend) {
          return i.label === item.name;
        } else {
          return i.name === item.name && i.series === item.series;
        }
      });

    this.activeEntries = [...items];
    this.activate.emit({ value: item, entries: this.activeEntries });
  }

  onDeactivate(event: any, group: { name: any; }, fromLegend = false) {
    const item = Object.assign({}, event);
    if (group) {
      item.series = group.name;
    }

    this.activeEntries = this.activeEntries.filter(i => {
      if (fromLegend) {
        return i.label !== item.name;
      } else {
        return !(i.name === item.name && i.series === item.series);
      }
    });

    this.deactivate.emit({ value: item, entries: this.activeEntries });
  }
}
