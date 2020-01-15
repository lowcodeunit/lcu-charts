import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../../common/chart-common.module';
import { BarComponent } from './bar.component';
import { BarHorizontalSimpleComponent } from './bar-horizontal-simple/bar-horizontal-simple.component';
import { BarHorizontalGroupedComponent } from './bar-horizontal-grouped/bar-horizontal-grouped.component';
import { BarHorizontalNormalizedComponent } from './bar-horizontal-normalized/bar-horizontal-normalized.component';
import { BarHorizontalStackedComponent } from './bar-horizontal-stacked/bar-horizontal-stacked.component';
import { BarVerticalSimpleComponent } from './bar-vertical-simple/bar-vertical-simple.component';
import { BarVerticalGroupedComponent } from './bar-vertical-grouped/bar-vertical-grouped.component';
import { BarVerticalNormalizedComponent } from './bar-vertical-normalized/bar-vertical-normalized.component';
import { BarVerticalStackedComponent } from './bar-vertical-stacked/bar-vertical-stacked.component';
import { SeriesHorizontal } from './series-horizontal.component';
import { SeriesVerticalComponent } from './series-vertical.component';
import { BarLabelComponent } from './bar-label.component';

@NgModule({
  imports: [
    ChartCommonModule
  ],
  declarations: [
    BarComponent,
    BarHorizontalSimpleComponent,
    BarHorizontalGroupedComponent,
    BarHorizontalNormalizedComponent,
    BarHorizontalStackedComponent,
    BarVerticalSimpleComponent,
    BarVerticalGroupedComponent,
    BarVerticalNormalizedComponent,
    BarVerticalStackedComponent,
    BarLabelComponent,
    SeriesHorizontal,
    SeriesVerticalComponent
  ],
  exports: [
    BarComponent,
    BarHorizontalSimpleComponent,
    BarHorizontalGroupedComponent,
    BarHorizontalNormalizedComponent,
    BarHorizontalStackedComponent,
    BarVerticalSimpleComponent,
    BarVerticalGroupedComponent,
    BarVerticalNormalizedComponent,
    BarVerticalStackedComponent,
    BarLabelComponent,
    SeriesHorizontal,
    SeriesVerticalComponent
  ]
})
export class BarChartModule {}
