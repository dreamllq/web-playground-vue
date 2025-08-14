import { Component } from '@core/models/component';
import { Action } from '@core/models/action';
import { Variable } from '@core/models/variable';

export enum ComponentType {
  COMPONENT='COMPONENT',
  CONTAINER='CONTAINER'
}

export interface IComponent<TProps>{
  getComponent(): Promise<any>;
  getProps(): TProps;
}

export type ComponentId = string;

export enum PropType {
  PROP = 'PROP',
  EVENT = 'EVENT',
}

export enum PropValueType {
  VARIABLE = 'VARIABLE',
  VALUE = 'VALUE',
  SLOT_CONTEXT = 'SLOT_CONTEXT'
}

export type PropValueVariable = {
  type: PropValueType.VARIABLE,
  value: Variable
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


export type PropValue<TValue = string | number | any[] | boolean | Record<string, any>> = {
  type: PropType.PROP,
  value: PropValueVariable | PropValueValue<TValue> | PropValueSlotContext;
}

export type EventValue={
  type: PropType.EVENT,
  value: Action | Action[]
}

export type PropItem = PropValue<any> | EventValue;
