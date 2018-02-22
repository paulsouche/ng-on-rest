// tslint:disable:max-classes-per-file
import { LOCALE_ID, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { INgorLocaleStore, NgorI18nModule, NgorLocalesService } from '.';

const defaultLocalesModule1: INgorLocaleStore = {
  en: {
    module1: {
      plop: 'quux',
    },
  },
};

const defaultLocalesModule2: INgorLocaleStore = {
  en: {
    module2: {
      plop: 'quux',
    },
  },
};

const rootLocales: INgorLocaleStore = {
  en: {
    foo: 'en bar',
  },
  fr: {
    foo: 'fr bar',
  },
};

@NgModule({
  imports: [NgorI18nModule.forChild({
    defaultLocales: defaultLocalesModule1,
  })],
})
class TestNgorI18nmodule1 { }

@NgModule({
  imports: [NgorI18nModule.forChild({
    defaultLocales: defaultLocalesModule2,
  })],
})
class TestNgorI18nmodule2 { }

describe('NgorI18nModule', () => {
  let service: NgorLocalesService;

  describe('Basic usage', () => {
    beforeEach(() => service = TestBed.configureTestingModule({
      imports: [
        NgorI18nModule.forRoot({
          rootLocales,
        }),
        TranslateModule.forRoot(),
        TestNgorI18nmodule1,
      ],
    }).get(NgorLocalesService));

    it('Should translate locales store', () => {
      expect(service.translate('foo')).toBe('en bar');
    });

    it('Should translate default locales', () => {
      expect(service.translate('module1.plop')).toBe('quux');
    });
  });

  describe('When I override default child locales', () => {
    beforeEach(() => service = TestBed.configureTestingModule({
      imports: [
        NgorI18nModule.forRoot({
          rootLocales: {
            ...rootLocales,
            en: {
              ...rootLocales.en,
              module1: {
                plop: 'zip',
              },
            },
          },
        }),
        TranslateModule.forRoot(),
        TestNgorI18nmodule1,
      ],
    }).get(NgorLocalesService));

    it('Should translate overriden default locales', () => {
      expect(service.translate('module1.plop')).toBe('zip');
    });
  });

  describe('When I provide an other locale', () => {
    beforeEach(() => service = TestBed.configureTestingModule({
      imports: [
        NgorI18nModule.forRoot({
          rootLocales,
        }),
        TranslateModule.forRoot(),
        TestNgorI18nmodule1,
      ],
      providers: [
        { provide: LOCALE_ID, useValue: 'fr' },
      ],
    }).get(NgorLocalesService));

    it('Should use provided locale', () => {
      expect(service.translate('foo')).toBe('fr bar');
      expect(service.translate('module1.plop')).toBe('quux');
    });
  });

  describe('When I need to translate static labels', () => {
    beforeEach(() => service = TestBed.configureTestingModule({
      imports: [
        NgorI18nModule.forRoot({
          rootLabels: ['foo'],
          rootLocales,
        }),
        TranslateModule.forRoot(),
        TestNgorI18nmodule1,
      ],
    }).get(NgorLocalesService));

    it('Should translate it', () => {
      expect(service.getLabel('foo')).toBe('en bar');
    });

    it('Should not translate non static labels', () => {
      expect(service.getLabel('module1.plop')).toBe('');
    });
  });

  describe('When I import multiple child modules', () => {
    beforeEach(() => service = TestBed.configureTestingModule({
      imports: [
        NgorI18nModule.forRoot({
          rootLocales,
        }),
        TranslateModule.forRoot(),
        TestNgorI18nmodule1,
        TestNgorI18nmodule2,
      ],
    }).get(NgorLocalesService));

    it('Should provide all locales', () => {
      expect(service.translate('module1.plop')).toBe('quux');
      expect(service.translate('module2.plop')).toBe('quux');
    });
  });
});
