import { InjectionToken } from '@angular/core';
import { INgorResource } from '../interfaces/resources/resource';

export const NGOR_RESOURCES = new InjectionToken<Array<INgorResource<any, any, any, any, any>>>('ngorResources');
