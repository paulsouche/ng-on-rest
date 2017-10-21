import { IResourceMethodStrict } from '@ngx-resource/core';
import {
  INgorGenericClient,
  INgorResourceListParams,
  TNgorPaginationFunc,
  TNgorQueryParamsFunc,
} from 'ng-on-rest-core';

export interface IGenericClient<Qry, Prms, ECrteDto, EUpdteDto, EDto>
  extends INgorGenericClient<Qry, Prms, ECrteDto, EUpdteDto, EDto> {
  create: IResourceMethodStrict<ECrteDto, Qry, Prms, EDto>;
  save: IResourceMethodStrict<EUpdteDto, Qry, Prms, EDto>;
  delete: IResourceMethodStrict<{ [idKey: string]: any }, Qry, Prms, null>;
  queryParams(params: INgorResourceListParams): Qry;
  setQueryParamsFunc(queryParamsFunc?: TNgorQueryParamsFunc): void;
  setPaginationFunc(updatePaginationFunc?: TNgorPaginationFunc): void;
}
