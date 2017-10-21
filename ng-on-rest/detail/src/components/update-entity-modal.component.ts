import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';
import { NgorDynamicFormComponent, TNgorFormModel } from 'ng-on-rest-forms';
import { IUpdateEntityModalLabels } from '../interfaces/udate-entity-modal-labels';

@Component({
  providers: [TranslatePipe],
  selector: 'ngor-update-entity-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title mr-auto" [innerHTML]="labels.modalTitle | translate"></h4>
      <button class="btn btn-link" (click)="close()" [innerHTML]="labels.cancel | translate"></button>
      <button class="btn btn-primary"
              type="submit"
              [attr.disabled]="!form.formGroup.valid || null"
              [innerHTML]="labels.save | translate"
              form="ngorUpdateForm">
      </button>
    </div>
    <div class="modal-body">
      <ngor-dynamic-form formId="ngorUpdateForm"
                         [model]="model | ngorTranslateFormModel"
                         [value]="value"
                         (onSubmit)="update($event)">
      </ngor-dynamic-form>
    </div>
  `,
})
export class NgorUpdateEntityModalComponent<UpdateFormModel> {
  @Input()
  public model: TNgorFormModel[];

  @Input()
  public labels: IUpdateEntityModalLabels = {};

  @Output()
  public onUpdate = new EventEmitter<UpdateFormModel>(true);

  @ViewChild(NgorDynamicFormComponent)
  public form: NgorDynamicFormComponent<UpdateFormModel>;

  public value: UpdateFormModel;

  private _activeModal: NgbActiveModal;

  constructor(activeModal: NgbActiveModal) {
    this._activeModal = activeModal;
  }

  public close() {
    this._activeModal.dismiss();
  }

  public update(formValue: UpdateFormModel) {
    this.onUpdate.emit(formValue);
    this.close();
  }
}
