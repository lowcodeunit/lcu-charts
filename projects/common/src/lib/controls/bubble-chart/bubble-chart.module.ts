import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../../common/chart-common.module';
import { BubbleChartSimpleComponent } from './bubble-simple/bubble-chart-simple.component';
import { BubbleSeriesComponent } from './bubble-series.component';

@NgModule({
  imports: [
    ChartCommonModule
  ],
  declarations: [
    BubbleChartSimpleComponent,
    BubbleSeriesComponent
  ],
  exports: [
    BubbleChartSimpleComponent,
    BubbleSeriesComponent
  ]
})
export class BubbleChartModule {}
