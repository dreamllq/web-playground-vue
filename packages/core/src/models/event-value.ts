import { CallbackParam, EventValueJSON, PropType } from '../types/component';
import { BuildPlaygroundOptions } from '../types/register';
import { Action } from './action';
import { PropValueSlotContext } from './prop-value-slot-context';
import { PropValueValue } from './prop-value-value';
import { PropValueVariable } from './prop-value-variable';
import { PropValueVariableValue } from './prop-value-variable-value';
import { Variable } from './variable';

export class EventValue {
  type: PropType.EVENT = PropType.EVENT;
  value: Action[] | Action;
  return?: Variable;
  callbackParams?: CallbackParam[];

  constructor(value: Action[] | Action, returnVariable?: Variable, callbackParams?: CallbackParam[]) {
    this.value = value;
    this.return = returnVariable;
    this.callbackParams = callbackParams;
  }

  toJSON():EventValueJSON {
    return {
      type: 'EVENT',
      value: Array.isArray(this.value) ? this.value.map(item => ({ id: item.id })) : { id: this.value.id },
      return: this.return ? { id: this.return.id } : undefined,
      callbackParams: this.callbackParams ? this.callbackParams.map(item => item.toJSON()) : undefined
    };
  }

  static fromJSON(json: EventValueJSON, options:BuildPlaygroundOptions): EventValue {
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

    const callbackParams: CallbackParam[] = [];
    if (json.callbackParams && Array.isArray(json.callbackParams)) {
      json.callbackParams.forEach(item => { 
        if (item.type === 'VALUE') {
          callbackParams.push(new PropValueValue(item.value));
        } else if (item.type === 'VARIABLE') {
          const variable = options.variables.find(v => v.id === item.value.id);
          if (!variable) throw new Error(`Variable ${item.value.id} not found`);
          callbackParams.push(new PropValueVariable(variable));
        } else if (item.type === 'VARIABLE_VALUE') {
          const variable = options.variables.find(v => v.id === item.value.id);
          if (!variable) throw new Error(`Variable ${item.value.id} not found`);
          callbackParams.push(new PropValueVariableValue(variable, item.key));
        } else {
          const component = options.components.find(c => c.id === item.component.id);
          if (!component) throw new Error(`Component ${item.component.id} not found`);
          callbackParams.push(new PropValueSlotContext(component, item.key));
        }
      });
    }

    return new EventValue(value, returnVariable, callbackParams);
  }
}