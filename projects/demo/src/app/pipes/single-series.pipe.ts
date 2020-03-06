import { Pipe, PipeTransform } from '@angular/core';
import { SeriesMapping } from './multi-series.pipe';
import { DataItem, SingleSeries } from '@lowcodeunit/lcu-charts-common';

@Pipe({ name: 'singleSeries' })
export class SingleSeriesPipe implements PipeTransform {
  transform(value: any, mapping: SeriesMapping): any[] {
    const singleSeries: SingleSeries = [];

    mapping.fieldValues.forEach((fieldValue: string, fieldIndex: number) => {
      let seriesValue = { ...value };
      const fieldValues = fieldValue.split('.');
      const newObjName = mapping.seriesNames && mapping.seriesNames[fieldIndex]
                     ? mapping.seriesNames[fieldIndex]
                     : convertToName(fieldValues[(fieldValues.length - 1)]);

      const newObj: DataItem = {
        name: newObjName,
        value: null
      };

      fieldValues.map((field: string) => seriesValue = seriesValue[field]);

      if (seriesValue && Array.isArray(seriesValue)) {
        newObj.value = seriesValue.reduce((a: any, b: any) => a + b, 0) / seriesValue.length;
      }

      singleSeries.push(newObj);
    });

    return singleSeries && singleSeries.length ? singleSeries : value;;
  }
}

function convertToName(value: string, separator?: string): string {
  const sep = separator ? separator : ' ';

  return value
        .charAt(0).toUpperCase() + value.slice(1)
        .replace(/([a-z\d])([A-Z])/g, '$1' + sep + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + sep + '$2');
}
