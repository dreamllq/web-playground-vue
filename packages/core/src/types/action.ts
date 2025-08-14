import { Variable } from '@/models/variable';
import { Ref } from 'vue';

export interface IAction{
  handle(params: any[], options:{variables:Record<string, Ref>}): Promise<void> | void;
  transformParams(params: any[], options:{variables:Record<string, Ref>}): any[];
}

export enum ParamType {
  VARIABLE = 'VARIABLE',
  VALUE = 'VALUE',
  REF='REF'
}

export type ParamVariable = {
  type: ParamType.VARIABLE,
  value: Variable 
};

export type ParamValue = {
  type: ParamType.VALUE,
  value: string | number | any[] | boolean | Record<string, any>;
};

// 上下文的参数
export type ParamRef = {
  type: ParamType.REF,
  value: number
};

export type ParamItem = ParamVariable | ParamValue | ParamRef;