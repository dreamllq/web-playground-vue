import { PropValueType, PropValueVariableJSON } from '@core/types/component';
import { Variable } from './variable';
import { BuildPlaygroundOptions } from '@core/types/register';

export class PropValueVariable {
  type: PropValueType.VARIABLE = PropValueType.VARIABLE;
  value: Variable;

  constructor(value: Variable) {
    this.value = value;
  }

  toJSON():PropValueVariableJSON {
    return {
      type: 'VARIABLE',
      value: { id: this.value.id }
    };
  }

  static fromJSON(json: PropValueVariableJSON, options:BuildPlaygroundOptions): PropValueVariable {
    const variable = options.variables.find(item => item.id === json.value.id);
    if (!variable) throw new Error(`Variable ${json.value.id} not found`);
    return new PropValueVariable(variable);
  }
}