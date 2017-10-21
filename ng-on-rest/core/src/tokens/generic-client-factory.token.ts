import { InjectionToken } from '@angular/core';
import { TNgorGenericClientFactory } from '../interfaces/http/generic-client-factory';

export const NGOR_GENERIC_CLIENT_FACTORY =
  new InjectionToken<TNgorGenericClientFactory<any, any, any, any, any>>('ngorGenericClientFactory');
