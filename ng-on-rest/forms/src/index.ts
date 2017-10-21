export { INgorFormLabels } from './interfaces/form-labels';
export {
  INgorFormModelControl,
  TNgorFormModel,
  TNgorFormModelConfig,
  TNgorFormModelType,
} from './interfaces/form-model';
export { NgorCustomFormGroupComponent } from './components/custom-form-group.component';
export { NgorDynamicFormComponent } from './components/dynamic-form.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { DynamicFormsNGBootstrapUIModule } from '@ng-dynamic-forms/ui-ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgorDynamicFormComponent } from './components/dynamic-form.component';
import { NgorTranslateFormModelPipe } from './pipes/translate-form-model.pipe';

@NgModule({
  declarations: [
    NgorDynamicFormComponent,
    NgorTranslateFormModelPipe,
  ],
  exports: [
    NgorDynamicFormComponent,
    NgorTranslateFormModelPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    DynamicFormsCoreModule.forRoot(),
    DynamicFormsNGBootstrapUIModule,
  ],
})
export class NgorFormsModule {
  public static forChild() {
    return {
      ngModule: NgorFormsModule,
    };
  }

  public static forRoot() {
    return {
      ngModule: NgorFormsModule,
    };
  }
}
