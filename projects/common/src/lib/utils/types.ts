export function isDate(value: any) {
  return toString.call(value) === '[object Date]';
}

export function isNumber(value: any) {
  return typeof value === 'number';
}
