import { INgorLocaleStore } from '../interfaces/locales';

export function ngorLocalesFactory(defaultLocales: INgorLocaleStore[], rootLocales: INgorLocaleStore)
  : INgorLocaleStore {
  return defaultLocales.concat(rootLocales)
    .reduce((locales, store) => {
      Object.keys(store).forEach((k) => {
        if (locales.indexOf(k) < 0) {
          locales.push(k);
        }
      });
      return locales;
    }, [] as string[])
    .reduce((store: INgorLocaleStore, l: string) => {
      store[l] = {
        ...defaultLocales.reduce((p, n) => ({ ...p, ...n[l] }), {}),
        ...rootLocales[l],
      };
      return store;
    }, {});
}
