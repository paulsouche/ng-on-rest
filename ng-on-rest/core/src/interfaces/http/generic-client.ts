import { IResourceMethodStrict, Resource } from '@ngx-resource/core';
import { TNgorPaginationFunc } from '../resources/list/pagination-func';
import { INgorResourceListParams } from '../resources/list/params';
import { TNgorQueryParamsFunc } from '../resources/list/query-params-func';

export interface INgorGenericClient<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto> extends Resource {
  query: IResourceMethodStrict<Query, Query, Params, EntityDto[]>;
  get: IResourceMethodStrict<{ [idKey: string]: any }, Query, Params, EntityDto>;
  create?: IResourceMethodStrict<EntityCreateDto, Query, Params, EntityDto>;
  save?: IResourceMethodStrict<EntityUpdateDto, Query, Params, EntityDto>;
  delete?: IResourceMethodStrict<{ [idKey: string]: any }, Query, Params, null>;
  getIdPayload<T>(value: T): { [idKey: string]: T };
  queryParams?(params: INgorResourceListParams): Query;
  setQueryParamsFunc?(queryParamsFunc?: TNgorQueryParamsFunc): void;
  setPaginationFunc?(updatePaginationFunc?: TNgorPaginationFunc): void;
}
