import { Component, OnInit, Input } from '@angular/core';
import { AppEventService } from '../app-event.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppConstants } from '../app-constants';
import { colorSets } from '@lowcodeunit/lcu-charts-common';


@Component({
  selector: 'lcu-modify-chart',
  templateUrl: './modify-chart.component.html',
  styleUrls: ['./modify-chart.component.scss']
})
export class ModifyChartComponent implements OnInit {
  public ChartsForm: FormGroup;
  public ColorSets: any[];
  public CurveTypes: any[];
  public Curves: any[];
  public IsChartFormDisplayed: boolean;

  @Input() public customOptions: any;

  constructor(
    private appEventService: AppEventService,
    private fb: FormBuilder
  ) {
    this.ColorSets = colorSets;
    this.Curves = AppConstants.DEFAULT_LINE_CHART_OPTIONS.curves;
    this.CurveTypes = Object.keys(this.Curves);
    this.IsChartFormDisplayed = false;
  }

  public ngOnInit(): void {
    this.setupForm();
  }

  public ToggleChartForm(): void {
    this.IsChartFormDisplayed = !this.IsChartFormDisplayed;
  }

  protected onChanges(): void {
    this.ChartsForm.valueChanges.subscribe(
      (value) => {
        this.appEventService.emitDemoFormValueEvent(value);
      }
    );
  }

  protected setupForm(): void {
    const allOptions: any = {...AppConstants.DEFAULT_GLOBAL_CHART_OPTIONS, ...this.customOptions};
    console.log('setupForm() - allOptions: ', allOptions);
    this.ChartsForm = this.fb.group(allOptions);
    this.onChanges();
  }
}
