import { PropValueVariable } from './prop-value-variable';
import { PropValueVariableValue } from './prop-value-variable-value';
import { PropValueValue } from './prop-value-value';
import { PropValueSlotContext } from './prop-value-slot-context';
import { PropValueFunction } from './prop-value-function';
import { PropType, PropValueJSON } from '../types/component';
import { BuildPlaygroundOptions } from '../types/register';

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

  static fromJSON(json: PropValueJSON<any>, options:BuildPlaygroundOptions): PropValue {
    if (json.value.type === 'VARIABLE') {
      const variable = PropValueVariable.fromJSON(json.value, options);
      return new PropValue(variable);
    } else if (json.value.type === 'VARIABLE_VALUE') {
      const variableValue = PropValueVariableValue.fromJSON(json.value, options);
      return new PropValue(variableValue);
    } else if (json.value.type === 'VALUE') {
      const value = PropValueValue.fromJSON(json.value, options);
      return new PropValue(value);
    } else if (json.value.type === 'SLOT_CONTEXT') {
      const slotContext = PropValueSlotContext.fromJSON(json.value, options);
      return new PropValue(slotContext);
    } else {
      const func = PropValueFunction.fromJSON(json.value, options);
      return new PropValue(func);
    }
  }
}