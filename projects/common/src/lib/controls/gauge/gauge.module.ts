import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../../common/chart-common.module';
import { GaugeLinearComponent } from './gauge-linear/gauge-linear.component';
import { GaugeSimpleComponent } from './gauge-simple/gauge-simple.component';
import { GaugeArcComponent } from './gauge-arc.component';
import { GaugeAxisComponent } from './gauge-axis.component';
import { PieChartModule } from '../pie-chart/pie-chart.module';
import { BarChartModule } from '../bar-chart/bar-chart.module';

@NgModule({
  imports: [
    ChartCommonModule,
    PieChartModule,
    BarChartModule
  ],
  declarations: [
    GaugeLinearComponent,
    GaugeSimpleComponent,
    GaugeArcComponent,
    GaugeAxisComponent
  ],
  exports: [
    GaugeLinearComponent,
    GaugeSimpleComponent,
    GaugeArcComponent,
    GaugeAxisComponent
  ]
})
export class GaugeModule {}
