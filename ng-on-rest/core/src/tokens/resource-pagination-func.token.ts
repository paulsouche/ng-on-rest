import { InjectionToken } from '@angular/core';
import { TNgorPaginationFuncCurry } from '../interfaces/resources/list/pagination-func';

export const NGOR_RESOURCE_PAGINATION_FUNC = new InjectionToken
  <TNgorPaginationFuncCurry>('ngorResourcePaginationFunc');
