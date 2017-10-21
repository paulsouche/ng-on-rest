import { INgorGenericClient } from '../http/generic-client';
import { INgorResource } from '../resources/resource';

export interface INgorBaseComponent<Qry, Prms, ECrteDto, EUpdteDto, EDto> {
  resource: INgorResource<Qry, Prms, ECrteDto, EUpdteDto, EDto>;
  client: INgorGenericClient<Qry, Prms, ECrteDto, EUpdteDto, EDto>;
}
