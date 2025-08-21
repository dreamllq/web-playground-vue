import { PropType, PropValueType } from 'l-play-core';

export type PropsPropItem = {
  name: string,
  propType?: PropType,
  propValueType?: PropValueType,
  value?: string,
  variable?: string,
  variableKey?: string,
  component?: string,
  slotKey?: string,
  funcActions?: string[],
  funcReturn?: string,
  EventActions?: string[],
}