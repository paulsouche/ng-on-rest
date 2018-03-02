import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import { Inject, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './components/app.component';
import { NavigationModule } from './modules/navigation.module';

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
  constructor(@Inject(LOCALE_ID) localeId: string) {
    switch (localeId) {
      case 'en':
        registerLocaleData(localeEn);
        break;
      default:
        registerLocaleData(localeFr);
        break;
    }
  }
}
