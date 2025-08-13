import { v4 as uuidv4 } from 'uuid';
import { Variable } from './variable';
import { IAction, ParamItem, ParamType } from '@/types/action';
import { Ref } from 'vue';

export class Action implements IAction {
  id: string = uuidv4();
  name: string;
  params: ParamItem[] = [];
  returnVariable?: Variable;
  async:boolean = false;

  constructor(name: string) {
    this.name = name;
  }
  transformParams(params: any[], options: { variables: Record<string, Ref>; }): any[] {
    const paramValues = this.params.map((param, index) => {
      if (param.type === ParamType.REF) {
        return params[index];
      } else if (param.type === ParamType.VALUE) {
        return param.value;
      } else if (param.type === ParamType.VARIABLE) {
        return options.variables[param.value.id].value;
      }
    });
    return paramValues;
  }
  handle(params: any[], options: { variables: Record<string, Ref>; }): Promise<void> | void {
    throw new Error('Method not implemented.');
  }
}