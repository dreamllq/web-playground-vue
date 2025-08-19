import { PropValue } from '@core/models/prop-value';
import { EventValue } from '@core/models/event-value';

export enum ComponentType {
  COMPONENT='COMPONENT',
  CONTAINER='CONTAINER'
}

export interface IComponent<TProps>{
  getComponent(): Promise<any>;
  toJSON(): any;
}

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

export type PropItem = PropValue<any> | EventValue;