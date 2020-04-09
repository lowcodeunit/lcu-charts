import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { YAxisTicksComponent } from './y-axis-ticks.component';

@Component({
  selector: 'g[lcu-charts-y-axis]',
  template: `
    <svg:g [attr.class]="yAxisClassName" [attr.transform]="transform">
      <svg:g
        lcu-charts-y-axis-ticks
        *ngIf="yScale"
        [trimTicks]="trimTicks"
        [maxTickLength]="maxTickLength"
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickValues]="ticks"
        [tickStroke]="tickStroke"
        [scale]="yScale"
        [orient]="yOrient"
        [showGridLines]="showGridLines"
        [gridLineWidth]="dims.width"
        [referenceLines]="referenceLines"
        [showRefLines]="showRefLines"
        [showRefLabels]="showRefLabels"
        [height]="dims.height"
        (dimensionsChanged)="emitTicksWidth($event)"
      />

      <svg:g
        lcu-charts-axis-label
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="labelOffset"
        [orient]="yOrient"
        [height]="dims.height"
        [width]="dims.width"
      ></svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YAxisComponent implements OnChanges {
  @Input() yScale: any;
  @Input() dims: any;
  @Input() trimTicks: boolean;
  @Input() maxTickLength: number;
  @Input() tickFormatting: any;
  @Input() ticks: any[];
  @Input() showGridLines = false;
  @Input() showLabel: any;
  @Input() labelText: any;
  @Input() yAxisTickInterval: any;
  @Input() yAxisTickCount: any;
  @Input() yOrient: string = 'left';
  @Input() referenceLines: any;
  @Input() showRefLines: any;
  @Input() showRefLabels: any;
  @Input() yAxisOffset: number = 0;
  @Output() dimensionsChanged = new EventEmitter();

  yAxisClassName: string = 'y axis';
  tickArguments: any;
  offset: any;
  transform: any;
  labelOffset: number = 15;
  fill: string = 'none';
  stroke: string = '#CCC';
  tickStroke: string = '#CCC';
  strokeWidth: number = 1;
  padding: number = 5;

  @ViewChild(YAxisTicksComponent) ticksComponent: YAxisTicksComponent;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.offset = -(this.yAxisOffset + this.padding);
    if (this.yOrient === 'right') {
      this.labelOffset = 65;
      this.transform = `translate(${this.offset + this.dims.width} , 0)`;
    } else {
      this.offset = this.offset;
      this.transform = `translate(${this.offset} , 0)`;
    }

    if (this.yAxisTickCount !== undefined) {
      this.tickArguments = [this.yAxisTickCount];
    }
  }

  emitTicksWidth({ width }: any): void {
    if (width !== this.labelOffset && this.yOrient === 'right') {
      this.labelOffset = width + this.labelOffset;
      setTimeout(() => {
        this.dimensionsChanged.emit({ width });
      }, 0);
    } else if (width !== this.labelOffset) {
      this.labelOffset = width;
      setTimeout(() => {
        this.dimensionsChanged.emit({ width });
      }, 0);
    }
  }
}
