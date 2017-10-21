import { Params } from '@angular/router';

export interface IResourceRouteParams extends Params {
  resource: string;
  step?: string | undefined;
  id?: string | undefined;
}
