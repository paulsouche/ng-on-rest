import { HttpClient, HttpResponse } from '@angular/common/http';
import { IResourceRequest, IResourceResponse } from '@ngx-resource/core';
import { ResourceHandlerHttpClient } from '@ngx-resource/handler-ngx-http';
import { INgorGenericHandler } from '../../interfaces/http/generic-handler';
import { TNgorPaginationFunc } from '../../interfaces/resources/list/pagination-func';

export class NgorGenericHandler extends ResourceHandlerHttpClient implements INgorGenericHandler {
  private _updatePaginationFunc: TNgorPaginationFunc | undefined;

  constructor(http: HttpClient) {
    super(http);
  }

  public setUpdatePaginationFunc(func?: TNgorPaginationFunc) {
    this._updatePaginationFunc = func;
  }

  protected handleResponse(req: IResourceRequest, res: HttpResponse<any>): IResourceResponse {
    if (this._updatePaginationFunc) {
      this._updatePaginationFunc(res);
    }
    return super.handleResponse(req, res);
  }
}
