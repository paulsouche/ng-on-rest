import { INgorResourceListSort, TNGOR_SORT } from '../../../interfaces/resources/list/sort';

export class NgorResourceListSort implements INgorResourceListSort {
  private _property: string;
  private _order: TNGOR_SORT;

  get order() {
    return this._order;
  }

  get property() {
    return this._property;
  }

  public toggle() {
    this._order = this._order === 'ASC' ? 'DESC' : 'ASC';
  }

  public setSortProperty(property: string) {
    this._property = property;
    this._order = 'DESC';
  }
}
