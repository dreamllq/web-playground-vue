import { Variable } from '@core/models/variable';
import { Ref } from 'vue';

export enum ActionType {
  FUNCTION='FUNCTION',
  IF='IF',
  FOR='FOR',
  TRY='TRY',
}


export type ActionOptions = {
  variables:Record<string, Ref>,
  refs: Record<string, Ref>
}
export interface IAction{
  type: ActionType;
  handle(params: any[], options: ActionOptions): Promise<any> | any;
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