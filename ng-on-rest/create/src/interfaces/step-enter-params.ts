import { FormGroup } from '@angular/forms';

export interface INgorStepEnterParams<FormModel> {
  formGroup: FormGroup | undefined;
  formValue: FormModel;
}
