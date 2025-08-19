import { ActionResultType, ActionResultVariableValueJSON } from '@core/types/action';
import { Variable } from './variable';
import { BuildPlaygroundOptions } from '@core/types/register';

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
        
  static fromJSON(json: ActionResultVariableValueJSON, options:BuildPlaygroundOptions): ActionResultVariableValue {
    const variable = options.variables.find(item => item.id === json.value.id);
    if (!variable) throw new Error(`Variable ${json.value.id} not found`);
    return new ActionResultVariableValue(variable, json.key);
  }
}