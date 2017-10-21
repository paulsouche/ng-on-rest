import { INgorResourceListArgs } from './arguments';
import { INgorResourceListParams } from './params';

export type TNgorQueryParamsFunc = (params: INgorResourceListParams) => any;

export type TNgorQueryParamsFuncCurry = (args: INgorResourceListArgs) => TNgorQueryParamsFunc;
