# Implementation 

## Setup
The Data Wrapper doesn't require any additional setup, so just make sure you have followed the required steps to setup and configure LCU-Charts in your Angular project. You can find the Setup documentation [here](getting-started/initial-setup.md).

You can find a working Demo of the Data Wrapper [here](examples/data-wrapper).

## HTML
In your component template add the Data Wrapper tag as follows, and link it to a new `DataWrapper` object in your typescript file.

```html
<lcu-data-wrapper [dataWrapper]="dataWrapper">
  <!-- Your charts here -->
</lcu-data-wrapper>
```

## Typescript
In your component typescript file, add the following:

```js
import { DataWrapper } from '@lowcodeunit/lcu-charts-common';
...
public dataWrapper: DataWrapper;

// Data retrieval and formatting is required on the implementation side.
constructor(private myDataService: DataService) {
  this.myDataService.GetData().subscribe(
    (data: any) => {
      this.dataWrapper.singleSeries = data;
    }
  );
}
```

## Data Structures
The Data Wrapper currently supports three different data structures. Each of the three data structures support a different set of charts. 

### 1. Single Series
The Data Structure:
```js
// Consists of an Array of `DataItems`
export interface SingleSeries extends Array<DataItem> {}

export interface DataItem {
  name: string | number | Date;
  value: string | number | Date;
  extra?: any;
  min?: number;
  max?: number;
  label?: string;
}
```

The Single Series data structure supports the following charts:
* [Simple Vertical Bar Chart](charts/simple-vertical-bar-chart.md)
* [Simple Horizontal Bar Chart](charts/simple-horizontal-bar-chart.md)
* [Simple Pie Chart](charts/simple-pie-chart.md)
* [Advanced Pie Chart](charts/advanced-pie-chart.md)
* [Simple Gauge](charts/simple-gauge.md)

### 2. Multi Series
The Data Structure:
```js
// Consists of an Array of `Series`
export interface MultiSeries extends Array<Series> {}

// Contains of an Array of `DataItem`
export interface Series {
  name: string | number | Date;
  series: DataItem[];
}

export interface DataItem {
  name: string | number | Date;
  value: string | number | Date;
  extra?: any;
  min?: number;
  max?: number;
  label?: string;
}
```

The Multi Series data structure supports the following charts:
* [Simple Line Chart](charts/simple-line-chart.md)
* [Simple Area Chart](charts/simple-area-chart.md)
* [Grouped Vertical Bar Chart](charts/grouped-vertical-bar-chart.md)
* [Grouped Horizontal Bar Chart](charts/grouped-horizontal-bar-chart.md)

### 3. Bubble Series
The Data Structure:
```js
// Consists of an Array of `BubbleChartSeries`
export interface BubbleChartMultiSeries extends Array<BubbleChartSeries> {}

// Contains of an Array of `BubbleChartDataItem`
export interface BubbleChartSeries {
  name: string | number | Date;
  series: BubbleChartDataItem[];
}

export interface BubbleChartDataItem {
  name: string | number | Date;
  x: string | number | Date;
  y: string | number | Date;
  r: number;
  extra?: any;
}
```

The Bubble Series data structure supports the following charts:
* [Simple Bubble Chart](charts/simple-bubble-chart.md)
