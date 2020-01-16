import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ThemeColorPickerService } from '@lcu/common';
import { version, description } from '@lowcodeunit/lcu-charts-common/package.json';

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

  constructor(
    private themeService: ThemeColorPickerService
  ) { }

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
    this.chartNavItems = [
      { title: 'Simple Line Chart', icon: 'show_chart', route: 'charts/simple-line-chart', type: 'Line_Area' },
      { title: 'Simple Vertical Bar Chart', icon: 'bar_chart', route: 'charts/simple-vertical-bar-chart', type: 'Bar' },
      { title: 'Simple Horizontal Bar Chart', icon: 'notes', route: 'charts/simple-horizonal-bar-chart', type: 'Bar' },
      { title: 'Grouped Vertical Bar Chart', icon: 'bar_chart', route: 'charts/grouped-vertical-bar-chart', type: 'Bar' },
      { title: 'Grouped Horizontal Bar Chart', icon: 'notes', route: 'charts/grouped-horizonal-bar-chart', type: 'Bar' },
      { title: 'Simple Area Chart', icon: 'insert_photo', route: 'charts/simple-area-chart', type: 'Line_Area' },
      // { title: 'Combo Chart', icon: 'multiline_chart', route: 'examples/combo-chart', type: 'Example' },
      { title: 'Simple Pie Chart', icon: 'pie_chart', route: 'charts/simple-pie-chart', type: 'Pie' },
      { title: 'Advanced Pie Chart', icon: 'pie_chart', route: 'charts/advanced-pie-chart', type: 'Pie' },
      { title: 'Bubble Chart', icon: 'bubble_chart', route: 'charts/simple-bubble-chart', type: 'Other' },
      { title: 'Gauge', icon: 'wifi_tethering', route: 'charts/simple-gauge', type: 'Other' },
      { title: 'Chart Synchronization', icon: 'compare_arrows', route: 'examples/chart-synchronization', type: 'Example' },
      { title: 'Real Time Data', icon: 'device_hub', route: 'examples/real-time-data', type: 'Example' }
    ];
    this.BarChartNavItems = this.chartNavItems.filter(item => item.type === 'Bar');
    this.ExampleChartNavItems = this.chartNavItems.filter(item => item.type === 'Example');
    this.LineChartNavItems = this.chartNavItems.filter(item => item.type === 'Line_Area');
    this.OtherChartNavItems = this.chartNavItems.filter(item => item.type === 'Other');
    this.PieChartNavItems = this.chartNavItems.filter(item => item.type === 'Pie');
  }

  protected setThemes(): void {
    this.Themes = [
      { ColorSwatch: 'color-swatch-arctic', Icon: 'brightness_1', Label: 'Arctic Theme', Value: 'arctic-theme', Color: 'arctic' },
      { ColorSwatch: 'color-swatch-contrast', Icon: 'brightness_1', Label: 'Contrast Theme', Value: 'contrast-theme', Color: 'contrast' },
      { ColorSwatch: 'color-swatch-cool-candy', Icon: 'brightness_1', Label: 'Cool Candy Theme', Value: 'cool-candy-theme', Color: 'cool-candy' },
      { ColorSwatch: 'color-swatch-flipper', Icon: 'brightness_1', Label: 'Flipper Theme', Value: 'flipper-theme', Color: 'flipper' },
      { ColorSwatch: 'color-swatch-ice', Icon: 'brightness_1', Label: 'Ice Theme', Value: 'ice-theme', Color: 'ice' },
      { ColorSwatch: 'color-swatch-sea-green', Icon: 'brightness_1', Label: 'Sea Green Theme', Value: 'sea-green-theme', Color: 'sea-green' },
      { ColorSwatch: 'color-swatch-white-mint', Icon: 'brightness_1', Label: 'White Mint Theme', Value: 'white-mint-theme', Color: 'white-mint' },
      { ColorSwatch: 'color-swatch-ivy', Icon: 'brightness_1', Label: 'Ivy Theme', Value: 'ivy-theme', Color: 'ivy' }
    ];
  }

}
