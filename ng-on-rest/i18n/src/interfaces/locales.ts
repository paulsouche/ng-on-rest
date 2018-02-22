export interface INgorlocaleKey {
  [localeKey: string]: string;
}

export interface INgorLocale {
  [localeNamespace: string]: INgorlocaleKey | string;
}

export interface INgorLocaleStore {
  [lng: string]: INgorLocale;
}
