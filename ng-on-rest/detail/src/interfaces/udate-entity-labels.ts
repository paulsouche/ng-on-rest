import { IUpdateEntityModalLabels } from './udate-entity-modal-labels';

export interface INgorUpdateEntityLabels extends IUpdateEntityModalLabels {
  title?: string | undefined;
  edit?: string | undefined;
}
