import { PropValueType, PropValueVariableValueJSON } from '@core/types/component';
import { Variable } from './variable';

export class PropValueVariableValue {
  type: PropValueType.VARIABLE_VALUE = PropValueType.VARIABLE_VALUE;
  value: Variable;
  key: string;

  constructor(value: Variable, key: string) {
    this.value = value;
    this.key = key;
  }

  toJSON():PropValueVariableValueJSON {
    return {
      type: 'VARIABLE_VALUE',
      value: { id: this.value.id },
      key: this.key
    };
  }
}