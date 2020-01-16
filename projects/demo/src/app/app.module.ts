import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FathymSharedModule, MaterialModule } from '@lcu/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LcuChartsModule } from '@lowcodeunit/lcu-charts-common';
import { DemoAreaChartSimpleComponent } from './charts/demo-area-chart-simple/demo-area-chart-simple.component';
import { DemoLineChartComponent } from './charts/demo-line-chart/demo-line-chart.component';
import { DemoBarChartVerticalSimpleComponent } from './charts/demo-bar-chart-vertical-simple/demo-bar-chart-vertical-simple.component';
import { DemoBarChartVerticalGroupedComponent } from './charts/demo-bar-chart-vertical-grouped/demo-bar-chart-vertical-grouped.component';
import { DemoBarChartHorizontalSimpleComponent } from './charts/demo-bar-chart-horizontal-simple/demo-bar-chart-horizontal-simple.component';
import { DemoBarChartHorizontalGroupedComponent } from './charts/demo-bar-chart-horizontal-grouped/demo-bar-chart-horizontal-grouped.component';
import { ExampleChartSynchronizationComponent } from './examples/example-chart-synchronization/example-chart-synchronization.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoAreaChartSimpleComponent,
    DemoLineChartComponent,
    DemoBarChartVerticalSimpleComponent,
    DemoBarChartVerticalGroupedComponent,
    DemoBarChartHorizontalSimpleComponent,
    DemoBarChartHorizontalGroupedComponent,
    ExampleChartSynchronizationComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FathymSharedModule,
    MaterialModule,
    FlexLayoutModule,
    LcuChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [LcuChartsModule]
})
export class AppModule { }
