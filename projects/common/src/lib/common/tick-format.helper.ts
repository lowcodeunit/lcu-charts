import { timeFormat } from 'd3-time-format';

export function tickFormat(fieldType: any, groupByType: any): (label: string) => string {
  return (label: string): string => {
    if (label === 'No Value' || label === 'Other') {
      return label;
    }
    if (fieldType === 'date' && groupByType === 'groupBy') {
      const formatter = timeFormat('MM/DD/YYYY');
      return formatter(<any>label);
    }

    return label.toString();
  };
}
