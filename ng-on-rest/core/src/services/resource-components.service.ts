import { Injectable, ViewContainerRef, ViewRef } from '@angular/core';
import { INgorEntityDetailComponent } from '../interfaces/components/entity-detail-component';
import { INgorStepComponent } from '../interfaces/components/step-component';
import { INgorGenericClient } from '../interfaces/http/generic-client';
import { INgorResourceListArgs } from '../interfaces/resources/list/arguments';
import { INgorResource } from '../interfaces/resources/resource';
import { IResourceRouteParams } from '../interfaces/resources/resource-route-params';
import { NgorGenericClientService } from './generic-client-service';
import { NgorResourceListService } from './resource-list.service';
import { NgorResourceService } from './resource.service';

@Injectable()
export class NgorResourceComponentsService<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto> {
  private _resourceService: NgorResourceService;
  private _genericClientService: NgorGenericClientService;
  private _listService: NgorResourceListService;
  private _resource: INgorResource<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>;
  private _client: INgorGenericClient<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>;
  private _entity: EntityDto;
  private _step: string;

  constructor(
    genericClientService: NgorGenericClientService,
    resourceService: NgorResourceService,
    listService: NgorResourceListService) {
    this._resourceService = resourceService;
    this._genericClientService = genericClientService;
    this._listService = listService;
  }

  get resource() {
    return this._resource;
  }

  get client() {
    return this._client;
  }

  get entity() {
    return this._entity;
  }

  get step() {
    return this._step;
  }

  get hasCreateComponent() {
    return !!this._resource.components.create;
  }

  get hasDetailComponent() {
    return !!this._resource.components.detail;
  }

  public createComponent(params: IResourceRouteParams, viewContainerRef: ViewContainerRef): Promise<ViewRef> {
    const resourceService = this._resourceService;

    const resource = resourceService.getResource<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>(params);
    if (!resource) {
      return Promise.reject(new Error(`No resource for ${params.resource}`));
    }
    this._resource = resource;

    const componentFactory = resourceService.getResourceComponent(params);
    if (!componentFactory) {
      return Promise.reject(new Error(`No component for ${params.resource} step ${params.step} id ${params.id}`));
    }

    const client = this._client = this._genericClientService
      .getResourceClient<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>(resource.name);

    const id = resourceService.getId(params);
    const step = resourceService.getStep(params);
    const promise: Promise<EntityDto | void> = id ? client.get(client.getIdPayload(id)) : Promise.resolve();
    return promise.then((entity) => {
      const component = componentFactory.create(viewContainerRef.parentInjector);
      const instance = component.instance;
      instance.client = client;
      if (entity) {
        (
          instance as INgorEntityDetailComponent<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>
        ).entity = this._entity = entity;
      }
      if (step) {
        (
          instance as INgorStepComponent<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>
        ).step = this._step = step;
      }
      instance.resource = resource;
      viewContainerRef.clear();
      return viewContainerRef.insert(component.hostView);
    });
  }

  public initResourceList(): INgorResourceListArgs {
    const client = this._client;
    const listService = this._listService;
    const pagination = listService.createResourcePagination();
    const filter = listService.createResourceFilter();
    const sort = listService.createResourecSort();

    if (client.setQueryParamsFunc) {
      client.setQueryParamsFunc(listService.getQueryParamsFunc({
        filter,
        pagination,
        sort,
      }));
    }

    if (client.setPaginationFunc) {
      client.setPaginationFunc(listService.getPaginationFunc(pagination));
    }

    return {
      filter,
      pagination,
      sort,
    };
  }

  public getBindedResourceClient<Qry, Prms, ECrteDto, EUpdteDto, EDto>(resourceName: string)
    : INgorGenericClient<Qry, Prms, ECrteDto, EUpdteDto, EDto> {
    return this._genericClientService.getResourceClient(resourceName);
  }

  public getBindedResource<Qry, Prms, ECrteDto, EUpdteDto, EDto>(resourceName: string)
    : INgorResource<Qry, Prms, ECrteDto, EUpdteDto, EDto> | undefined {
    return this._resourceService.getResource({ resource: resourceName });
  }
}
