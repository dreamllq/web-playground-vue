import { PropValueType } from '@core/types/component';
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
}