import { PropValueType } from '@core/types/component';
import { Variable } from './variable';

export class PropValueVariable {
  type: PropValueType.VARIABLE = PropValueType.VARIABLE;
  value: Variable;

  constructor(value: Variable) {
    this.value = value;
  }
}