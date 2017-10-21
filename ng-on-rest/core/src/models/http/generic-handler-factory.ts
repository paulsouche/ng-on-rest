import { HttpClient } from '@angular/common/http';
import { NgorGenericHandler } from './generic-handler';

export function ngorGenericHandlerFactory(http: HttpClient) {
  return () => new NgorGenericHandler(http);
}
