import { INgorResourceListArgs } from '../../../interfaces/resources/list/arguments';
import { INgorResourceListParams } from '../../../interfaces/resources/list/params';
import { TNgorQueryParamsFuncCurry } from '../../../interfaces/resources/list/query-params-func';

export function ngorFilterRangeSortQueryParamsFuncFactory(): TNgorQueryParamsFuncCurry {
  return (args: INgorResourceListArgs) =>
    (params: INgorResourceListParams) => ({
      filter: args.filter.getFilter(params.filterParams, params.filter).map((f) => JSON.stringify(f)),
      range: JSON.stringify(args.pagination.getRange(params.page, params.range)),
      sort: args.sort.property ? JSON.stringify([args.sort.property, args.sort.order]) : undefined,
    });
}
