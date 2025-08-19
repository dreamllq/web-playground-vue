import { PropValueFunctionJSON, PropValueType } from '@core/types/component';
import { Action } from './action';
import { Variable } from './variable';

export class PropValueFunction {
  type: PropValueType.FUNCTION = PropValueType.FUNCTION;
  value: Action[] | Action;
  return?: Variable;

  constructor(value: Action[] | Action, returnVariable?: Variable) {
    this.value = value;
    this.return = returnVariable;
  }

  toJSON(): PropValueFunctionJSON {
    return {
      type: 'FUNCTION',
      value: Array.isArray(this.value) ? this.value.map(item => ({ id: item.id })) : { id: this.value.id },
      return: this.return ? { id: this.return.id } : undefined
    };
  }
}