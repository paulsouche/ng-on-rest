import { Optional } from '@angular/core';
import {
  IResourceMethodStrict,
  Resource,
  ResourceAction,
  ResourceParams,
  ResourceRequestMethod,
} from '@ngx-resource/core';
import { INgorGenericClient } from '../../interfaces/http/generic-client';
import { INgorGenericHandler } from '../../interfaces/http/generic-handler';
import { TNgorGenericHandlerFactory } from '../../interfaces/http/generic-handler-factory';
import { TNgorPaginationFunc } from '../../interfaces/resources/list/pagination-func';
import { INgorResourceListParams } from '../../interfaces/resources/list/params';
import { TNgorQueryParamsFunc } from '../../interfaces/resources/list/query-params-func';

@ResourceParams()
export class NgorGenericClient<Qry, Prms, ECrteDto, EUpdteDto, EDto extends { id: any }> extends Resource
  implements INgorGenericClient<Qry, Prms, ECrteDto, EUpdteDto, EDto> {

  @ResourceAction({
    isArray: true,
  })
  public query: IResourceMethodStrict<Qry, Qry, Prms, EDto[]>;

  @ResourceAction({
    path: '/{!id}',
  })
  public get: IResourceMethodStrict<{ id: any }, Qry, Prms, EDto>;

  @ResourceAction({
    method: ResourceRequestMethod.Post,
  })
  public create: IResourceMethodStrict<ECrteDto, Qry, Prms, EDto>;

  @ResourceAction({
    method: ResourceRequestMethod.Put,
    path: '/{!id}',
  })
  public save: IResourceMethodStrict<EUpdteDto, Qry, Prms, EDto>;

  @ResourceAction({
    method: ResourceRequestMethod.Delete,
    path: '/{!id}',
  })
  public delete: IResourceMethodStrict<{ id: any }, Qry, Prms, null>;

  private _queryParamsFunc: TNgorQueryParamsFunc | undefined;
  private _handler: INgorGenericHandler;

  constructor(handlerFactory: TNgorGenericHandlerFactory, @Optional() path: string = '') {
    const handler = handlerFactory();
    super(handler);
    this._handler = handler;
    this.$setUrl(path);
  }

  public getIdPayload(entityId: any) {
    return { id: entityId };
  }

  public queryParams(params: INgorResourceListParams) {
    const queryParamsFunc = this._queryParamsFunc;
    if (typeof queryParamsFunc === 'function') {
      return queryParamsFunc(params);
    }
    return {} as any;
  }

  public setQueryParamsFunc(func?: TNgorQueryParamsFunc) {
    this._queryParamsFunc = func;
  }

  public setPaginationFunc(func?: TNgorPaginationFunc) {
    const handler = this._handler;
    if (handler.setUpdatePaginationFunc) {
      handler.setUpdatePaginationFunc(func);
    }
  }
}
