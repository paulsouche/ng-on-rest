import { INgorGenericClient } from './generic-client';

export type TNgorGenericClientFactory<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto> =
  (endPoint: string) => INgorGenericClient<Query, Params, EntityCreateDto, EntityUpdateDto, EntityDto>;
