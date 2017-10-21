import { AfterViewChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {
  DynamicFormControlEvent,
  DynamicFormControlModel,
  DynamicFormLayout,
  DynamicFormService,
} from '@ng-dynamic-forms/core';
import { INgorFormLabels } from '../interfaces/form-labels';
import { TNgorFormModel } from '../interfaces/form-model';

@Component({
  selector: 'ngor-dynamic-form',
  template: `
    <form [formGroup]="formGroup" (submit)="submit()" [attr.id]="formId || null">
      <dynamic-ng-bootstrap-form-control *ngFor="let model of formModel"
                                         [group]="formGroup"
                                         [model]="model"
                                         [layout]="layout"
                                         (dfBlur)="blured($event)"
                                         (dfChange)="changed($event)"
                                         (dfFocus)="changed($event)">
      </dynamic-ng-bootstrap-form-control>
      <ng-content></ng-content>
      <ng-container *ngIf="!formId">
        <div class="row">
          <div class="col text-right">
            <button type="button"
                    class="btn btn-secondary mr-2"
                    [innerHTML]="labels.cancel | translate"
                    (click)="back()">
            </button>
            <button type="submit"
                    class="btn btn-primary"
                    [innerHTML]="labels.submit | translate"
                    [disabled]="!formGroup.valid">
            </button>
          </div>
        </div>
      </ng-container>
    </form>
  `,
})
export class NgorDynamicFormComponent<FormModel> implements OnInit, AfterViewChecked {
  @Input()
  public model: TNgorFormModel;

  @Input()
  public value: FormModel | undefined;

  @Input()
  public labels: INgorFormLabels = {};

  @Input()
  public layout: DynamicFormLayout | undefined;

  @Input()
  public formId: string | undefined;

  @Output()
  public onBack = new EventEmitter<void>(true);

  @Output()
  public onChecked = new EventEmitter<DynamicFormControlModel[]>();

  @Output()
  public onSubmit = new EventEmitter<FormModel>(true);

  @Output()
  public onControlBlured = new EventEmitter<DynamicFormControlEvent>(true);

  @Output()
  public onControlChanged = new EventEmitter<DynamicFormControlEvent>(true);

  @Output()
  public onControlFocused = new EventEmitter<DynamicFormControlEvent>(true);

  public formGroup: FormGroup;
  public formModel: DynamicFormControlModel[];

  private _formBuilder: FormBuilder;
  private _dynamicFormService: DynamicFormService;

  constructor(formBuilder: FormBuilder, dynamicFormService: DynamicFormService) {
    this._formBuilder = formBuilder;
    this._dynamicFormService = dynamicFormService;
  }

  public ngOnInit() {
    const dynamicFormService = this._dynamicFormService;
    const formModel = this.formModel = dynamicFormService.fromJSON(this.model);
    this.formGroup = dynamicFormService.createFormGroup(formModel);
    const value = this.value;
    if (value) {
      this.setValues(value);
    }
  }

  public ngAfterViewChecked() {
    this.onChecked.emit(this.formModel);
  }

  public back() {
    this.onBack.emit();
  }

  public submit() {
    this.onSubmit.emit(this.formGroup.value);
  }

  public blured(event: DynamicFormControlEvent) {
    this.onControlBlured.emit(event);
  }

  public changed(event: DynamicFormControlEvent) {
    this.onControlChanged.emit(event);
  }

  public focused(event: DynamicFormControlEvent) {
    this.onControlFocused.emit(event);
  }

  // TODO private
  public setValues(formValue: FormModel) {
    try {
      const formBuilder = this._formBuilder;
      const formGroup = this.formGroup;
      for (const property in formValue) {
        if (formValue.hasOwnProperty(property)) {
          const value = formValue[property];
          const propertyFormControl = formGroup.get(property);
          if (propertyFormControl) {
            if (Array.isArray(value)) {
              value.forEach((v) => (propertyFormControl as FormArray).push(formBuilder.group(v)));
            } else {
              propertyFormControl.setValue(formValue[property]);
            }
          }
        }
      }
    } catch (e) {
      // TODO error
      console.error(e);
    }
  }
}
