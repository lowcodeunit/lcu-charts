import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './controls/home/home.component';
import { DemoAreaChartSimpleComponent } from './charts/demo-area-chart-simple/demo-area-chart-simple.component';
import { DemoLineChartSimpleComponent } from './charts/demo-line-chart-simple/demo-line-chart-simple.component';
import { DemoBarChartVerticalSimpleComponent } from './charts/demo-bar-chart-vertical-simple/demo-bar-chart-vertical-simple.component';
import { DemoBarChartVerticalGroupedComponent } from './charts/demo-bar-chart-vertical-grouped/demo-bar-chart-vertical-grouped.component';
import { DemoBarChartHorizontalSimpleComponent } from './charts/demo-bar-chart-horizontal-simple/demo-bar-chart-horizontal-simple.component';
import { DemoBarChartHorizontalGroupedComponent } from './charts/demo-bar-chart-horizontal-grouped/demo-bar-chart-horizontal-grouped.component';
import { DemoPieChartSimpleComponent } from './charts/demo-pie-chart-simple/demo-pie-chart-simple.component';
import { DemoPieChartAdvancedComponent } from './charts/demo-pie-chart-advanced/demo-pie-chart-advanced.component';
import { DemoBubbleChartSimpleComponent } from './charts/demo-bubble-chart-simple/demo-bubble-chart-simple.component';
import { DemoGaugeSimpleComponent } from './charts/demo-gauge-simple/demo-gauge-simple.component';
import { ExampleChartSynchronizationComponent } from './examples/example-chart-synchronization/example-chart-synchronization.component';
import { ExampleRealTimeDataComponent } from './examples/example-real-time-data/example-real-time-data.component';
import { DocumentationComponent } from './controls/documentation/documentation.component';

const routes: Routes = [
  { path: 'charts/simple-area-chart', component: DemoAreaChartSimpleComponent },
  { path: 'charts/simple-line-chart', component: DemoLineChartSimpleComponent },
  { path: 'charts/simple-vertical-bar-chart', component: DemoBarChartVerticalSimpleComponent },
  { path: 'charts/simple-horizonal-bar-chart', component: DemoBarChartHorizontalSimpleComponent },
  { path: 'charts/grouped-vertical-bar-chart', component: DemoBarChartVerticalGroupedComponent },
  { path: 'charts/grouped-horizonal-bar-chart', component: DemoBarChartHorizontalGroupedComponent },
  { path: 'charts/simple-pie-chart', component: DemoPieChartSimpleComponent },
  { path: 'charts/advanced-pie-chart', component: DemoPieChartAdvancedComponent },
  { path: 'charts/simple-bubble-chart', component: DemoBubbleChartSimpleComponent },
  { path: 'charts/simple-gauge', component: DemoGaugeSimpleComponent },
  { path: 'examples/chart-synchronization', component: ExampleChartSynchronizationComponent },
  { path: 'examples/real-time-data', component: ExampleRealTimeDataComponent },
  { path: 'home', component: HomeComponent},
  { path: 'documentation', component: DocumentationComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
