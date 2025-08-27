import { v4 as uuidv4 } from 'uuid';
import { Variable } from './variable';
import { ActionJSON, ActionOptions, ActionResult, ActionResultType, ActionType, IAction, ParamItem, ParamType } from '../types/action';
import { Ref } from 'vue';
import { set, get, cloneDeep } from 'lodash';
import { ParamContext } from './param-context';
import { ParamVariable } from './param-variable';
import { ParamValue } from './param-value';
import { BuildPlaygroundOptions } from '../types/register';
import { ActionResultVariable } from './action-result-variable';
import { ActionResultVariableValue } from './action-result-variable-value';
import { ActionConfig } from '../types/action-config';
import { ParamVariableValue } from './param-variable-value';

export class Action<TExtension extends Record<string, any> = Record<string, any>> implements IAction {
  static config: ActionConfig = { name: 'action' };

  type: ActionType = ActionType.FUNCTION;
  id: string = uuidv4();
  name: string;
  params: ParamItem[] = [];
  result?: ActionResult;
  $class = 'Action';
  extension: TExtension = {} as TExtension;

  constructor(name: string) {
    this.name = name;
  }
  toJSON(): ActionJSON<TExtension> {
    return {
      $class: this.$class,
      id: this.id,
      type: this.type,
      name: this.name,
      params: this.params.map(param => param.toJSON()),
      result: this.result?.toJSON(),
      extension: this.extension
    };
  }

  fromJSON(json: ActionJSON<TExtension>, options: BuildPlaygroundOptions) { 
    this.params = json.params.map(param => {
      if (param.type === 'CONTEXT') {
        return ParamContext.fromJSON(param, options);
      } else if (param.type === 'VARIABLE') {
        return ParamVariable.fromJSON(param, options);
      } else if (param.type === 'VARIABLE_VALUE') {
        return ParamVariableValue.fromJSON(param, options);
      } else {
        return ParamValue.fromJSON(param, options);
      }
    });

    if (json.result) {
      if (json.result.type === 'VARIABLE') {
        this.result = ActionResultVariable.fromJSON(json.result, options);
      } else {
        this.result = ActionResultVariableValue.fromJSON(json.result, options);
      }
    }

    this.extension = json.extension;
  }

  handle(params: any[], options: ActionOptions): Promise<any> | any {
    throw new Error('Method not implemented.');
  }
  protected transformParams(params: any[], options: ActionOptions): any[] {
    const paramValues = this.params.map((param, index) => {
      if (param.type === ParamType.VALUE) {
        return param.value;
      } else if (param.type === ParamType.VARIABLE) {
        return options.variables[param.value.id].value;
      } else if (param.type === ParamType.VARIABLE_VALUE) {
        const value = options.variables[param.value.id].value;
        return get(value, param.key, undefined);
      } else if (param.type === ParamType.CONTEXT) {
        return params[index];
      }
    });
    return paramValues;
  }

  protected setResultData(params: any[], options: ActionOptions, data: any) {
    if (this.result) {
      if (this.result.type === ActionResultType.VARIABLE) {
        // console.log(options.variables[this.result.value.id].value, data);
        
        options.variables[this.result.value.id].value = cloneDeep(data);
      } else if (this.result.type === ActionResultType.VARIABLE_VALUE) {
        set(options.variables[this.result.value.id].value, this.result.key, cloneDeep(data));
      }
    }
  }
}