import { ActionResultType, ActionResultVariableJSON } from '@core/types/action';
import { Variable } from './variable';

export class ActionResultVariable {
  type: ActionResultType.VARIABLE = ActionResultType.VARIABLE;
  value: Variable;

  constructor(value: Variable) {
    this.value = value;
  }

  toJSON(): ActionResultVariableJSON {
    return {
      type: 'VARIABLE',
      value: { id: this.value.id }
    };
  }
}