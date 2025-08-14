import { Ref } from 'vue';
import { Action } from 'l-play-core';

export class ActionOperator extends Action { 
  operator?:string;
  constructor(name: string) {
    super(name);
  }

  handle(params: any[], options:{variables:Record<string, Ref>}): void {
    if (this.returnVariable && this.params.length > 0) {
      const paramValues = this.transformParams(params, options);
      if (this.operator) {

      } else {
        options.variables[this.returnVariable.id].value = paramValues[0];
      }

    }
  }
}