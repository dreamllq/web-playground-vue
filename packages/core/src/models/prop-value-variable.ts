import { PropValueType, PropValueVariableJSON } from '@core/types/component';
import { Variable } from './variable';

export class PropValueVariable {
  type: PropValueType.VARIABLE = PropValueType.VARIABLE;
  value: Variable;

  constructor(value: Variable) {
    this.value = value;
  }

  toJSON():PropValueVariableJSON {
    return {
      type: 'VARIABLE',
      value: { id: this.value.id }
    };
  }
}