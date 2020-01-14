import { NgModule } from '@angular/core';
import { ChartCommonModule } from './common/chart-common.module';
import { LineChartModule } from './controls/line-chart/line-chart.module';
import { lcuChartsPolyfills } from './polyfills';

@NgModule({
  exports: [
    ChartCommonModule,
    LineChartModule
  ]
})
export class LcuChartsModule {
  constructor() {
    lcuChartsPolyfills();
  }
}
