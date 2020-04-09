import { NgModule } from '@angular/core';
import { ChartCommonModule } from './common/chart-common.module';
import { LineChartModule } from './controls/line-chart/line-chart.module';
import { lcuChartsPolyfills } from './polyfills';
import { AreaChartModule } from './controls/area-chart/area-chart.module';
import { BarChartModule } from './controls/bar-chart/bar-chart.module';
import { PieChartModule } from './controls/pie-chart/pie-chart.module';
import { BubbleChartModule } from './controls/bubble-chart/bubble-chart.module';
import { GaugeModule } from './controls/gauge/gauge.module';
import { LcuChartsChartsDemoElementComponent } from './elements/charts-demo/charts-demo.component';

@NgModule({
  exports: [
    ChartCommonModule,
    AreaChartModule,
    BarChartModule,
    LineChartModule,
    PieChartModule,
    BubbleChartModule,
    GaugeModule,
    LcuChartsChartsDemoElementComponent
  ],
  declarations: [LcuChartsChartsDemoElementComponent],
  entryComponents: [LcuChartsChartsDemoElementComponent]
})
export class LcuChartsModule {
  constructor() {
    lcuChartsPolyfills();
  }
}
