import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../../common/chart-common.module';
import { LineComponent } from './line.component';
import { LineChartSimpleComponent } from './line-simple/line-chart-simple.component';
import { LineSeriesComponent } from './line-series.component';

@NgModule({
  imports: [
    ChartCommonModule
  ],
  declarations: [
    LineComponent,
    LineChartSimpleComponent,
    LineSeriesComponent
  ],
  exports: [
    LineComponent,
    LineChartSimpleComponent,
    LineSeriesComponent
  ]
})
export class LineChartModule {}
