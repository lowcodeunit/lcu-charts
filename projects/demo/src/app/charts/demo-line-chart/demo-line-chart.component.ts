import { Component, OnInit } from '@angular/core';
import { colorSets, DateFormatModel } from '@lowcodeunit/lcu-charts-common';
import * as shape from 'd3-shape';
import { weatherData } from '../../data';

@Component({
  selector: 'lcu-demo-line-chart',
  templateUrl: './demo-line-chart.component.html',
  styleUrls: ['./demo-line-chart.component.scss']
})
export class DemoLineChartComponent implements OnInit {
  public animations: boolean = true;
  public autoScale: boolean = false;
  public colorScheme: any;
  public curve: any;
  public gradient: boolean = false;
  public legendPosition: string = 'right';
  public legendTitle: string = '';
  public maxXAxisTickLength: number = 16;
  public maxYAxisTickLength: number = 16;
  public rangeFillOpacity: number = 0.15;
  public rotateXAxisTicks: boolean = true;
  public roundDomains: boolean = false;
  public schemeType: string = 'ordinal';
  public showGridLines: boolean = true;
  public showLegend: boolean = true;
  public showXAxis: boolean = true;
  public showXAxisLabel: boolean = true;
  public showYAxis: boolean = true;
  public showYAxisLabel: boolean = true;
  public timeline: boolean = false;
  public tooltipDisabled: boolean = false;
  public trimXAxisTicks: boolean = true;
  public trimYAxisTicks: boolean = true;
  public view: any[];
  public weatherData: any[];
  public xAxisLabel: string = 'Time';
  public xScaleMax: any;
  public xScaleMin: any;
  public yAxisLabel: string = 'Temperature (F)';
  public yScaleMax: number = 100;
  public yScaleMin: number;
  public yUnits: string = "\u00B0";

  public yAxisTickFormatting = this.FormatYAxisTicksDegree.bind(this);
  // public xAxisTickFormatting = this.FormatXAxisTicks.bind(this);
  public yAxisTicks: Array<any> = [0,30,70,100];
  public xAxisIsDate: boolean = true;
  public xAxisDateFormat: DateFormatModel = {DayOfWeek: true, 
                    Month: false, 
                    DayOfMonth:true, 
                    Year:false, 
                    Time: true, 
                    TimeZone: false
                  };

  private colorSets: any;
  private curveType: string = 'Linear';
  private curves: any;
  private fitContainer: boolean = false;
  private height: number = 400;
  private width: number = 1000;

  constructor() {
    Object.assign(this, {
      colorSets,
      weatherData
    });
    this.setColorScheme('cool');
  }

  public ngOnInit(): void {
    if (!this.fitContainer) {
      this.applyDimensions();
    }
    this.curves = {
      'Basis': shape.curveBasis,
      'Basis Closed': shape.curveBasisClosed,
      'Bundle': shape.curveBundle.beta(1),
      'Cardinal': shape.curveCardinal,
      'Cardinal Closed': shape.curveCardinalClosed,
      'Catmull Rom': shape.curveCatmullRom,
      'Catmull Rom Closed': shape.curveCatmullRomClosed,
      'Linear': shape.curveLinear,
      'Linear Closed': shape.curveLinearClosed,
      'Monotone X': shape.curveMonotoneX,
      'Monotone Y': shape.curveMonotoneY,
      'Natural': shape.curveNatural,
      'Step': shape.curveStep,
      'Step After': shape.curveStepAfter,
      'Step Before': shape.curveStepBefore,
      'default': shape.curveLinear
    };
    this.curve = this.curves[this.curveType];
  }

  public FormatYAxisTicks(value: any){
    if(value <=0 ){
      return "Freezing";
    }
    if(value >0 && value<=32){
      return "Cold";
    }
    if(value >32 && value <=70){
      return "Warm";
    }
    if(value>70){
      return "Hot";
    }
  }

  public FormatYAxisTicksDegree(value: any){
    return value + this.yUnits;
  }

  public BuildSeriesTooltip(model: any){
    console.log("model=", model);
    console.log("type=", model.type())
  }

//   public FormatXAxisTicks(value: Date){
//     console.log("value: ", value)
//     let datestr: string = value.toString();
//     let dateArr = datestr.split(" ");
//     let dateTime: string = ""
//     if(this.xAxisDateFormat.DayOfWeek){
//       dateTime+=dateArr[0] +" ";
//     }
//     if(this.xAxisDateFormat.Month){
//      dateTime+=dateArr[1]+" ";
//     }
//     if(this.xAxisDateFormat.DayOfMonth){
//       dateTime+=dateArr[2]+" ";
//     }
//     if(this.xAxisDateFormat.Year){
//      dateTime+=dateArr[3]+" ";
//     }
//     if(this.xAxisDateFormat.Time){
//       let time = dateArr[4];

//      dateTime+=time.substr(0, time.length-3)+" ";
//     }
//     if(this.xAxisDateFormat.TimeZone){
//      dateTime+=dateArr[5]+" ";
//     }
//     dateTime.trimRight();

// console.log("new date format: ", dateTime)
//     // console.log("datestr= ", value.toString());
//     return dateTime;
//   }


  public activate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  public deactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  public onLegendLabelClick(entry: any): void {
    console.log('Legend clicked', entry);
  }

  public select(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  private applyDimensions(): void {
    this.view = [this.width, this.height];
  }

  private setColorScheme(name: string): void {
    this.colorScheme = this.colorSets.find(s => s.name === name);
  }

}
