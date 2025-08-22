import { PropType, PropValueType } from 'l-play-core';

export type PropsPropItem = {
  name: string,
  propType?: PropType,
  
  EventActions?: string[],
} & PropsPropValueForm;

export type PropsPropValueForm = {
  propValueType?: PropValueType,
  value?: string,
  variable?: string,
  variableKey?: string,
  component?: string,
  slotKey?: string,
  funcActions?: string[],
  funcReturn?: string,
}