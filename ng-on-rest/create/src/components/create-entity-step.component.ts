import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DynamicFormControlEvent, DynamicFormControlModel, DynamicFormLayout } from '@ng-dynamic-forms/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NgorCustomFormGroupComponent, NgorDynamicFormComponent, TNgorFormModel } from 'ng-on-rest-forms';
import { INgorCreateStepLabels } from '../interfaces/create-step-labels';
import { INgorStepEnterParams } from '../interfaces/step-enter-params';

@Component({
  providers: [TranslatePipe],
  selector: 'ngor-create-entity-step',
  template: `
    <ng-template>
      <p class="mt-3" [attr.hidden]="!labels.subTitle || null" [innerHTML]="labels.subTitle | translate"></p>
      <ngor-dynamic-form [model]="model | ngorTranslateFormModel"
                         [labels]="labels"
                         [layout]="layout"
                         [formId]="formId"
                         (onBack)="back()"
                         (onChecked)="checked($event)"
                         (onSubmit)="submit($event)"
                         (onControlBlured)="blured($event)"
                         (onControlChanged)="changed($event)"
                         (onControlFocused)="focused($event)">
        <ng-content></ng-content>
      </ngor-dynamic-form>
    </ng-template>
  `,
})
export class NgorCreateEntityStepComponent<FormModel> implements AfterViewInit {
  @Input()
  public model: TNgorFormModel = [];

  @Input()
  set labels(labels: INgorCreateStepLabels | undefined) {
    Object.assign(this._labels, labels);
  }

  get labels() {
    return this._labels;
  }

  @Input()
  public layout: DynamicFormLayout | undefined;

  @Input()
  public formId: string | undefined;

  @Output()
  public onBack = new EventEmitter<void>(true);

  @Output()
  public onChecked = new EventEmitter<DynamicFormControlModel[]>(true);

  @Output()
  public onEnter = new EventEmitter<INgorStepEnterParams<FormModel>>(true);

  @Output()
  public onSubmit = new EventEmitter<FormModel>(true);

  @Output()
  public onControlBlured = new EventEmitter<DynamicFormControlEvent>(true);

  @Output()
  public onControlChanged = new EventEmitter<DynamicFormControlEvent>(true);

  @Output()
  public onControlFocused = new EventEmitter<DynamicFormControlEvent>(true);

  @ViewChild(TemplateRef)
  public template: TemplateRef<NgorDynamicFormComponent<FormModel>>;

  @ViewChild(NgorDynamicFormComponent)
  public form: NgorDynamicFormComponent<FormModel>;

  @ContentChildren(NgorCustomFormGroupComponent)
  public customFormGroups: QueryList<NgorCustomFormGroupComponent>;

  private _labels: INgorCreateStepLabels = {};

  public ngAfterViewInit() {
    const formGroup = this.form.formGroup;
    this.customFormGroups.forEach((cfg) => {
      const controls = cfg.formGroup.controls;
      Object.keys(controls).forEach((k) => formGroup.addControl(k, controls[k]));
    });
  }

  public back() {
    this.onBack.emit();
  }

  public checked(formModel: DynamicFormControlModel[]) {
    this.onChecked.emit(formModel);
  }

  public enter(formValue: FormModel) {
    this.onEnter.emit({
      formGroup: this.form ? this.form.formGroup : undefined,
      formValue,
    });
  }

  public submit(formValue: FormModel) {
    this.onSubmit.emit(formValue);
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
}
