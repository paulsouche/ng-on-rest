import { HttpResponse } from '@angular/common/http';
import { INgorResourceListPagination, TNgorPaginationFuncCurry } from 'ng-on-rest-core';

export function totalCountPaginationFuncFactory(): TNgorPaginationFuncCurry {
  return (pagination: INgorResourceListPagination) =>
    (res: HttpResponse<any>) => {
      const headers = res.headers;
      if (headers) {
        const totalCount = headers.get('X-Total-Count');
        if (totalCount) {
          pagination.total = parseInt(totalCount.split('/').pop() || '0', 10);
        }
      }
    };
}
