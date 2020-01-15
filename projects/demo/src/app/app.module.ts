import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FathymSharedModule, MaterialModule } from '@lcu/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LcuChartsModule } from '@lowcodeunit/lcu-charts-common';
import { DemoAreaChartComponent } from './charts/demo-area-chart/demo-area-chart.component';
import { DemoLineChartComponent } from './charts/demo-line-chart/demo-line-chart.component';
import { DemoVerticalBarChartComponent } from './charts/demo-vertical-bar-chart/demo-vertical-bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoAreaChartComponent,
    DemoLineChartComponent,
    DemoVerticalBarChartComponent
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
