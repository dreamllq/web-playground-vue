import { ParamType, ParamVariableJSON, ParamVariableValueJSON } from '../types/action';
import { Variable } from './variable';
import { BuildPlaygroundOptions } from '../types/register';

export class ParamVariableValue {
  type: ParamType.VARIABLE_VALUE = ParamType.VARIABLE_VALUE;
  value: Variable; 
  key: string;

  constructor(value: Variable, key: string) {
    this.value = value;
    this.key = key;
  }

  toJSON(): ParamVariableValueJSON {
    return {
      type: 'VARIABLE_VALUE',
      value: { id: this.value.id },
      key: this.key
    };
  }
  
  static fromJSON(json: ParamVariableValueJSON, options:BuildPlaygroundOptions): ParamVariableValue {
    const variable = options.variables.find(item => item.id === json.value.id);
    if (!variable) throw new Error(`Variable ${json.value.id} not found`);
    return new ParamVariableValue(variable, json.key);
  }
}