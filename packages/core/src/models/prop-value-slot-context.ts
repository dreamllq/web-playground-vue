import { PropValueType } from '@core/types/component';
import { Component } from './component';

export class PropValueSlotContext {
  type: PropValueType.SLOT_CONTEXT = PropValueType.SLOT_CONTEXT;
  value: any;
  component: Component;
  key: string;

  constructor(component: Component, key: string) {
    this.component = component;
    this.key = key;
  }
}