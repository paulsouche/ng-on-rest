import { INgorResourceListArgs, INgorResourceListParams, TNgorQueryParamsFuncCurry } from 'ng-on-rest-core';

export function queryParamsFuncFactory(): TNgorQueryParamsFuncCurry {
  return (args: INgorResourceListArgs) =>
    (params: INgorResourceListParams) => {
      const filter: { [key: string]: string } = {};
      const [_start, _end] = args.pagination.getRange(params.page, params.range);
      const _order = args.sort.order || 'DESC';
      const _sort = args.sort.property || 'id';
      if (params.filter) {
        params.filterParams.forEach((p) => filter[p.key] = params.filter);
      }
      return {
        ...filter,
        _end: _end + 1,
        _order,
        _sort,
        _start,
      };
    };
}
