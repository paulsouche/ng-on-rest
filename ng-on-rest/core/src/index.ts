export { INgorBaseComponent } from './interfaces/components/base-component';
export { INgorEntityDetailComponent } from './interfaces/components/entity-detail-component';
export { INgorEntityStepDetailComponent } from './interfaces/components/entity-step-detail-component';
export { INgorListComponent } from './interfaces/components/list-component';
export { INgorResourceComponents } from './interfaces/components/resource-components';
export { INgorStepComponent } from './interfaces/components/step-component';

export { TNgorGenericClientFactory } from './interfaces/http/generic-client-factory';
export { INgorGenericClient } from './interfaces/http/generic-client';
export { TNgorGenericHandlerFactory } from './interfaces/http/generic-handler-factory';
export { INgorGenericHandler } from './interfaces/http/generic-handler';

export { INgorResourceListArgs } from './interfaces/resources/list/arguments';
export { INgorFilterParameter, INgorQueryFilter, INgorResourceListFilter } from './interfaces/resources/list/filter';
export { INgorResourceListPagination } from './interfaces/resources/list/pagination';
export { TNgorPaginationFunc, TNgorPaginationFuncCurry } from './interfaces/resources/list/pagination-func';
export { INgorResourceListParams } from './interfaces/resources/list/params';
export { TNgorQueryParamsFunc, TNgorQueryParamsFuncCurry } from './interfaces/resources/list/query-params-func';
export { INgorResourceListSort, TNGOR_SORT } from './interfaces/resources/list/sort';
export { INgorResourceMappers } from './interfaces/resources/resource-mappers';
export { IResourceRouteParams } from './interfaces/resources/resource-route-params';
export { INgorResource } from './interfaces/resources/resource';

export { NgorBaseComponent } from './components/base.component';
export { NgorGenericClient } from './models/http/generic-client';
export { NgorGenericHandler } from './models/http/generic-handler';
export { NgorResourceListFilter } from './models/resource/list/filter';
export { NgorResourceListPagination } from './models/resource/list/pagination';
export { ngorContentRangePaginationFuncFactory } from './models/resource/list/pagination-func-factory';
export { ngorFilterRangeSortQueryParamsFuncFactory } from './models/resource/list/query-params-func-factory';
export { NgorResourceListSort } from './models/resource/list/sort';
export { NgorPropertyPipe } from './pipes/property.pipe';
export { NgorResourceComponentsService } from './services/resource-components.service';
export { NGOR_DEBUG } from './tokens/debug.token';
export { NGOR_GENERIC_CLIENT_FACTORY } from './tokens/generic-client-factory.token';
export { NGOR_GENERIC_HANDLER_FACTORY } from './tokens/generic-handler-factory.token';
export { NGOR_RESOURCE_PAGINATION_FUNC } from './tokens/resource-pagination-func.token';
export { NGOR_RESOURCE_QUERY_PARAMS_FUNC } from './tokens/resource-query-params-func.token';
export { NGOR_RESOURCES } from './tokens/resources.token';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgorBaseComponent } from './components/base.component';
import { INgorResource } from './interfaces/resources/resource';
import { ngorGenericClientFactory } from './models/http/generic-client-factory';
import { ngorGenericHandlerFactory } from './models/http/generic-handler-factory';
import { NgorPropertyPipe } from './pipes/property.pipe';
import { NgorGenericClientService } from './services/generic-client-service';
import { NgorResourceListService } from './services/resource-list.service';
import { NgorResourceService } from './services/resource.service';
import { NGOR_DEBUG } from './tokens/debug.token';
import { NGOR_GENERIC_CLIENT_FACTORY } from './tokens/generic-client-factory.token';
import { NGOR_GENERIC_HANDLER_FACTORY } from './tokens/generic-handler-factory.token';
import { NGOR_RESOURCE_PAGINATION_FUNC } from './tokens/resource-pagination-func.token';
import { NGOR_RESOURCE_QUERY_PARAMS_FUNC } from './tokens/resource-query-params-func.token';
import { NGOR_RESOURCES } from './tokens/resources.token';

export interface INgorCoreModuleConfig {
  resources: Array<INgorResource<any, any, any, any, any>>;
  provideHttp?: Provider;
  provideGenericClientFactory?: Provider;
  provideGenericHandlerFactory?: Provider;
  provideQueryParamsFunc?: Provider;
  providePaginationFunc?: Provider;
  debug?: Provider;
}

const routes: Routes = [
  {
    component: NgorBaseComponent,
    path: ':resource',
  },
  {
    component: NgorBaseComponent,
    path: ':resource/:id',
  },
  {
    component: NgorBaseComponent,
    path: ':resource/:id/:step',
  },
];

@NgModule({
  declarations: [
    NgorBaseComponent,
    NgorPropertyPipe,
  ],
  exports: [
    NgorPropertyPipe,
    HttpClientModule,
    RouterModule,
  ],
  imports: [
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
})
export class NgorCoreModule {
  public static forChild(): ModuleWithProviders {
    return {
      ngModule: NgorCoreModule,
    };
  }

  public static forRoot(config: INgorCoreModuleConfig): ModuleWithProviders {
    return {
      ngModule: NgorCoreModule,
      providers: [
        NgorResourceService,
        NgorResourceListService,
        NgorGenericClientService,
        {
          provide: NGOR_RESOURCES,
          useValue: config.resources,
        },
        config.provideHttp
          ? config.provideHttp
          : HttpClient
        ,
        config.provideGenericHandlerFactory
          ? config.provideGenericHandlerFactory
          : {
            deps: [HttpClient],
            provide: NGOR_GENERIC_HANDLER_FACTORY,
            useFactory: ngorGenericHandlerFactory,
          },
        config.provideGenericClientFactory
          ? config.provideGenericClientFactory
          : {
            deps: [NGOR_GENERIC_HANDLER_FACTORY],
            provide: NGOR_GENERIC_CLIENT_FACTORY,
            useFactory: ngorGenericClientFactory,
          },
        config.provideQueryParamsFunc
          ? config.provideQueryParamsFunc
          : {
            provide: NGOR_RESOURCE_QUERY_PARAMS_FUNC,
            useValue: undefined,
          },
        config.providePaginationFunc
          ? config.providePaginationFunc
          : {
            provide: NGOR_RESOURCE_PAGINATION_FUNC,
            useValue: undefined,
          },
        config.debug
          ? config.debug
          : {
            provide: NGOR_DEBUG,
            useValue: false,
          },
      ],
    };
  }
}
