import { NgModule } from '@angular/core';
import { ChartCommonModule } from './common/chart-common.module';
import { LineChartModule } from './controls/line-chart/line-chart.module';
import { lcuChartsPolyfills } from './polyfills';
import { AreaChartModule } from './controls/area-chart/area-chart.module';
import { BarChartModule } from './controls/bar-chart/bar-chart.module';

@NgModule({
  exports: [
    ChartCommonModule,
    AreaChartModule,
    BarChartModule,
    LineChartModule
  ]
})
export class LcuChartsModule {
  constructor() {
    lcuChartsPolyfills();
  }
}
