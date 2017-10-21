import {
  INgorFilterParameter,
  INgorQueryFilter,
  INgorResourceListFilter,
} from '../../../interfaces/resources/list/filter';

export class NgorResourceListFilter implements INgorResourceListFilter {
  public getFilter(filterParams: INgorFilterParameter[] = [], search: string = '') {
    return search.split(' ')
      .map((srchPrt) => {
        const queryFilter: INgorQueryFilter = {};
        return filterParams
          .reduce((filter, param) => {
            param.key
              .split('.')
              .reduce((prvs, key) => param.key.endsWith(key)
                ? prvs[key] = param.map ? param.map(srchPrt) : srchPrt
                : prvs[key] = {}
              , filter);
            return filter;
          }, queryFilter);
      });
  }
}
