import { ActionResultType, ActionResultVariableValueJSON } from '@core/types/action';
import { Variable } from './variable';

export class ActionResultVariableValue {
  type: ActionResultType.VARIABLE_VALUE = ActionResultType.VARIABLE_VALUE;
  value: Variable;
  key: string;

  constructor(value: Variable, key: string) {
    this.value = value;
    this.key = key;
  }

  toJSON(): ActionResultVariableValueJSON {
    return {
      type: 'VARIABLE_VALUE',
      value: { id: this.value.id },
      key: this.key
    };
  }
}