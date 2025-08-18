import { Variable } from '@core/models/variable';
import { Ref } from 'vue';

export interface IAction{
  handle(params: any[], options:{variables:Record<string, Ref>, refs: Record<string, Ref>}): Promise<any> | any;
  transformParams(params: any[], options:{variables:Record<string, Ref>}): any[];
}

export enum ParamType {
  VARIABLE = 'VARIABLE',
  VALUE = 'VALUE',
  CONTEXT='CONTEXT'
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
export type ParamContext = {
  type: ParamType.CONTEXT,
  value: number
};
export type ParamItem = ParamVariable | ParamValue | ParamContext;

export enum ActionResultType {
  VARIABLE = 'VARIABLE',
  VARIABLE_VALUE = 'VARIABLE_VALUE'
};

export type ActionResultVariable = {
  type: ActionResultType.VARIABLE,
  value: Variable
}

export type ActionResultVariableValue = {
  type: ActionResultType.VARIABLE_VALUE,
  value: Variable,
  key: string
}

export type ActionResult = ActionResultVariable | ActionResultVariableValue; 