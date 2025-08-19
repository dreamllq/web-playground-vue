import { v4 as uuidv4 } from 'uuid';
import { Variable } from './variable';
import { ActionJSON, ActionOptions, ActionResult, ActionResultType, ActionType, IAction, ParamItem, ParamType } from '@core/types/action';
import { Ref } from 'vue';
import { set } from 'lodash';
import { ParamContext } from './param-context';
import { ParamVariable } from './param-variable';
import { ParamValue } from './param-value';
import { BuildPlaygroundOptions } from '@core/types/register';
import { ActionResultVariable } from './action-result-variable';
import { ActionResultVariableValue } from './action-result-variable-value';

export class Action implements IAction {
  type: ActionType = ActionType.FUNCTION;
  id: string = uuidv4();
  name: string;
  params: ParamItem[] = [];
  result?: ActionResult;
  private _async:boolean = false;
  $class = 'Action';

  constructor(name: string) {
    this.name = name;
  }
  toJSON(): ActionJSON {
    return {
      $class: this.$class,
      id: this.id,
      type: this.type,
      name: this.name,
      params: this.params.map(param => param.toJSON()),
      async: this._async,
      result: this.result?.toJSON()
    };
  }

  fromJSON(json: ActionJSON, options: BuildPlaygroundOptions) { 
    this.async = json.async;
    this.params = json.params.map(param => {
      if (param.type === 'CONTEXT') {
        return ParamContext.fromJSON(param, options);
      } else if (param.type === 'VARIABLE') {
        return ParamVariable.fromJSON(param, options);
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
  }

  set async(val:boolean) {
    this._async = val;
  }

  get async():boolean {
    return this._async;
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
        
        options.variables[this.result.value.id].value = data;
      } else if (this.result.type === ActionResultType.VARIABLE_VALUE) {
        set(options.variables[this.result.value.id].value, this.result.key, data);
      }
    }
  }
}