import { PropValueSlotContextJSON, PropValueType } from '@core/types/component';
import { Component } from './component';
import { BuildPlaygroundOptions } from '@core/types/register';

export class PropValueSlotContext {
  type: PropValueType.SLOT_CONTEXT = PropValueType.SLOT_CONTEXT;
  value: any;
  component: Component;
  key: string;

  constructor(component: Component, key: string) {
    this.component = component;
    this.key = key;
  }

  toJSON():PropValueSlotContextJSON {
    return {
      type: 'SLOT_CONTEXT',
      component: { id: this.component.id },
      key: this.key
    };
  }
      
  static fromJSON(json: PropValueSlotContextJSON, options:BuildPlaygroundOptions): PropValueSlotContext {
    const component = options.components.find(c => c.id === json.component.id);
    if (!component) throw new Error(`Component ${json.component.id} not found`);
    return new PropValueSlotContext(component, json.key);
  }
}