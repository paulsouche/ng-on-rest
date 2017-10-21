import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import {
  NGOR_GENERIC_CLIENT_FACTORY,
  NGOR_RESOURCE_PAGINATION_FUNC,
  NGOR_RESOURCE_QUERY_PARAMS_FUNC,
  ngorContentRangePaginationFuncFactory,
  NgorCoreModule,
  ngorFilterRangeSortQueryParamsFuncFactory,
  NgorGenericClient,
  NgorResourceComponentsService,
  NgorResourceListFilter,
  NgorResourceListPagination,
  NgorResourceListSort,
  TNgorGenericClientFactory,
  TNgorPaginationFuncCurry,
  TNgorQueryParamsFuncCurry,
} from './';

describe('NgorCoreModule', () => {
  it('Should not provide NgorResourceComponentsService in root injector as 1 instance needed per component', () => {
    expect(() => TestBed.configureTestingModule({
      imports: [NgorCoreModule.forRoot({
        resources: [],
      })],
    }).get(NgorResourceComponentsService)).toThrow();
  });

  describe('When client do not provide queryparams & pagination functions', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NgorCoreModule.forRoot({
            resources: [],
          }),
        ],
      });
    });

    it('Should use default generic client with no pagination and query params', inject([
      NGOR_GENERIC_CLIENT_FACTORY,
    ], (factory: TNgorGenericClientFactory<any, any, any, any, any>) => {
      const client = factory('/endpoint') as NgorGenericClient<any, any, any, any, any>;
      expect(client.queryParams({
        filter: 'filter',
        filterParams: [],
        page: 1,
        range: 5,
      })).toEqual({} as any);
    }));
  });

  describe('When client provides default queryparams & pagination functions', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NgorCoreModule.forRoot({
            providePaginationFunc: {
              provide: NGOR_RESOURCE_PAGINATION_FUNC,
              useFactory: ngorContentRangePaginationFuncFactory,
            },
            provideQueryParamsFunc: {
              provide: NGOR_RESOURCE_QUERY_PARAMS_FUNC,
              useFactory: ngorFilterRangeSortQueryParamsFuncFactory,
            },
            resources: [],
          }),
        ],
      });
    });

    it('Should be able to parse content-range header', inject([
      NGOR_RESOURCE_PAGINATION_FUNC,
    ], (factory: TNgorPaginationFuncCurry) => {
      const pagination = new NgorResourceListPagination();
      const headers = new HttpHeaders({
        'content-range': 'bytes 1-5/30',
      });
      const response = new HttpResponse({
        headers,
      });
      factory(pagination)(response);
      expect(pagination.start).toBe(1);
      expect(pagination.end).toBe(5);
      expect(pagination.total).toBe(30);
    }));

    it('Should be able to provide query params', inject([
      NGOR_RESOURCE_QUERY_PARAMS_FUNC,
    ], (factory: TNgorQueryParamsFuncCurry) => {
      expect(factory({
        filter: new NgorResourceListFilter(),
        pagination: new NgorResourceListPagination(),
        sort: new NgorResourceListSort(),
      })
        ({
          filter: 'filter',
          filterParams: [],
          page: 1,
          range: 5,
        }))
        .toEqual({
          filter: ['{}'],
          range: '[0,4]',
          sort: undefined,
        });
    }));
  });
});
