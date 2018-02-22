import { InjectionToken } from '@angular/core';
import { INgorLocaleStore } from '../interfaces/locales';

export const NGOR_DEFAULT_LOCALES = new InjectionToken<INgorLocaleStore>('ngorDefaultLocales');
