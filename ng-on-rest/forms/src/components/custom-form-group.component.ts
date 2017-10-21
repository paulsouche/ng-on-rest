import { FormBuilder, FormGroup } from '@angular/forms';

export abstract class NgorCustomFormGroupComponent {
  public formGroup: FormGroup;

  protected _formBuilder: FormBuilder;

  constructor(formBuilder: FormBuilder) {
    this._formBuilder = formBuilder;
    this.formGroup = formBuilder.group({});
  }
}
