import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoAreaChartComponent } from './charts/demo-area-chart/demo-area-chart.component';
import { DemoLineChartComponent } from './charts/demo-line-chart/demo-line-chart.component';
import { DemoVerticalBarChartComponent } from './charts/demo-vertical-bar-chart/demo-vertical-bar-chart.component';

const routes: Routes = [
  { path: 'area-chart', component: DemoAreaChartComponent },
  { path: 'line-chart', component: DemoLineChartComponent },
  { path: 'vertical-bar-chart', component: DemoVerticalBarChartComponent },
  { path: '**', component: DemoLineChartComponent }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
