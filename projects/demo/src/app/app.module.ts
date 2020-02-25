import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FathymSharedModule, MaterialModule } from '@lcu/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppEventService } from './app-event.service';
import { LcuChartsModule } from '@lowcodeunit/lcu-charts-common';
import { HomeComponent } from './controls/home/home.component';
import { ModifyChartComponent } from './controls/modify-chart/modify-chart.component';
import { CodeDialogComponent } from './controls/code-dialog/code-dialog.component';
import { DemoAreaChartSimpleComponent } from './charts/demo-area-chart-simple/demo-area-chart-simple.component';
import { DemoLineChartComponent } from './charts/demo-line-chart/demo-line-chart.component';
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
import { LcuDocumentationModule } from '@lowcodeunit/lcu-documentation-common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModifyChartComponent,
    CodeDialogComponent,
    DemoAreaChartSimpleComponent,
    DemoLineChartComponent,
    DemoBarChartVerticalSimpleComponent,
    DemoBarChartVerticalGroupedComponent,
    DemoBarChartHorizontalSimpleComponent,
    DemoBarChartHorizontalGroupedComponent,
    DemoPieChartSimpleComponent,
    DemoPieChartAdvancedComponent,
    DemoBubbleChartSimpleComponent,
    DemoGaugeSimpleComponent,
    ExampleChartSynchronizationComponent,
    ExampleRealTimeDataComponent,
    DocumentationComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FathymSharedModule,
    MaterialModule,
    FlexLayoutModule,
    LcuChartsModule,
    LcuDocumentationModule.forRoot()
  ],
  providers: [AppEventService],
  bootstrap: [AppComponent],
  exports: [LcuChartsModule],
  entryComponents: [CodeDialogComponent]
})
export class AppModule { }
