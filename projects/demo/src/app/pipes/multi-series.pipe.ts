import { Pipe, PipeTransform } from '@angular/core';
import { Series } from '@lowcodeunit/lcu-charts-common';

export class SeriesMapping {
  fieldValues: string[];
  fieldName: string;
  seriesNames?: string[];
}

@Pipe({ name: 'multiSeries' })
export class MultiSeriesPipe implements PipeTransform {
  transform(value: any, mapping: SeriesMapping): any[] {
    const series: Series[] = [];

    mapping.fieldValues.forEach((fieldValue: string, fieldIndex: number) => {
      let seriesValue = { ...value };
      let seriesName = { ...value };
      const fieldValues = fieldValue.split('.');
      const fieldNames = mapping.fieldName.split('.');
      const newObjName = mapping.seriesNames && mapping.seriesNames[fieldIndex]
                     ? mapping.seriesNames[fieldIndex]
                     : convertToName(fieldValues[(fieldValues.length - 1)]);

      const newObj: Series = {
        name: newObjName,
        series: []
      };

      fieldValues.map((field: string) => seriesValue = seriesValue[field]);

      fieldNames.map((field: string) => {
        if (Array.isArray(seriesName)) {
          seriesName = seriesName.map((_: any, index: number) => seriesName[index][field]);
        } else {
          seriesName = seriesName[field];
        }
      });

      if (seriesValue) {
        seriesValue.map((s: any, i: number) => newObj.series.push({ value: s, name: null }));
      }

      if (seriesName) {
        seriesName.map((s: any, i: number) => newObj.series[i].name = s);
      }
      series.push(newObj);
    });

    return series && series.length ? series : value;
  }
}

function convertToName(value: string, separator?: string): string {
  const sep = separator ? separator : ' ';

  return value
        .charAt(0).toUpperCase() + value.slice(1)
        .replace(/([a-z\d])([A-Z])/g, '$1' + sep + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + sep + '$2');
}
