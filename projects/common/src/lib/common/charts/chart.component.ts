import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  SimpleChanges
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { TooltipService } from '../tooltip/tooltip.service';

@Component({
  providers: [TooltipService],
  selector: 'lcu-charts-chart',
  template: `
    <div class="lcu-charts-outer" [style.width.px]="view[0]" [@animationState]="'active'" [@.disabled]="!animations">
      <svg class="lcu-charts" [attr.width]="chartWidth" [attr.height]="view[1]">
        <ng-content></ng-content>
      </svg>
      <lcu-charts-scale-legend
        *ngIf="showLegend && legendType === 'scaleLegend'"
        class="chart-legend"
        [horizontal]="legendOptions && legendOptions.position === 'below'"
        [valueRange]="legendOptions.domain"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth"
      >
      </lcu-charts-scale-legend>
      <lcu-charts-legend
        *ngIf="showLegend && legendType === 'legend'"
        class="chart-legend"
        [horizontal]="legendOptions && legendOptions.position === 'below'"
        [data]="legendOptions.domain"
        [title]="legendOptions.title"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth"
        [activeEntries]="activeEntries"
        (labelClick)="legendLabelClick.emit($event)"
        (labelActivate)="legendLabelActivate.emit($event)"
        (labelDeactivate)="legendLabelDeactivate.emit($event)"
      >
      </lcu-charts-legend>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition(':enter', [style({ opacity: 0 }), animate('500ms 100ms', style({ opacity: 1 }))])
    ])
  ]
})
export class ChartComponent implements OnChanges {
  @Input() view: any;
  @Input() showLegend = false;
  @Input() legendOptions: any;

  // remove
  @Input() data: any;
  @Input() legendData: any;
  @Input() legendType: any;
  @Input() legendWidth: any;
  @Input() colors: any;
  @Input() activeEntries: any[];
  @Input() animations: boolean = true;

  @Output() legendLabelClick: EventEmitter<any> = new EventEmitter();
  @Output() legendLabelActivate: EventEmitter<any> = new EventEmitter();
  @Output() legendLabelDeactivate: EventEmitter<any> = new EventEmitter();

  chartWidth: any;
  title: any;
 

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    let legendColumns = 0;
    if (this.showLegend) {
      this.legendType = this.getLegendType();

      if (!this.legendOptions || this.legendOptions.position === 'right') {
        if (this.legendType === 'scaleLegend') {
          legendColumns = 1;
        } else {
          legendColumns = 2;
        }
      }
    }

    const chartColumns = 12 - legendColumns;

    this.chartWidth = Math.floor((this.view[0] * chartColumns) / 12.0);
    console.log("Legend Width", this.legendWidth)
    if(!this.legendWidth){
    this.legendWidth =
      !this.legendOptions || this.legendOptions.position === 'right'
        ? Math.floor((this.view[0] * legendColumns) / 12.0)
        : this.chartWidth;
    }
  }

  getLegendType(): string {
    if (this.legendOptions.scaleType === 'linear') {
      return 'scaleLegend';
    } else {
      return 'legend';
    }
  }
}
