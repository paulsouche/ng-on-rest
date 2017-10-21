import { INgorFormLabels } from 'ng-on-rest-forms';
import { INgorCreateLabels } from './create-labels';

export interface INgorCreateStepLabels extends INgorFormLabels, INgorCreateLabels {
  subTitle?: string | undefined;
}
