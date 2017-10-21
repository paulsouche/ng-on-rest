import { Injectable } from '@angular/core';
import { INgorGenericClient, INgorResource, NgorResourceComponentsService } from 'ng-on-rest-core';
import { ICreateResponse } from '../interfaces/create-response';
import { INgorSubEntitiesMap } from '../interfaces/sub-entities-map';

// see https://github.com/Microsoft/TypeScript/issues/10727
// see https://github.com/Microsoft/TypeScript/pull/13288
@Injectable()
export class NgorCreateStepService<
  FormModel,
  Query,
  Params,
  EntityCreateDto,
  EntityUpdateDto,
  EntityDto,
  ChildEntityFormModel,
  ChildEntityCreateDto,
  ChildEntityDto> {
  private _createEntityValue: any = {};
  private _formValue: any = {};
  private _resourceComponentsService: NgorResourceComponentsService<
    Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>;
  private _client: INgorGenericClient<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>;
  private _resource: INgorResource<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>;
  private _childClients: {
    [resourceName: string]: INgorGenericClient<any, any, ChildEntityCreateDto, any, ChildEntityDto>,
  };
  private _childResources: {
    [resourceName: string]: INgorResource<any, any, ChildEntityCreateDto, any, ChildEntityDto>,
  };
  private _subEntitiesMap: Array<INgorSubEntitiesMap<EntityDto, ChildEntityCreateDto>> | undefined;

  constructor(resourceComponentsService: NgorResourceComponentsService<
    Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>) {
    this._resourceComponentsService = resourceComponentsService;
    this._client = resourceComponentsService.client;
    this._resource = resourceComponentsService.resource;
  }

  public setSubEntitiesMap(subEntitiesMap: Array<INgorSubEntitiesMap<EntityDto, ChildEntityCreateDto>> | undefined) {
    const resourceComponentsService = this._resourceComponentsService;
    this._subEntitiesMap = subEntitiesMap;
    this._childClients = {};
    this._childResources = {};
    if (Array.isArray(subEntitiesMap)) {
      subEntitiesMap.forEach((se) => {
        const resourceName = se.resourceName;
        const resource = resourceComponentsService
          .getBindedResource<any, any, ChildEntityCreateDto, any, ChildEntityDto>(resourceName);
        if (!resource) {
          throw new Error(`NgorCreateStepService: Cannot find resource for ${resourceName}`);
        }
        this._childClients[resourceName] = resourceComponentsService.getBindedResourceClient(resourceName);
        this._childResources[resourceName] = resource;
      });
    }
  }

  public updateValue(value: FormModel): Promise<EntityCreateDto> {
    value = this._formValue = { ...this._formValue, ...value as any };
    return this._getFormModelToCreateDtoMapper(this._resource)(value)
      .then((e: any) => this._createEntityValue = {
        ...this._createEntityValue,
        ...e,
      });
  }

  public createEntity(createEntityDto: EntityCreateDto): Promise<ICreateResponse<EntityDto, ChildEntityDto>> {
    const createDto = { ...createEntityDto as any };
    const subEntitiesMap = this._subEntitiesMap;
    const mainClient = this._client;

    const createPromise = new Promise<ICreateResponse<EntityDto, any>>((res, rej) => setTimeout(() => mainClient.create
      ? mainClient.create(createDto)
        .then((createdEntity) => res({ createdEntity }))
        .catch((err) => rej(err))
      : rej(new Error('NgorCreateStepService: please implements create method of INgorGenericClient'))));

    if (subEntitiesMap && subEntitiesMap.length) {
      const subEntitiesCreateDtos: { [property: string]: ChildEntityFormModel | ChildEntityFormModel[] } = {};
      const createdChildEntities: { [property: string]: ChildEntityDto | ChildEntityDto[] } = {};
      const createPromises = (createdEntity: EntityDto) => subEntitiesMap
        .reduce((p, n) => {
          const { bind, property, resourceName } = n;
          const client = this._childClients[resourceName];
          const resource = this._childResources[resourceName];
          const mapper = this._getFormModelToCreateDtoMapper(resource);
          const subEntitiesDto = subEntitiesCreateDtos[property];
          if (Array.isArray(subEntitiesDto)) {
            p.push(Promise.all(subEntitiesDto.map((se) => mapper(se)
              .then((childCreateDto) => client.create
                ? client.create(bind(createdEntity, childCreateDto))
                : Promise
                  .reject(new Error('NgorCreateStepService: please implements create method of INgorGenericClient')))))
              .then((subEntities) => createdChildEntities[property] = subEntities));
          } else {
            p.push(mapper(subEntitiesDto)
              .then((childCreateDto) => client.create
                ? client.create(bind(createdEntity, childCreateDto))
                : Promise
                  .reject(new Error('NgorCreateStepService: please implements create method of INgorGenericClient')))
              .then((subEntity) => createdChildEntities[property] = subEntity));
          }
          return p;
        }, [] as Array<Promise<{}>>);

      subEntitiesMap.forEach((se) => {
        const property = se.property;
        subEntitiesCreateDtos[property] = createDto[property];
        createDto[property] = undefined;
      });

      return createPromise
        .then(({ createdEntity }) => Promise
          .all(createPromises(createdEntity))
          .then(() => ({
            createdChildEntities,
            createdEntity,
          })));
    }
    return createPromise;
  }

  public getEntityValue(): EntityCreateDto {
    return { ...this._createEntityValue };
  }

  public getFormValue(): FormModel {
    return { ...this._formValue };
  }

  private _getFormModelToCreateDtoMapper<FormMdl, ECrteDto>(resource: INgorResource<any, any, ECrteDto, any, any>):
    (model: FormMdl) => Promise<ECrteDto> {
    const mappers = resource.mappers;
    if (mappers && mappers.formModelToCreateDto) {
      return mappers.formModelToCreateDto;
    }
    return (x: FormMdl) => Promise.resolve(x as any as ECrteDto);
  }
}
