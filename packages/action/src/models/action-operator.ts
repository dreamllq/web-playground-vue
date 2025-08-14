import { Ref } from 'vue';
import { Action, ActionReturnType } from 'l-play-core';
import { set } from 'lodash';

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
        if (this.returnVariable.type === ActionReturnType.VARIABLE) {
          options.variables[this.returnVariable.value.id].value = paramValues[0];
        } else if ((this.returnVariable.type === ActionReturnType.VARIABLE_VALUE)) {
          set(options.variables[this.returnVariable.value.id].value, this.returnVariable.key, paramValues[0]);
        }
      }

    }
  }
}