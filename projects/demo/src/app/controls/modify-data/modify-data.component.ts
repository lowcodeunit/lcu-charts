import { Component, OnInit, Input } from '@angular/core';
import { AppEventService } from '../../app-event.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataWrapper } from '@lowcodeunit/lcu-charts-common';

@Component({
  selector: 'lcu-modify-data',
  templateUrl: './modify-data.component.html',
  styleUrls: ['./modify-data.component.scss']
})
export class ModifyDataComponent implements OnInit {
  public DataForm: FormGroup;
  public IsChartFormDisplayed: boolean;

  @Input() public dataWrapper: DataWrapper;

  constructor(
    private appEventService: AppEventService,
    private fb: FormBuilder
  ) {
    this.IsChartFormDisplayed = false;
  }

  public ngOnInit(): void {
    this.setupForm();
  }

  public ApplyChanges(): void {
    const value = this.DataForm.value;
    value.dataWrapper.singleSeries = value.dataWrapper.singleSeries ? JSON.parse(value.dataWrapper.singleSeries) : null;
    value.dataWrapper.multiSeries = value.dataWrapper.multiSeries ? JSON.parse(value.dataWrapper.multiSeries) : null;
    value.dataWrapper.bubbleSeries = value.dataWrapper.bubbleSeries ? JSON.parse(value.dataWrapper.bubbleSeries) : null;

    if (value.dataWrapper.multiSeries) {
      value.dataWrapper.multiSeries.forEach((val: any) => {
        if (val && val.series) {
          val.series.map((el: any) => el.name = (el && el.name && Date.parse(el.name)) ? new Date(el.name) : el.name );
        }
      });
    }

    this.appEventService.emitDemoFormValueEvent(value);
    this.DataForm.markAsPristine();
  }

  public ToggleChartForm(): void {
    this.IsChartFormDisplayed = !this.IsChartFormDisplayed;
  }

  public ToggleRealTime(): void {
    this.appEventService.emitRealTimeCheckedEvent(!this.DataForm.get('realTime').value);
  }

  private setupForm(): void {
    this.DataForm = this.fb.group({
      dataWrapper: this.fb.group({
        singleSeries: this.fb.control(JSON.stringify(this.dataWrapper.singleSeries, undefined, 4)),
        multiSeries: this.fb.control(JSON.stringify(this.dataWrapper.multiSeries, undefined, 4)),
        bubbleSeries: this.fb.control(JSON.stringify(this.dataWrapper.bubbleSeries, undefined, 4))
      }),
      realTime: this.fb.control(false)
    });
  }
}
