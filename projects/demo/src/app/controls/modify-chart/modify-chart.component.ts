import { Component, OnInit, Input } from '@angular/core';
import { AppEventService } from '../../app-event.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppConstants } from '../../app-constants';
import { colorSets } from '@lowcodeunit/lcu-charts-common';
import { Router } from '@angular/router';
import { ChartNavModel, ChartNavType } from '../../models/chart-nav.model';
import { ChartGlobalOptionsModel } from '@lowcodeunit/lcu-charts-common';
import { MatDialog } from '@angular/material/dialog';
import { CodeDialogComponent } from '../code-dialog/code-dialog.component';

@Component({
  selector: 'lcu-modify-chart',
  templateUrl: './modify-chart.component.html',
  styleUrls: ['./modify-chart.component.scss']
})
export class ModifyChartComponent implements OnInit {
  public ChartNavType: any;
  public ChartsForm: FormGroup;
  public ColorSets: any[];
  public CurrentChart: ChartNavModel;
  public CurveTypes: any[];
  public Curves: any[];
  public IsChartFormDisplayed: boolean;

  @Input() public options: ChartGlobalOptionsModel;

  constructor(
    private appEventService: AppEventService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.ChartNavType = ChartNavType;
    this.ColorSets = colorSets;
    this.Curves = AppConstants.DEFAULT_LINE_AREA_CHART_OPTIONS.curves;
    this.CurveTypes = Object.keys(this.Curves);
    this.IsChartFormDisplayed = false;
  }

  public ngOnInit(): void {
    this.CurrentChart = AppConstants.CHART_NAV_ITEMS.find(item => item.route === this.router.url);
    this.setupForm();
  }

  public openCodeDialog(): void {
    const dialogRef = this.dialog.open(CodeDialogComponent, {
      position: { top: '50px' },
      width: '750px',
      data: { chart: this.CurrentChart, form: this.ChartsForm.value }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public ToggleChartForm(): void {
    this.IsChartFormDisplayed = !this.IsChartFormDisplayed;
  }

  protected onChanges(): void {
    this.ChartsForm.valueChanges.subscribe(
      (value: any) => {
        console.log('onChanges(): ', value);
        this.appEventService.emitDemoFormValueEvent(value);
      }
    );
  }

  protected setupForm(): void {
    this.ChartsForm = this.fb.group(this.options);
    this.onChanges();
  }
}
