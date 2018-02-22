import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { INgorLocaleStore } from '../interfaces/locales';

@Injectable()
export class NgorLocalesStore {
  private _translateService: TranslateService;
  private _locale: string;

  constructor(translateService: TranslateService, @Inject(LOCALE_ID) locale: string) {
    this._locale = locale;
    this._translateService = translateService;
  }

  public init(locales: INgorLocaleStore): Observable<any> {
    const translate = this._translateService;
    const locale = this._locale;
    if (locales[locale]) {
      translate.setTranslation(locale, locales[locale]);
    }
    translate.setTranslation('en', locales.en);
    translate.setDefaultLang('en');
    return translate.use(locale);
  }

  public translate(key: string | string[], params?: any) {
    return this._translateService.instant(key, params);
  }
}
