import { PropValueType } from '@core/types/component';
import { Variable } from './variable';

export class PropValueVariableValue {
  type: PropValueType.VARIABLE_VALUE = PropValueType.VARIABLE_VALUE;
  value: Variable;
  key: string;

  constructor(value: Variable, key: string) {
    this.value = value;
    this.key = key;
  }
}