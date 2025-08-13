import { Action } from './action';

export class ActionModule extends Action {
  moduleName?:string;
  funcName?:string;
  constructor(name: string) {
    super(name);
  }
}