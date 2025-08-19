import { ActionResultType } from '@core/types/action';
import { Variable } from './variable';

export class ActionResultVariableValue {
  type: ActionResultType.VARIABLE_VALUE = ActionResultType.VARIABLE_VALUE;
  value: Variable;
  key: string;

  constructor(value: Variable, key: string) {
    this.value = value;
    this.key = key;
  }
}