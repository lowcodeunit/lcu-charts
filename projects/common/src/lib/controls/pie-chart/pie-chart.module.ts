import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../../common/chart-common.module';
import { PieChartAdvancedComponent } from './pie-advanced/pie-chart-advanced.component';
import { PieLabelComponent } from './pie-label.component';
import { PieArcComponent } from './pie-arc.component';
import { PieChartSimpleComponent } from './pie-simple/pie-chart-simple.component';
import { PieGridComponent } from './pie-grid/pie-grid.component';
import { PieGridSeriesComponent } from './pie-grid/pie-grid-series.component';
import { PieSeriesComponent } from './pie-series.component';

@NgModule({
  imports: [ChartCommonModule],
  declarations: [
    PieChartAdvancedComponent,
    PieLabelComponent,
    PieArcComponent,
    PieChartSimpleComponent,
    PieGridComponent,
    PieGridSeriesComponent,
    PieSeriesComponent
  ],
  exports: [
    PieChartAdvancedComponent,
    PieLabelComponent,
    PieArcComponent,
    PieChartSimpleComponent,
    PieGridComponent,
    PieGridSeriesComponent,
    PieSeriesComponent
  ]
})
export class PieChartModule {}
