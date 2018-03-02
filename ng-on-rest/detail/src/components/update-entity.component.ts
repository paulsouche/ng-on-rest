import { Component, Input, OnInit } from '@angular/core';
import { INgorResource, NgorResourceComponentsService } from 'ng-on-rest-core';
import { TNgorFormModel } from 'ng-on-rest-forms';
import { INgorEntityDetailColumn } from '../interfaces/entity-detail-column';
import { INgorUpdateEntityLabels } from '../interfaces/udate-entity-labels';

@Component({
  selector: 'ngor-update-entity',
  template: `
    <div class="card">
      <ngor-update-entity-header [labels]="labels"
                                 [model]="model"
                                 [value]="value"
                                 (onUpdate)="update($event)">
      </ngor-update-entity-header>
      <div class="card-block p-4">
        <ngor-update-entity-detail [entity]="entity"
                                   [columns]="columns">
          <ng-content></ng-content>
        </ngor-update-entity-detail>
      </div>
    </div>
  `,
})
export class NgorUpdateEntityComponent<UpdtFormMdl, Qry, Prms, ECrteDto, EUpdteDto, EDto> implements OnInit {
  @Input()
  public columns: Array<INgorEntityDetailColumn<EDto>> = [];

  @Input()
  public model: TNgorFormModel[] | undefined;

  @Input()
  set labels(labels: INgorUpdateEntityLabels | undefined) {
    Object.assign(this._labels, labels);
  }

  get labels() {
    return this._labels;
  }

  public entity: EDto;
  public value: UpdtFormMdl;

  private _resourceComponentsService: NgorResourceComponentsService<Qry, Prms, ECrteDto, EUpdteDto, EDto>;
  private _labels: INgorUpdateEntityLabels = {
    edit: 'ngorDetail.edit',
  };

  constructor(resourceComponentsService: NgorResourceComponentsService<Qry, Prms, ECrteDto, EUpdteDto, EDto>) {
    this._resourceComponentsService = resourceComponentsService;
  }

  public ngOnInit() {
    const resourceComponentsService = this._resourceComponentsService;
    const resource = resourceComponentsService.resource;
    const entity = this.entity = resourceComponentsService.entity;
    return this._getEntityDtoToFormModelMapper(resource)(entity)
      .then((value) => this.value = value);
  }

  public update(formValue: UpdtFormMdl) {
    const resourceComponentsService = this._resourceComponentsService;
    const resource = resourceComponentsService.resource;
    const entity = resourceComponentsService.entity;
    const client = resourceComponentsService.client;
    return this._getFomModelToEntityUpdateDto(resource)(entity, formValue)
      .then((updateDto) => client.save
        ? client.save(updateDto)
        : Promise
          .reject(new Error('NgorUpdateEntityComponent: please implements save method of INgorGenericClient')))
      // tslint:disable-next-line:prefer-object-spread
      .then((saved) => Object.assign(entity, saved));
  }

  private _getEntityDtoToFormModelMapper(resource: INgorResource<any, any, any, any, any>):
    (dto: EDto) => Promise<UpdtFormMdl> {
    const mappers = resource.mappers;
    if (mappers && mappers.dtoToUpdateFormModel) {
      return mappers.dtoToUpdateFormModel;
    }
    return (x: EDto) => Promise.resolve(x as any as UpdtFormMdl);
  }

  private _getFomModelToEntityUpdateDto(resource: INgorResource<any, any, any, any, any>):
    (dto: EDto, model: UpdtFormMdl) => Promise<EUpdteDto> {
    const mappers = resource.mappers;
    if (mappers && mappers.formModelToUpdateDto) {
      return mappers.formModelToUpdateDto;
    }
    return (x: EDto, y: UpdtFormMdl) => Promise.resolve({ ...x as any, ...y as any });
  }
}
