import { Inject, Injectable } from '@angular/core';
import { INgorLocaleStore } from '../interfaces/locales';
import { NGOR_LOCALES } from '../tokens/locales.token';
import { NgorLocalesStore } from './locales.store';

@Injectable()
export class NgorLocalesService {
  private _store: NgorLocalesStore;
  private _locales: INgorLocaleStore;
  private _labels: { [key: string]: string };

  constructor(store: NgorLocalesStore, @Inject(NGOR_LOCALES) locales: INgorLocaleStore) {
    this._store = store;
    this._locales = locales;
  }

  public init(labels?: string[]) {
    this._store.init(this._locales)
      .subscribe(() => this._labels = labels ? this.translate(labels) : {});
  }

  public translate(key: string | string[], params?: any) {
    return this._store.translate(key, params);
  }

  public getLabel(key: string) {
    return this._labels[key] || '';
  }
}
