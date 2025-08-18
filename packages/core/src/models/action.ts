import { v4 as uuidv4 } from 'uuid';
import { Variable } from './variable';
import { ActionResult, ActionResultType, IAction, ParamItem, ParamType } from '@core/types/action';
import { Ref } from 'vue';
import { set } from 'lodash';

export class Action implements IAction {
  id: string = uuidv4();
  name: string;
  params: ParamItem[] = [];
  result?: ActionResult;
  async:boolean = false;

  constructor(name: string) {
    this.name = name;
  }
  handle(params: any[], options: { variables: Record<string, Ref>; refs: Record<string, Ref>; }): Promise<void> | void {
    throw new Error('Method not implemented.');
  }
  transformParams(params: any[], options: { variables: Record<string, Ref>; }): any[] {
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

  setResultData(params: any[], options: { variables: Record<string, Ref>; }, data: any) {
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