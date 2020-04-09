import { Component, OnInit, Injector } from '@angular/core';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';

export class LcuChartsChartsDemoElementState {}

export class LcuChartsChartsDemoContext extends LCUElementContext<LcuChartsChartsDemoElementState> {}

export const SELECTOR_LCU_CHARTS_CHARTS_DEMO_ELEMENT = 'lcu-charts-charts-demo-element';

@Component({
  selector: SELECTOR_LCU_CHARTS_CHARTS_DEMO_ELEMENT,
  templateUrl: './charts-demo.component.html',
  styleUrls: ['./charts-demo.component.scss']
})
export class LcuChartsChartsDemoElementComponent extends LcuElementComponent<LcuChartsChartsDemoContext> implements OnInit {
  //  Fields

  //  Properties

  //  Constructors
  constructor(protected injector: Injector) {
    super(injector);
  }

  //  Life Cycle
  public ngOnInit() {
    super.ngOnInit();
  }

  //  API Methods

  //  Helpers
}
