import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoAreaChartSimpleComponent } from './charts/demo-area-chart-simple/demo-area-chart-simple.component';
import { DemoLineChartComponent } from './charts/demo-line-chart/demo-line-chart.component';
import { DemoBarChartVerticalSimpleComponent } from './charts/demo-bar-chart-vertical-simple/demo-bar-chart-vertical-simple.component';
import { DemoBarChartVerticalGroupedComponent } from './charts/demo-bar-chart-vertical-grouped/demo-bar-chart-vertical-grouped.component';
import { DemoBarChartHorizontalSimpleComponent } from './charts/demo-bar-chart-horizontal-simple/demo-bar-chart-horizontal-simple.component';
import { DemoBarChartHorizontalGroupedComponent } from './charts/demo-bar-chart-horizontal-grouped/demo-bar-chart-horizontal-grouped.component';

const routes: Routes = [
  { path: 'simple-area-chart', component: DemoAreaChartSimpleComponent },
  { path: 'simple-line-chart', component: DemoLineChartComponent },
  { path: 'simple-vertical-bar-chart', component: DemoBarChartVerticalSimpleComponent },
  { path: 'simple-horizonal-bar-chart', component: DemoBarChartHorizontalSimpleComponent },
  { path: 'grouped-vertical-bar-chart', component: DemoBarChartVerticalGroupedComponent },
  { path: 'grouped-horizonal-bar-chart', component: DemoBarChartHorizontalGroupedComponent },
  { path: '**', component: DemoLineChartComponent }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
