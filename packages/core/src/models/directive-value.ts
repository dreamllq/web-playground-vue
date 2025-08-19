import { PropValueVariable } from './prop-value-variable';
import { PropValueVariableValue } from './prop-value-variable-value';
import { PropValueValue } from './prop-value-value';
import { PropValueSlotContext } from './prop-value-slot-context';
import { PropValueFunction } from './prop-value-function';
import { DirectiveValueJSON } from '@core/types/component';

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
}