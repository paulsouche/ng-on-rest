import { HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';
import {
  INgorResourceListArgs,
  NGOR_GENERIC_CLIENT_FACTORY,
  NGOR_RESOURCE_PAGINATION_FUNC,
  NGOR_RESOURCE_QUERY_PARAMS_FUNC,
  ngorContentRangePaginationFuncFactory,
  NgorCoreModule,
  ngorFilterRangeSortQueryParamsFuncFactory,
  NgorGenericClient,
  NgorResourceListFilter,
  NgorResourceListPagination,
  NgorResourceListSort,
  TNgorGenericClientFactory,
  TNgorPaginationFuncCurry,
  TNgorQueryParamsFuncCurry,
} from '../..';

describe('NgorGenericClientFactory', () => {
  let factory: TNgorGenericClientFactory<any, any, any, any, any>;
  let client: NgorGenericClient<any, any, any, any, any>;
  const listModels: INgorResourceListArgs = {
    filter: new NgorResourceListFilter(),
    pagination: new NgorResourceListPagination(),
    sort: new NgorResourceListSort(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
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

    factory = TestBed.get(NGOR_GENERIC_CLIENT_FACTORY);
  });

  describe('As a list component', () => {
    beforeEach(inject([
      NGOR_RESOURCE_PAGINATION_FUNC,
      NGOR_RESOURCE_QUERY_PARAMS_FUNC,
    ], (paginationFuncCurry: TNgorPaginationFuncCurry, queryParamsFuncCurry: TNgorQueryParamsFuncCurry) => {
      client = factory('endpoint/entities') as NgorGenericClient<any, any, any, any, any>;
      client.setQueryParamsFunc(queryParamsFuncCurry(listModels));
      client.setPaginationFunc(paginationFuncCurry(listModels.pagination));
    }));

    describe('When it needs list query params', () => {
      it('Should produce them', () => {
        expect(client.queryParams({
          filter: 'filter',
          filterParams: [{ key: 'id' }],
          page: 1,
          range: 10,
        })).toEqual({
          filter: ['{"id":"filter"}'],
          range: '[0,9]',
          sort: undefined,
        });
      });
    });

    describe('When it use multiple filters', () => {
      it('Should produce queryParams filters', () => {
        expect(client.queryParams({
          filter: 'filter otherfilter',
          filterParams: [{ key: 'id' }],
          page: 1,
          range: 10,
        })).toEqual({
          filter: ['{"id":"filter"}', '{"id":"otherfilter"}'],
          range: '[0,9]',
          sort: undefined,
        });
      });
    });

    describe('When it use nested properties & map filters', () => {
      it('Should produce queryParams filters', () => {
        expect(client.queryParams({
          filter: 'filter',
          filterParams: [{ key: 'attributes.prop', map: (search) => search.toUpperCase() }],
          page: 1,
          range: 10,
        })).toEqual({
          filter: ['{"attributes":{"prop":"FILTER"}}'],
          range: '[0,9]',
          sort: undefined,
        });
      });
    });

    describe('When it set sort property', () => {
      beforeEach(() => listModels.sort.setSortProperty('id'));

      it('Should modify returned queryParams', () => {
        expect(client.queryParams({
          filter: 'filter',
          filterParams: [],
          page: 1,
          range: 10,
        })).toEqual({
          filter: ['{}'],
          range: '[0,9]',
          sort: '["id","DESC"]',
        });
      });

      describe('And it toggle sort', () => {
        beforeEach(() => listModels.sort.toggle());

        it('Should modify returned queryParams', () => {
          expect(client.queryParams({
            filter: 'filter',
            filterParams: [],
            page: 1,
            range: 10,
          })).toEqual({
            filter: ['{}'],
            range: '[0,9]',
            sort: '["id","ASC"]',
          });
        });
      });
    });

    describe('When it query entities', () => {
      beforeEach(async(() => {
        listModels.pagination.clear();
        client.query();
      }));

      beforeEach(async(() => {
        const httpBackend: HttpTestingController = TestBed.get(HttpTestingController);
        const entitiesRequest = httpBackend.expectOne('endpoint/entities');

        entitiesRequest.flush([], {
          headers: new HttpHeaders({
            'content-range': 'bytes 1-5/30',
            'content-type': 'application/json',
          }),
        });

        httpBackend.verify();
      }));

      it('Should update pagination', () => {
        expect(listModels.pagination.start).toBe(1);
        expect(listModels.pagination.end).toBe(5);
        expect(listModels.pagination.total).toBe(30);
        expect(listModels.pagination.pages).toBe(6);
        expect(listModels.pagination.getRange(3, 5)).toEqual([10, 14]);
      });
    });
  });
});
