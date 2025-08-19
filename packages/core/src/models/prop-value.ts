import { PropType, PropValueJSON } from '@core/types/component';
import { PropValueVariable } from './prop-value-variable';
import { PropValueVariableValue } from './prop-value-variable-value';
import { PropValueValue } from './prop-value-value';
import { PropValueSlotContext } from './prop-value-slot-context';
import { PropValueFunction } from './prop-value-function';

type ValueType<TValue> = PropValueVariable | PropValueVariableValue | PropValueValue<TValue> | PropValueSlotContext | PropValueFunction;

export class PropValue<TValue = any> {
  type: PropType.PROP = PropType.PROP;
  value: ValueType<TValue>;

  constructor(value: ValueType<TValue>) {
    this.value = value;
  }

  toJSON(): PropValueJSON<TValue> {
    return {
      type: 'PROP',
      value: this.value.toJSON()
    };
  }
}