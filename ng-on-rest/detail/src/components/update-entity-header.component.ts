import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TNgorFormModel } from 'ng-on-rest-forms';
import { INgorUpdateEntityLabels } from '../interfaces/udate-entity-labels';
import { NgorUpdateEntityModalComponent } from './update-entity-modal.component';

@Component({
  selector: 'ngor-update-entity-header',
  template: `
    <div class="card-header d-flex flex-row justify-content-between">
      <h2 [innerHTML]="labels.title | translate"></h2>
      <ng-container *ngIf="model && value">
        <button class="btn btn-link"
                [innerHTML]="labels.edit | translate"
                (click)="openEditModal(model)">
        </button>
      </ng-container>
    </div>
  `,
})
export class NgorUpdateEntityHeaderComponent<UpdateFormModel> {
  @Input()
  public value: UpdateFormModel;

  @Input()
  public model: TNgorFormModel[] | undefined;

  @Input()
  set labels(labels: INgorUpdateEntityLabels | undefined) {
    Object.assign(this._labels, labels);
  }

  get labels() {
    return this._labels;
  }

  @Output()
  public onUpdate = new EventEmitter<UpdateFormModel>(true);

  private _labels: INgorUpdateEntityLabels = {};
  private _modalCtrl: NgbModal;

  constructor(modalCtrl: NgbModal) {
    this._modalCtrl = modalCtrl;
  }

  public openEditModal(model: TNgorFormModel[]) {
    const modalRef = this._modalCtrl.open(NgorUpdateEntityModalComponent, {
      size: 'lg',
    });
    const modalComponent: NgorUpdateEntityModalComponent<UpdateFormModel> = modalRef.componentInstance;
    modalComponent.labels = this.labels;
    modalComponent.value = this.value;
    modalComponent.model = model;
    modalComponent.onUpdate
      .subscribe((updatedValue: UpdateFormModel) => this.onUpdate.emit(updatedValue));
  }
}
