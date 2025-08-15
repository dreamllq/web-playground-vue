import { v4 as uuidv4 } from 'uuid';
import { Variable } from './variable';
import { ActionReturn, ActionReturnType, IAction, ParamItem, ParamType } from '@core/types/action';
import { Ref } from 'vue';
import { set } from 'lodash';

export class Action implements IAction {
  id: string = uuidv4();
  name: string;
  params: ParamItem[] = [];
  returnVariable?: ActionReturn;
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

  setReturnData(params: any[], options: { variables: Record<string, Ref>; }, data: any) {
    if (this.returnVariable) {
      if (this.returnVariable.type === ActionReturnType.VARIABLE) {
        options.variables[this.returnVariable.value.id].value = data;
      } else if (this.returnVariable.type === ActionReturnType.VARIABLE_VALUE) {
        set(options.variables[this.returnVariable.value.id].value, this.returnVariable.key, data);
      }
    }
  }
}