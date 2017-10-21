import {
  NgorGenericClient,
  NgorGenericHandler,
  NgorResourceComponentsService,
  NgorResourceListFilter,
  NgorResourceListPagination,
  NgorResourceListSort,
  // tslint:disable-next-line:no-implicit-dependencies
} from 'ng-on-rest-core';

export const spyNgorGenericClient = jasmine
  .createSpyObj<NgorGenericClient<any, any, any, any, any>>('spyNgorGenericClient', [
    'query',
    'get',
    'create',
    'save',
    'getIdPayload',
    'queryParams',
    'setQueryParamsFunc',
    'setPaginationFunc',
  ]);

export const spyNgorGenericHandler = jasmine
  .createSpyObj<NgorGenericHandler>('spyNgorGenericHandler', [
    'setUpdatePaginationFunc',
  ]);

export const spyNgorResourceListFilter = jasmine
  .createSpyObj<NgorResourceListFilter>('spyNgorResourceListFilter', [
    'getFilter',
  ]);

export const spyNgorResourceListPagination = jasmine
  .createSpyObj<NgorResourceListPagination>('spyNgorResourceListPagination', [
    'getRange',
    'clear',
  ]);

export const spyNgorResourceListSort = jasmine
  .createSpyObj<NgorResourceListSort>('spyNgorResourceListSort', [
    'toggle',
    'setSortProperty',
  ]);

export const spyNgorResourceComponentsService = jasmine
  .createSpyObj<NgorResourceComponentsService<any, any, any, any, any>>('spyNgorResourceComponentsService', [
    'createComponent',
    'initResourceList',
  ]);

Object.defineProperty(spyNgorResourceComponentsService, 'client', {
  configurable: false,
  enumerable: true,
  get: () => spyNgorGenericClient,
});

spyNgorResourceComponentsService.initResourceList.and.returnValue({
  filter: spyNgorResourceListFilter,
  pagination: spyNgorResourceListPagination,
  sort: spyNgorResourceListSort,
});
