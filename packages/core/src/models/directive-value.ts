import { PropValueVariable } from './prop-value-variable';
import { PropValueVariableValue } from './prop-value-variable-value';
import { PropValueValue } from './prop-value-value';
import { PropValueSlotContext } from './prop-value-slot-context';
import { PropValueFunction } from './prop-value-function';
import { DirectiveValueJSON } from '@core/types/component';
import { BuildPlaygroundOptions } from '@core/types/register';

type ValueType<TValue> = PropValueVariable | PropValueVariableValue | PropValueValue<TValue> | PropValueSlotContext | PropValueFunction;

export class DirectiveValue<TValue = any> {
  value: ValueType<TValue>;
  arg?: string;
  modifiers?: Record<string, boolean>;

  constructor(value: ValueType<TValue>, arg?: string, modifiers?: Record<string, boolean>) {
    this.value = value;
    this.arg = arg;
    this.modifiers = modifiers;
  }

  toJSON(): DirectiveValueJSON<TValue> {
    return {
      value: this.value.toJSON(),
      arg: this.arg,
      modifiers: this.modifiers
    };
  }
        
  static fromJSON(json: DirectiveValueJSON, options:BuildPlaygroundOptions): DirectiveValue {
    if (json.value.type === 'VARIABLE') {
      const variable = PropValueVariable.fromJSON(json.value, options);
      return new DirectiveValue(variable, json.arg, json.modifiers);
    } else if (json.value.type === 'VARIABLE_VALUE') {
      const variableValue = PropValueVariableValue.fromJSON(json.value, options);
      return new DirectiveValue(variableValue, json.arg, json.modifiers);
    } else if (json.value.type === 'VALUE') {
      const value = PropValueValue.fromJSON(json.value, options);
      return new DirectiveValue(value, json.arg, json.modifiers);
    } else if (json.value.type === 'SLOT_CONTEXT') {
      const slotContext = PropValueSlotContext.fromJSON(json.value, options);
      return new DirectiveValue(slotContext, json.arg, json.modifiers);
    } else {
      const func = PropValueFunction.fromJSON(json.value, options);
      return new DirectiveValue(func, json.arg, json.modifiers);
    }
  }
  
}