import { ActionResultVariableValue } from '../models/action-result-variable-value';
import { ParamContext } from '../models/param-context';
import { ParamValue } from '../models/param-value';
import { ParamVariable } from '../models/param-variable';
import { Ref } from 'vue';
import { ActionResultVariable } from '../models/action-result-variable';
import { ParamVariableValue } from '../models/param-variable-value';

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
  toJSON(): ActionJSON<any>;
}

export enum ParamType {
  VARIABLE = 'VARIABLE',
  VARIABLE_VALUE='VARIABLE_VALUE',
  VALUE = 'VALUE',
  CONTEXT='CONTEXT'
}

export type ParamItem = ParamVariable | ParamVariableValue | ParamValue | ParamContext;

export enum ActionResultType {
  VARIABLE = 'VARIABLE',
  VARIABLE_VALUE = 'VARIABLE_VALUE'
};


export type ActionResult = ActionResultVariable | ActionResultVariableValue; 

export type ParamValueJSON = {
  type: 'VALUE',
  value: any
}

export type ParamVariableJSON = {
  type: 'VARIABLE',
  value: {id: string}
}

export type ParamVariableValueJSON = {
  type: 'VARIABLE_VALUE',
  value: {id: string},
  key: string
}

export type ParamContextJSON = {
  type: 'CONTEXT',
  value: number
}

export type ParamItemJSON = ParamValueJSON | ParamVariableJSON | ParamVariableValueJSON | ParamContextJSON;

export type ActionResultVariableJSON = {
  type:'VARIABLE',
  value: {id: string},
}

export type ActionResultVariableValueJSON = {
  type:'VARIABLE_VALUE',
  value: {id: string},
  key: string
}

export type ActionResultJSON = ActionResultVariableJSON | ActionResultVariableValueJSON;


export type ActionJSON<TExtension> = {
  $class: string,
  id: string,
  name: string,
  type: ActionType,
  async: boolean,
  params: ParamItemJSON[],
  result?: ActionResultJSON,
  extension: TExtension
};