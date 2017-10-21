import { Inject, Injectable } from '@angular/core';
import { INgorGenericClient } from '../interfaces/http/generic-client';
import { TNgorGenericClientFactory } from '../interfaces/http/generic-client-factory';
import { INgorResource } from '../interfaces/resources/resource';
import { NGOR_GENERIC_CLIENT_FACTORY } from '../tokens/generic-client-factory.token';
import { NGOR_RESOURCES } from '../tokens/resources.token';

@Injectable()
export class NgorGenericClientService {
  private _resourceClients: { [resource: string]: INgorGenericClient<any, any, any, any, any> } = {};
  private _factory: TNgorGenericClientFactory<any, any, any, any, any>;

  /* tslint:disable:space-within-parens */
  constructor(
    @Inject(NGOR_GENERIC_CLIENT_FACTORY) factory: TNgorGenericClientFactory<any, any, any, any, any>,
    @Inject(NGOR_RESOURCES) resources: Array<INgorResource<any, any, any, any, any>>) {
    this._factory = factory;
    resources.forEach((r) => this.addResourceClient(r));
  }
  /* tslint:enable:space-within-parens */

  public addResourceClient<Qry, Prms, ECrteDto, EUpdteDto, EDto>(
    resource: INgorResource<Qry, Prms, ECrteDto, EUpdteDto, EDto>): void {
    this._resourceClients[resource.name] = this._factory(`${resource.endPoint}/${resource.name}`);
  }

  public getResourceClient<Qry, Prms, ECrteDto, EUpdteDto, EDto>(resourceName: string)
    : INgorGenericClient<Qry, Prms, ECrteDto, EUpdteDto, EDto> {
    return this._resourceClients[resourceName];
  }
}
