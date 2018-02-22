import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { INgorLocaleStore } from './interfaces/locales';
import { ngorLocalesFactory } from './models/locales.factory';
import { NgorLocalesService } from './models/locales.service';
import { NgorLocalesStore } from './models/locales.store';
import { NGOR_DEFAULT_LOCALES } from './tokens/default-locales.token';
import { NGOR_LABELS } from './tokens/labels.token';
import { NGOR_LOCALES } from './tokens/locales.token';
import { NGOR_ROOT_LOCALES } from './tokens/root-locales.token';

export * from './interfaces/locales';
export * from './models/locales.factory';
export * from './models/locales.service';
export * from './tokens/default-locales.token';
export * from './tokens/locales.token';
export * from './tokens/root-locales.token';

export interface INgorI18nChildModuleConfig {
  defaultLocales?: INgorLocaleStore;
}

export interface INgorI18nRootModuleConfig {
  rootLocales?: INgorLocaleStore;
  rootLabels?: string[];
}

@NgModule({
  exports: [
    TranslateModule,
  ],
  imports: [
    TranslateModule.forChild({
      isolate: true,
    }),
  ],
})
export class NgorI18nModule {
  public static forChild(config: INgorI18nChildModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: NgorI18nModule,
      providers: [
        NgorLocalesService,
        NgorLocalesStore,
        {
          multi: true,
          provide: NGOR_DEFAULT_LOCALES,
          useValue: config.defaultLocales || {},
        },
      ],
    };
  }

  public static forRoot(config: INgorI18nRootModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: NgorI18nModule,
      providers: [
        NgorLocalesService,
        NgorLocalesStore,
        {
          provide: NGOR_ROOT_LOCALES,
          useValue: config.rootLocales || {},
        },
        {
          provide: NGOR_LABELS,
          useValue: config.rootLabels,
        },
        {
          deps: [NGOR_DEFAULT_LOCALES, NGOR_ROOT_LOCALES],
          provide: NGOR_LOCALES,
          useFactory: ngorLocalesFactory,
        },
      ],
    };
  }

  constructor(localesService: NgorLocalesService, @Inject(NGOR_LABELS) labels: string[]) {
    localesService.init(labels);
  }
}
