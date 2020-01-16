# LcuCharts

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Formatting Y-axis

The Y-axis is built using multiple inputs to the lcu-charts:
    yAxisTickFormatting - allows you to customize the values displayed on the y-axis by calling a method that formats the data you are using.

    EX: 
      This will assign a string value to represnt the numerical value of the data (only in the Y-axis not the values displayed in the tooltip)

      public yAxisTickFormatting = this.FormatYAxisTicks.bind(this);

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

    However, if you do not have data that meets all the thresholds those values will be left out if you have autoScale=true.

    autoScale is a boolean value where if true, the y-axis will fit to the data, making the graphs appear different each time the graph is generated based on the data passed in. If you want the y-axis to be consistent each time the graph is produced you will need autoScale to be false.

    However, this will result in duplicate string values appearing on the y-axis depending on the range of data. To fix this issue you will need to use another input value called, yAxisTicks.

    yAxisTicks allows you to pass in an array of values in which you want only those values to display on the y-axis thus eliminating duplicates appearing on the y-axis.

## X-axis date format

The x-axis in many cases will be used for Date/Time. To simplify formatting for dates we added two inputs that allow this. xAxisIsDate and xAxisDateFormat:
    xAxisIsDate is a boolean value to let the component know that the x-Axis is a date and the xAxisDateFormat specifies the format via the DateFormatModel.
    
    EX:
        xAxisDateFormat: DateFormatModel = {
            DayOfWeek: true, 
            Month: false, 
            DayOfMonth:true, 
            Year:false, 
            Time: true, 
            TimeZone: false
        };
The dateformat allows you to turn on/off certian properties found when Date.toString() is called.

If the x-axis is a date and neither of these inputs are used, it will default to the ngx-charts date format which will only display time if the date is the same, limiting the amount of info your graph portrays.

## Units

    Often times when we are graphing, the values have units associated with them.
    Before if we wanted to pass units ex a degree symbol, to the tooltip we would have to use ng-template to access and modify the tooltip. However now we can use the input 'units' which is of type string to pass the units from the project all the way to the tooltip-area making it easier for the user to define a unit and pass it as an input.

