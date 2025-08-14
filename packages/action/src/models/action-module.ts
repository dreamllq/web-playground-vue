import { Action } from 'l-play-core';

export class ActionModule extends Action {
  moduleName?:string;
  funcName?:string;
  constructor(name: string) {
    super(name);
  }
}