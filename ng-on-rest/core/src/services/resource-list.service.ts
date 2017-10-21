import { Inject, Injectable } from '@angular/core';
import { INgorResourceListArgs } from '../interfaces/resources/list/arguments';
import { TNgorPaginationFunc, TNgorPaginationFuncCurry } from '../interfaces/resources/list/pagination-func';
import { TNgorQueryParamsFunc, TNgorQueryParamsFuncCurry } from '../interfaces/resources/list/query-params-func';
import { NgorResourceListFilter } from '../models/resource/list/filter';
import { NgorResourceListPagination } from '../models/resource/list/pagination';
import { NgorResourceListSort } from '../models/resource/list/sort';
import { NGOR_RESOURCE_PAGINATION_FUNC } from '../tokens/resource-pagination-func.token';
import { NGOR_RESOURCE_QUERY_PARAMS_FUNC } from '../tokens/resource-query-params-func.token';

@Injectable()
export class NgorResourceListService {
  private _queryParamsFuncCurry: TNgorQueryParamsFuncCurry;
  private _paginationFuncCurry: TNgorPaginationFuncCurry;

  constructor(
    @Inject(NGOR_RESOURCE_QUERY_PARAMS_FUNC) queryParamsFuncCurry: TNgorQueryParamsFuncCurry,
    @Inject(NGOR_RESOURCE_PAGINATION_FUNC) paginationFuncCurry: TNgorPaginationFuncCurry) {
    this._queryParamsFuncCurry = queryParamsFuncCurry;
    this._paginationFuncCurry = paginationFuncCurry;
  }

  public createResourcePagination() {
    return new NgorResourceListPagination();
  }

  public createResourceFilter() {
    return new NgorResourceListFilter();
  }

  public createResourecSort() {
    return new NgorResourceListSort();
  }

  public getQueryParamsFunc(args: INgorResourceListArgs): TNgorQueryParamsFunc | undefined {
    if (this._queryParamsFuncCurry) {
      return this._queryParamsFuncCurry(args);
    }
    return;
  }

  public getPaginationFunc(pagination: NgorResourceListPagination): TNgorPaginationFunc | undefined {
    if (this._paginationFuncCurry) {
      return this._paginationFuncCurry(pagination);
    }
    return;
  }
}
