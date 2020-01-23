import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ThemeColorPickerService } from '@lcu/common';
import { version, description } from '@lowcodeunit/lcu-charts-common/package.json';
import { AppEventService } from './app-event.service';
import { AppConstants } from './app-constants';
import { ChartNavType } from './models/chart-nav.model';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public readonly APP_DESCRIPTION: string = description;
  public readonly APP_VERSION: string = version;

  public BarChartNavItems: any[];
  public ExampleChartNavItems: any[];
  public LineChartNavItems: any[];
  public Opened: boolean = false;
  public OtherChartNavItems: any[];
  public PieChartNavItems: any[];
  public ThemeClass: BehaviorSubject<string>;
  public Themes: Array<any>;

  private chartNavItems: any[];

  @ViewChild('sidenav', { static: false }) sidenav: ElementRef<any>;

  constructor(
    private appEventService: AppEventService,
    private themeService: ThemeColorPickerService
  ) {
    this.appEventService.getExampleLinkClickedEvent().subscribe(
      () => {
        this.Opened = true;
      }
    );
  }

  public ngOnInit(): void {
    this.resetTheme();
    this.setNavItems();
    this.setThemes();
  }

  public PickTheme(color: string): void {
    this.themeService.SetColorClass(`fathym-${color}-theme`);
  }

  protected resetTheme(): void {
    this.ThemeClass = this.themeService.GetColorClass();
  }

  protected setNavItems(): void {
    this.chartNavItems = AppConstants.CHART_NAV_ITEMS;
    this.BarChartNavItems = this.chartNavItems.filter(item => item.type === ChartNavType.BAR);
    this.ExampleChartNavItems = this.chartNavItems.filter(item => item.type === ChartNavType.EXAMPLE);
    this.LineChartNavItems = this.chartNavItems.filter(item => item.type === ChartNavType.LINE_AREA);
    this.OtherChartNavItems = this.chartNavItems.filter(item => item.type === ChartNavType.OTHER);
    this.PieChartNavItems = this.chartNavItems.filter(item => item.type === ChartNavType.PIE);
  }

  protected setThemes(): void {
    this.Themes = AppConstants.FATHYM_THEMES;
  }

}
