import { HttpResponse } from '@angular/common/http';
import { INgorResourceListPagination } from '../../../interfaces/resources/list/pagination';
import { TNgorPaginationFuncCurry } from '../../../interfaces/resources/list/pagination-func';

export function ngorContentRangePaginationFuncFactory(): TNgorPaginationFuncCurry {
  const contentRangeRegexp = /^\w+ (\d+)-(\d+)\/(\d+)$/;

  return (pagination: INgorResourceListPagination) =>
    (res: HttpResponse<any>) => {
      const headers = res.headers;
      if (headers) {
        const contentRange = headers.get('content-range');
        if (contentRange) {
          const matches = contentRangeRegexp.exec(contentRange);
          if (matches) {
            const indexes = matches.slice(1);
            pagination.start = +indexes[0];
            pagination.end = +indexes[1];
            pagination.total = +indexes[2];
          }
        }
      }
    };
}
