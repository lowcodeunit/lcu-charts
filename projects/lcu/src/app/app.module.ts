import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FathymSharedModule, LCUServiceSettings } from '@lcu/common';
import { environment } from '../environments/environment';
import { LcuChartsModule, LcuChartsChartsDemoElementComponent, SELECTOR_LCU_CHARTS_CHARTS_DEMO_ELEMENT } from '@lowcodeunit/lcu-charts-common';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FathymSharedModule,
    LcuChartsModule
  ],
  providers: [
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment)
    }
  ],
  exports: [LcuChartsModule]
})
export class AppModule implements DoBootstrap {
	constructor(protected injector: Injector) {}

	public ngDoBootstrap() {
		const chartsDemo = createCustomElement(LcuChartsChartsDemoElementComponent, { injector: this.injector });

		customElements.define(SELECTOR_LCU_CHARTS_CHARTS_DEMO_ELEMENT, chartsDemo);
	}
}
