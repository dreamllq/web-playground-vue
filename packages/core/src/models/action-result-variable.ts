import { ActionResultType, ActionResultVariableJSON } from '../types/action';
import { BuildPlaygroundOptions } from '../types/register';
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
      
  static fromJSON(json: ActionResultVariableJSON, options:BuildPlaygroundOptions): ActionResultVariable {
    const variable = options.variables.find(item => item.id === json.value.id);
    if (!variable) throw new Error(`Variable ${json.value.id} not found`);
    return new ActionResultVariable(variable);
  }
}