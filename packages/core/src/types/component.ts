import { EventValue } from '../models/event-value';
import { PropValue } from '../models/prop-value';

export enum PropType {
  PROP = 'PROP',
  EVENT = 'EVENT',
}

export enum PropValueType {
  VARIABLE = 'VARIABLE',
  VARIABLE_VALUE = 'VARIABLE_VALUE',
  VALUE = 'VALUE',
  SLOT_CONTEXT = 'SLOT_CONTEXT',
  FUNCTION = 'FUNCTION',
}


export interface IComponent<TProps>{
  getComponent(): Promise<any>;
  toJSON(): any;
}


export interface IPropItem {
  toJSON(): any;
}

export type PropItem = PropValue<any> | EventValue;


export type PropValueFunctionJSON = {
  type: 'FUNCTION',
  value: {id: string}[] | {id: string},
  return?: {id: string}
}

export type PropValueSlotContextJSON = {
  type: 'SLOT_CONTEXT',
  component: {id: string},
  key: string
}

export type PropValueValueJSON<TValue> = {
  type:'VALUE',
  value: TValue
}

export type PropValueVariableValueJSON = {
  type: 'VARIABLE_VALUE',
  value: {id: string},
  key: string
}

export type PropValueVariableJSON = {
  type:'VARIABLE',
  value: {id: string}
}

export type PropValueJSON<TValue> = {
  type: 'PROP',
  value: PropValueVariableJSON | PropValueVariableValueJSON | PropValueValueJSON<TValue> | PropValueSlotContextJSON | PropValueFunctionJSON
}

export type EventValueJSON = {
  type: 'EVENT',
  value: {id: string}[] | {id: string},
  return?: {id: string}
}

export type PropItemJSON<TValue=any> = PropValueJSON<TValue> | EventValueJSON;

export type DirectiveValueJSON<TValue=any> = {
  value: PropValueVariableJSON | PropValueVariableValueJSON | PropValueValueJSON<TValue> | PropValueSlotContextJSON | PropValueFunctionJSON
  arg?: string;
  modifiers?: Record<string, boolean>;
}

export type ComponentJSON = {
  $class: string,
  id: string,
  name: string,
  props: Record<string, PropItemJSON>,
  directives: Record<string, DirectiveValueJSON>,
  slots: Record<string, {id: string}[]>,
}
