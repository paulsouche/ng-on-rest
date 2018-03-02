import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { NgorI18nModule } from 'ng-on-rest-i18n';
import { MarkdownModule } from 'ngx-md';
import * as en from '../locales/en.json';
import * as fr from '../locales/fr.json';
import { navigatorLanguageFactory } from '../models/navigator-language.factory';
import { platformNavigatorFactory } from '../models/platform-navigator.factory';
import { PLATFORM_NAVIGATOR } from '../tokens/platform-navigator.token';

@NgModule({
  exports: [
    CommonModule,
    NgorI18nModule,
    MarkdownModule,
  ],
  imports: [
    CommonModule,
    NgorI18nModule.forChild(),
    MarkdownModule.forRoot(),
    NgorI18nModule.forRoot({
      rootLocales: { en, fr },
    }),
  ],
  providers: [
    {
      provide: PLATFORM_NAVIGATOR,
      useFactory: platformNavigatorFactory,
    },
    {
      deps: [PLATFORM_NAVIGATOR],
      provide: LOCALE_ID,
      useFactory: navigatorLanguageFactory,
    },
  ],
})
export class SharedModule { }
