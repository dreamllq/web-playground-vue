import { PropValueFunctionJSON, PropValueType } from '@core/types/component';
import { Action } from './action';
import { Variable } from './variable';
import { BuildPlaygroundOptions } from '@core/types/register';

export class PropValueFunction {
  type: PropValueType.FUNCTION = PropValueType.FUNCTION;
  value: Action[] | Action;
  return?: Variable;

  constructor(value: Action[] | Action, returnVariable?: Variable) {
    this.value = value;
    this.return = returnVariable;
  }

  toJSON(): PropValueFunctionJSON {
    return {
      type: 'FUNCTION',
      value: Array.isArray(this.value) ? this.value.map(item => ({ id: item.id })) : { id: this.value.id },
      return: this.return ? { id: this.return.id } : undefined
    };
  }
        
  static fromJSON(json: PropValueFunctionJSON, options:BuildPlaygroundOptions): PropValueFunction {
    let value:Action | Action[];
    if (Array.isArray(json.value)) {
      value = json.value.map(item => {
        const action = options.actions.find(a => a.id === item.id);
        if (!action) throw new Error(`Action ${item.id} not found`);
        return action;
      });
    } else {
      const action = options.actions.find(a => a.id === (json.value as {id: string}).id);
      if (!action) throw new Error(`Action ${(json.value as {id: string}).id} not found`);
      value = action;
    }

    let returnVariable: Variable | undefined = undefined;

    if (json.return) {
      const variable = options.variables.find(item => item.id === json.return!.id);
      if (!variable) throw new Error(`Variable ${json.return!.id} not found`);
      returnVariable = variable;
    }

    return new PropValueFunction(value, returnVariable);
  }
}