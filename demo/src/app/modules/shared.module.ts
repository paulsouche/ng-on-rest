import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-md';
import * as en from '../locales/en.json';
import * as fr from '../locales/fr.json';
import { navigatorLanguageFactory } from '../models/navigator-language.factory';
import { platformNavigatorFactory } from '../models/platform-navigator.factory';
import { LOCALES } from '../tokens/locales.token';
import { PLATFORM_NAVIGATOR } from '../tokens/platform-navigator.token';

@NgModule({
  exports: [
    CommonModule,
    TranslateModule,
    MarkdownModule,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MarkdownModule.forRoot(),
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
    {
      provide: LOCALES,
      useValue: { en, fr },
    },
  ],
})
export class SharedModule { }
