import { ActionResultType } from '@core/types/action';
import { Variable } from './variable';

export class ActionResultVariable {
  type: ActionResultType.VARIABLE = ActionResultType.VARIABLE;
  value: Variable;

  constructor(value: Variable) {
    this.value = value;
  }
}