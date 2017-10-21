import { InjectionToken } from '@angular/core';
import { TNgorGenericHandlerFactory } from '../interfaces/http/generic-handler-factory';

export const NGOR_GENERIC_HANDLER_FACTORY = new InjectionToken<TNgorGenericHandlerFactory>('ngorGenericHandlerFactory');
