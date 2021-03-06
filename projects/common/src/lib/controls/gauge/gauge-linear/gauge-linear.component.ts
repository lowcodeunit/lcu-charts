import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { scaleLinear } from 'd3-scale';
import { BaseChartComponent } from '../../../common/base-chart.component';
import { calculateViewDimensions, ViewDimensions } from '../../../common/view-dimensions.helper';
import { ColorHelper } from '../../../common/color.helper';

@Component({
  selector: 'lcu-charts-linear-gauge',
  templateUrl: './gauge-linear.component.html',
  styleUrls: ['../../../common/base-chart.component.scss', './gauge-linear.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GaugeLinearComponent extends BaseChartComponent implements AfterViewInit {
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() value: number = 0;
  @Input() units: string;
  @Input() previousValue: any;
  @Input() valueFormatting: any;

  @ViewChild('valueTextEl') valueTextEl: ElementRef;
  @ViewChild('unitsTextEl') unitsTextEl: ElementRef;

  dims: ViewDimensions;
  valueDomain: any;
  valueScale: any;

  colors: ColorHelper;
  transform: string;
  margin: any[] = [10, 20, 10, 20];
  transformLine: string;

  valueResizeScale: number = 1;
  unitsResizeScale: number = 1;
  valueTextTransform: string = '';
  valueTranslate: string = '';
  unitsTextTransform: string = '';
  unitsTranslate: string = '';
  displayValue: string;
  hasPreviousValue: boolean;

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    setTimeout(() => {
      this.scaleText('value');
      this.scaleText('units');
    });
  }

  update(): void {
    super.update();

    this.hasPreviousValue = this.previousValue !== undefined;
    this.max = Math.max(this.max, this.value);
    this.min = Math.min(this.min, this.value);
    if (this.hasPreviousValue) {
      this.max = Math.max(this.max, this.previousValue);
      this.min = Math.min(this.min, this.previousValue);
    }

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin
    });

    this.valueDomain = this.getValueDomain();
    this.valueScale = this.getValueScale();
    this.displayValue = this.getDisplayValue();

    this.setColors();

    const xOffset = this.margin[3] + this.dims.width / 2;
    const yOffset = this.margin[0] + this.dims.height / 2;

    this.transform = `translate(${xOffset}, ${yOffset})`;
    this.transformLine = `translate(${this.margin[3] + this.valueScale(this.previousValue)}, ${yOffset})`;
    this.valueTranslate = `translate(0, -15)`;
    this.unitsTranslate = `translate(0, 15)`;
    setTimeout(() => this.scaleText('value'), 50);
    setTimeout(() => this.scaleText('units'), 50);
  }

  getValueDomain(): any[] {
    return [this.min, this.max];
  }

  getValueScale(): any {
    return scaleLinear()
      .range([0, this.dims.width])
      .domain(this.valueDomain);
  }

  getDisplayValue(): string {
    if (this.valueFormatting) {
      return this.valueFormatting(this.value);
    }
    return this.value.toLocaleString();
  }

  scaleText(element: any, repeat: boolean = true): void {
    let el;
    let resizeScale;
    if (element === 'value') {
      el = this.valueTextEl;
      resizeScale = this.valueResizeScale;
    } else {
      el = this.unitsTextEl;
      resizeScale = this.unitsResizeScale;
    }

    const { width, height } = el.nativeElement.getBoundingClientRect();
    if (width === 0 || height === 0) return;
    const oldScale = resizeScale;
    const availableWidth = this.dims.width;
    const availableHeight = Math.max(this.dims.height / 2 - 15, 0);
    const resizeScaleWidth = Math.floor((availableWidth / (width / resizeScale)) * 100) / 100;
    const resizeScaleHeight = Math.floor((availableHeight / (height / resizeScale)) * 100) / 100;
    resizeScale = Math.min(resizeScaleHeight, resizeScaleWidth);

    if (resizeScale !== oldScale) {
      if (element === 'value') {
        this.valueResizeScale = resizeScale;
        this.valueTextTransform = `scale(${resizeScale}, ${resizeScale})`;
      } else {
        this.unitsResizeScale = resizeScale;
        this.unitsTextTransform = `scale(${resizeScale}, ${resizeScale})`;
      }
      this.cd.markForCheck();
      if (repeat) {
        setTimeout(() => {
          this.scaleText(element, false);
        }, 50);
      }
    }
  }

  onClick(): void {
    this.select.emit({
      name: 'Value',
      value: this.value
    });
  }

  setColors(): void {
    this.colors = new ColorHelper(this.scheme, 'ordinal', [this.value], this.customColors);
  }
}
