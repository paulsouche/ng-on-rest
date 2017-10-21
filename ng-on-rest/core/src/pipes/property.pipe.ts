import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ngorProperty',
  pure: false,
})
export class NgorPropertyPipe implements PipeTransform {
  public transform(model?: any | undefined, property?: string | undefined) {
    let value: any = '';
    if (model && property) {
      value = model;
      const properties = property.split('.');
      const ilen = properties.length;
      let i = 0;
      while (i < ilen) {
        value = value[properties[i]];
        if (typeof value === 'undefined' || value == null) {
          value = '';
          break;
        }
        i++;
      }
    }
    return value.toString();
  }
}
