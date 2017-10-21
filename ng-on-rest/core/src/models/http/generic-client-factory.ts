import { TNgorGenericHandlerFactory } from '../../interfaces/http/generic-handler-factory';
import { NgorGenericClient } from './generic-client';

export function ngorGenericClientFactory(handlerFactory: TNgorGenericHandlerFactory) {
  return (endPoint: string) => new NgorGenericClient(handlerFactory, endPoint);
}
