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

export enum ActionReturnType {
  VARIABLE = 'VARIABLE',
  VARIABLE_VALUE = 'VARIABLE_VALUE'
};

export type ActionReturnVariable = {
  type: ActionReturnType.VARIABLE,
  value: Variable
}

export type ActionReturnVariableValue = {
  type: ActionReturnType.VARIABLE_VALUE,
  value: Variable,
  key: string
}

export type ActionReturn = ActionReturnVariable | ActionReturnVariableValue; 