import { ParamType, ParamVariableJSON } from '../types/action';
import { Variable } from './variable';
import { BuildPlaygroundOptions } from '../types/register';

export class ParamVariable {
  type: ParamType.VARIABLE = ParamType.VARIABLE;
  value: Variable; 

  constructor(value: Variable) {
    this.value = value;
  }

  toJSON(): ParamVariableJSON {
    return {
      type: 'VARIABLE',
      value: { id: this.value.id }
    };
  }
  
  static fromJSON(json: ParamVariableJSON, options:BuildPlaygroundOptions): ParamVariable {
    const variable = options.variables.find(item => item.id === json.value.id);
    if (!variable) throw new Error(`Variable ${json.value.id} not found`);
    return new ParamVariable(variable);
  }
}