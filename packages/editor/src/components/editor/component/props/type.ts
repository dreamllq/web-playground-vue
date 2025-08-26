import { PropType, PropValueType } from 'l-play-core';

export type PropsPropItem = {
  name: string,
  propType?: PropType,
  
  eventActions?: string[],
  callbackParams?:PropsPropValueForm[]
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