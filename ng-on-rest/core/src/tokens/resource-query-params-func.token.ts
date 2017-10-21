import { InjectionToken } from '@angular/core';
import { TNgorQueryParamsFuncCurry } from '../interfaces/resources/list/query-params-func';

export const NGOR_RESOURCE_QUERY_PARAMS_FUNC = new InjectionToken
  <TNgorQueryParamsFuncCurry>('ngorResourceQueryParamsFunc');
