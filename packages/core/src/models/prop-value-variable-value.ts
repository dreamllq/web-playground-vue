import { PropValueType, PropValueVariableValueJSON } from '../types/component';
import { BuildPlaygroundOptions } from '../types/register';
import { Variable } from './variable';

export class PropValueVariableValue {
  type: PropValueType.VARIABLE_VALUE = PropValueType.VARIABLE_VALUE;
  value: Variable;
  key: string;

  constructor(value: Variable, key: string) {
    this.value = value;
    this.key = key;
  }

  toJSON():PropValueVariableValueJSON {
    return {
      type: 'VARIABLE_VALUE',
      value: { id: this.value.id },
      key: this.key
    };
  }
  
  static fromJSON(json: PropValueVariableValueJSON, options:BuildPlaygroundOptions): PropValueVariableValue {
    const variable = options.variables.find(item => item.id === json.value.id);
    if (!variable) throw new Error(`Variable ${json.value.id} not found`);
    return new PropValueVariableValue(variable, json.key);
  }
}