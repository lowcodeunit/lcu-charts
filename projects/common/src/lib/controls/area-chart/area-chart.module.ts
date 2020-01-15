import { NgModule } from '@angular/core';
import { AreaChartSimpleComponent } from './area-simple/area-chart-simple.component';
import { AreaChartNormalizedComponent } from './area-normalized/area-chart-normalized.component';
import { AreaChartStackedComponent } from './area-stacked/area-chart-stacked.component';
import { AreaSeriesComponent } from './area-series.component';
import { ChartCommonModule } from '../../common/chart-common.module';

@NgModule({
  imports: [
    ChartCommonModule
  ],
  declarations: [
    AreaChartSimpleComponent,
    AreaChartNormalizedComponent,
    AreaChartStackedComponent,
    AreaSeriesComponent
  ],
  exports: [
    AreaChartSimpleComponent,
    AreaChartNormalizedComponent,
    AreaChartStackedComponent,
    AreaSeriesComponent
  ]
})
export class AreaChartModule {}
