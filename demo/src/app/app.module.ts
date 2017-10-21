import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import { Inject, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppComponent } from './components/app.component';
import { ILocaleStore } from './interfaces/locales';
import { NavigationModule } from './modules/navigation.module';
import { LOCALES } from './tokens/locales.token';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NavigationModule,
    TranslateModule.forRoot(),
  ],
})
export class AppModule {
  constructor(
    translateService: TranslateService,
    @Inject(LOCALE_ID) localeId: string,
    @Inject(LOCALES) locales: ILocaleStore) {
    switch (localeId) {
      case 'en':
        translateService.setTranslation('en', locales.en);
        registerLocaleData(localeEn);
        break;
      default:
        translateService.setTranslation('fr', locales.fr);
        registerLocaleData(localeFr);
        break;
    }
    translateService.setDefaultLang('fr');
    return translateService.use(localeId);
  }
}
