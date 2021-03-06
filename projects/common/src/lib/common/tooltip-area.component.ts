import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy, TemplateRef, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { createMouseEvent } from '../events';

@Component({
  selector: 'g[lcu-charts-tooltip-area]',
  template: `
    <svg:g>
      <svg:rect
        class="tooltip-area"
        [attr.x]="0"
        y="0"
        [attr.width]="dims.width"
        [attr.height]="dims.height"
        [attr.fill]="generatedGradientUrl"
        [attr.opacity]="'0.5'"
        (mousemove)="mouseMove($event)"
        (mouseleave)="hideTooltip()"
      />

      <svg:linearGradient
        [attr.width]="dims.width"
        [attr.height]="dims.height" [id]="generatedGradientId" [attr.x1]="'0%'" [attr.y1]="'0%'" [attr.x2]="'100%'" [attr.y2]="'0%'">
          <svg:stop
            *ngFor="let stop of backgroundGradientConfigs"
            [attr.offset]="stop.offset + '%'"
            [style.stop-color]="stop.color"
            [style.stop-opacity]="'0.5'"
          />
      </svg:linearGradient>

      <ng-template #defaultTooltipTemplate let-model="model">
        <xhtml:div class="area-tooltip-container">
          <xhtml:div *ngFor="let tooltipItem of model" class="tooltip-item">
            <xhtml:span class="tooltip-item-color" [style.background-color]="tooltipItem.color"></xhtml:span>
            {{ getToolTipText(tooltipItem) }}
          </xhtml:div>
        </xhtml:div>
      </ng-template>
      <svg:rect
        #tooltipAnchor
        [@animationState]="anchorOpacity !== 0 ? 'active' : 'inactive'"
        class="tooltip-anchor"
        [attr.x]="anchorPos"
        y="0"
        [attr.width]="1"
        [attr.height]="dims.height"
        [style.opacity]="anchorOpacity"
        [style.pointer-events]="'none'"
        lcu-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="'right'"
        [tooltipType]="'tooltip'"
        [tooltipSpacing]="15"
        [tooltipTemplate]="tooltipTemplate ? tooltipTemplate : defaultTooltipTemplate"
        [tooltipContext]="anchorValues"
        [tooltipImmediateExit]="true"
      />
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition('inactive => active', [
        style({
          opacity: 0
        }),
        animate(250, style({ opacity: 0.7 }))
      ]),
      transition('active => inactive', [
        style({
          opacity: 0.7
        }),
        animate(250, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class TooltipArea implements OnInit {
  anchorOpacity: number = 0;
  anchorPos: number = -1;
  anchorValues: any[] = [];
  lastAnchorPos: number;
  public xVal: any;
  public userForcesXHover: boolean = false;

  @Input() dims: any;
  @Input() xSet: any;
  @Input() xScale: any;
  @Input() yScale: any;
  @Input() results: any;
  @Input() colors: any;
  @Input() showPercentage: boolean = false;
  @Input() units: string;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipTemplate: TemplateRef<any>;
  @Input() backgroundGradientConfigs: any[];
  @Input() tooltipFormatting: any;
  @Input() formatTooltip: boolean;

  @Input('forced-anchor-position')
  public set anchorPosition(val: any) {
    if (val) {
      this.userForcesXHover = true;
      this.anchorPos = val.xValue;
      this.anchorOpacity = 1;
    }
  }

  @Output() hover = new EventEmitter();
  @Output() pixelValueX = new EventEmitter();

  @ViewChild('tooltipAnchor') tooltipAnchor: any;

  tickFormat: (o: any) => string;

  getValues(xVal: any): any[] {
    const results = [];

    for (const group of this.results) {
      const item = group.series.find((d: any) => d.name.toString() === xVal.toString());
      let groupName = group.name;
      if (groupName instanceof Date) {
        groupName = groupName.toLocaleDateString();
      }

      if (item) {
        const label = item.name;
        let val = item.value;
        if(this.formatTooltip && this.tooltipFormatting){
          this.tickFormat = this.tooltipFormatting;
          val = this.tickFormat(val);
          // console.log("val =", val)
        }
        if (this.showPercentage) {
          val = (item.d1 - item.d0).toFixed(2) + '%';
        }
        if(this.units){
          // console.log("item = ", item)
          val = val + this.units;
        }


        let color;
        if (this.colors.scaleType === 'linear') {
          let v = val;
          if (item.d1) {
            v = item.d1;
          }
          color = this.colors.getColor(v);
        } else {
          color = this.colors.getColor(group.name);
        }

        const data = Object.assign({}, item, {
          value: val,
          name: label,
          series: groupName,
          min: item.min,
          max: item.max,
          color
        });

        results.push(data);
      }
    }

    return results;
  }

  public generatedGradientId: string;
  public generatedGradientUrl: string;
  ngOnInit() {
    const id = Math.ceil(Math.random() * 10000);
    this.generatedGradientId = `lin-grad${id}`;
    this.generatedGradientUrl = `url(#${this.generatedGradientId})`;
  }

  mouseMove(event: any) {
    const xPos = event.pageX - event.target.getBoundingClientRect().left;

    const closestIndex = this.findClosestPointIndex(xPos);
    const closestPoint = this.xSet[closestIndex];
    this.anchorPos = this.xScale(closestPoint);
    this.anchorPos = Math.max(0, this.anchorPos);
    this.anchorPos = Math.min(this.dims.width, this.anchorPos);
    this.xVal = this.anchorPos;

    this.anchorValues = this.getValues(closestPoint);
    if (this.anchorPos !== this.lastAnchorPos) {
      const ev = createMouseEvent('mouseleave');
      this.tooltipAnchor.nativeElement.dispatchEvent(ev);
      this.anchorOpacity = 0.7;
      this.hover.emit({
        value: closestPoint
      });
      this.pixelValueX.emit({
        xValue: this.xVal
      });
      this.showTooltip();

      this.lastAnchorPos = this.anchorPos;
    }
  }

  findClosestPointIndex(xPos: any) {
    let minIndex = 0;
    let maxIndex = this.xSet.length - 1;
    let minDiff = Number.MAX_VALUE;
    let closestIndex = 0;

    while (minIndex <= maxIndex) {
      const currentIndex = ((minIndex + maxIndex) / 2) | 0;
      const currentElement = this.xScale(this.xSet[currentIndex]);

      const curDiff = Math.abs(currentElement - xPos);

      if (curDiff < minDiff) {
        minDiff = curDiff;
        closestIndex = currentIndex;
      }

      if (currentElement < xPos) {
        minIndex = currentIndex + 1;
      } else if (currentElement > xPos) {
        maxIndex = currentIndex - 1;
      } else {
        minDiff = 0;
        closestIndex = currentIndex;
        break;
      }
    }

    return closestIndex;
  }

  showTooltip(): void {
    const event = createMouseEvent('mouseenter');
    this.tooltipAnchor.nativeElement.dispatchEvent(event);
  }

  hideTooltip(): void {
    const event = createMouseEvent('mouseleave');
    this.tooltipAnchor.nativeElement.dispatchEvent(event);
    this.anchorOpacity = this.userForcesXHover ? 1 : 0;
    this.lastAnchorPos = -1;
  }

  getToolTipText(tooltipItem: any): string {
    let result: string = '';
    if (tooltipItem.series !== undefined) {
      result += tooltipItem.series;
    } else {
      result += '???';
    }
    result += ': ';
    if (tooltipItem.value !== undefined) {
      result += tooltipItem.value.toLocaleString();
    }
    if (tooltipItem.min !== undefined || tooltipItem.max !== undefined) {
      result += ' (';
      if (tooltipItem.min !== undefined) {
        if (tooltipItem.max === undefined) {
          result += '≥';
        }
        result += tooltipItem.min.toLocaleString();
        if (tooltipItem.max !== undefined) {
          result += ' - ';
        }
      } else if (tooltipItem.max !== undefined) {
        result += '≤';
      }
      if (tooltipItem.max !== undefined) {
        result += tooltipItem.max.toLocaleString();
      }
      result += ')';
    }
    return result;
  }
}
