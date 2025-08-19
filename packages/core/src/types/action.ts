import { ActionResultVariable } from '@core/models/action-result-variable';
import { ActionResultVariableValue } from '@core/models/action-result-variable-value';
import { ParamContext } from '@core/models/param-context';
import { ParamValue } from '@core/models/param-value';
import { ParamVariable } from '@core/models/param-variable';
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
  toJSON(): any;
}

export enum ParamType {
  VARIABLE = 'VARIABLE',
  VALUE = 'VALUE',
  CONTEXT='CONTEXT'
}

export type ParamItem = ParamVariable | ParamValue | ParamContext;

export enum ActionResultType {
  VARIABLE = 'VARIABLE',
  VARIABLE_VALUE = 'VARIABLE_VALUE'
};


export type ActionResult = ActionResultVariable | ActionResultVariableValue; 