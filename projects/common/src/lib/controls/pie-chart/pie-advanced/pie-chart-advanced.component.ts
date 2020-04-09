import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { calculateViewDimensions, ViewDimensions } from '../../../common/view-dimensions.helper';
import { ColorHelper } from '../../../common/color.helper';
import { BaseChartComponent } from '../../../common/base-chart.component';
import { DataItem } from '../../../models/chart-data.model';

@Component({
  selector: 'lcu-charts-pie-chart-advanced',
  templateUrl: './pie-chart-advanced.component.html',
  styleUrls: ['../../../common/base-chart.component.scss', './pie-chart-advanced.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartAdvancedComponent extends BaseChartComponent {
  @Input() arcWidth = 0.25;
  @Input() doughnut = false;
  @Input() gradient: boolean;
  @Input() activeEntries: any[] = [];
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipText: any;
  @Input() label: string = 'Total';

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;

  data: any;
  dims: ViewDimensions;
  domain: any[];
  outerRadius: number;
  innerRadius: number;
  transform: string;
  colors: ColorHelper;
  legendWidth: number;
  margin = [20, 20, 20, 20];

  @Input() valueFormatting: (value: number) => any;
  @Input() nameFormatting: (value: string) => any;
  @Input() percentageFormatting: (value: number) => any;

  update(): void {
    super.update();

    this.dims = calculateViewDimensions({
      width: (this.width * 4) / 12.0,
      height: this.height,
      margins: this.margin
    });

    this.formatDates();

    this.domain = this.getDomain();
    this.setColors();

    const xOffset = this.dims.width / 2;
    const yOffset = this.margin[0] + this.dims.height / 2;
    this.legendWidth = this.width - this.dims.width - this.margin[1];

    this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2.5;

    this.innerRadius = 0;
    if (this.doughnut) {
      this.innerRadius = this.outerRadius * (1 - this.arcWidth);
    }

    this.transform = `translate(${xOffset} , ${yOffset})`;
  }

  getDomain(): any[] {
    return this.results.map((d: any) => d.label);
  }

  onClick(data: DataItem) {
    this.select.emit(data);
  }

  setColors(): void {
    this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
  }

  onActivate(item: any, fromLegend = false) {
    item = this.results.find((d: any) => {
      if (fromLegend) {
        return d.label === item.name;
      } else {
        return d.name === item.name;
      }
    });

    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value && d.series === item.series;
    });
    if (idx > -1) {
      return;
    }

    this.activeEntries = [item, ...this.activeEntries];
    this.activate.emit({ value: item, entries: this.activeEntries });
  }

  onDeactivate(item: any, fromLegend = false) {
    item = this.results.find((d: any) => {
      if (fromLegend) {
        return d.label === item.name;
      } else {
        return d.name === item.name;
      }
    });

    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value && d.series === item.series;
    });

    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];

    this.deactivate.emit({ value: item, entries: this.activeEntries });
  }
}
