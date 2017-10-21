import { Pipe, PipeTransform } from '@angular/core';
import { DynamicInputControlModelConfig, DynamicOptionControlModelConfig } from '@ng-dynamic-forms/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TNgorFormModel } from '../interfaces/form-model';

@Pipe({
  name: 'ngorTranslateFormModel',
})
export class NgorTranslateFormModelPipe implements PipeTransform {
  private _translatePipe: TranslatePipe;

  constructor(translatePipe: TranslatePipe) {
    this._translatePipe = translatePipe;
  }

  public transform(model: TNgorFormModel | null | undefined): TNgorFormModel | null | undefined {
    if (Array.isArray(model)) {
      const translatePipe = this._translatePipe;
      return model.map((c) => {
        const label = translatePipe.transform(c.label || '');
        const placeholder = translatePipe.transform((c as DynamicInputControlModelConfig<any>).placeholder || '');
        const controlOptions = (c as DynamicOptionControlModelConfig<any>).options;
        const options = Array.isArray(controlOptions)
          ? {
            options: controlOptions.map((o) => ({
              ...o,
              label: translatePipe.transform(o.label || ''),
            })),
          }
          : {};
        const controlGroup: TNgorFormModel = (c as any).group;
        const group = controlGroup
          ? { group: this.transform(controlGroup) }
          : {};

        return {
          ...c,
          ...group,
          ...options,
          label,
          placeholder,
        };
      });
    }
    return model;
  }
}
