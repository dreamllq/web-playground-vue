import { Component } from '@core/models/component';
import { Action } from '@core/models/action';
import { Variable } from '@core/models/variable';

export enum ComponentType {
  COMPONENT='COMPONENT',
  CONTAINER='CONTAINER'
}

export interface IComponent<TProps>{
  getComponent(): Promise<any>;
}

export type ActionDefine = {
  value: Action[] | Action;
  return?: Variable;  
}

export type ComponentId = string;

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

export type PropValueVariable = {
  type: PropValueType.VARIABLE,
  value: Variable
};

export type PropValueVariableValue = {
  type: PropValueType.VARIABLE_VALUE,
  value: Variable,
  key: string
};

export type PropValueValue<TValue> = {
  type: PropValueType.VALUE,
  value: TValue;
};

export type PropValueSlotContext = {
  type: PropValueType.SLOT_CONTEXT,
  value: {
    componentId: string,
    key: string
  };
};

export type PropValueFunction = {
  type: PropValueType.FUNCTION
} & ActionDefine


export type PropValue<TValue = string | number | any[] | boolean | Record<string, any>> = {
  type: PropType.PROP,
  value: PropValueVariable | PropValueVariableValue | PropValueValue<TValue> | PropValueSlotContext | PropValueFunction;
}

export type EventValue = {
  type: PropType.EVENT
} & ActionDefine

export type PropItem = PropValue<any> | EventValue;

export type DirectiveValue<TValue = string | number | any[] | boolean | Record<string, any>> = {
  value: PropValueVariable | PropValueVariableValue | PropValueValue<TValue> | PropValueSlotContext | PropValueFunction,
  arg?: string,
  modifiers?: Record<string, boolean>
}