import { Ref } from 'vue';
import { Action, ActionReturnType } from 'l-play-core';
import { set } from 'lodash';

export class ActionOperator extends Action { 
  operator?:string;

  handle(params: any[], options:{variables:Record<string, Ref>}): void {
    if (this.returnVariable && this.params.length > 0) {
      const paramValues = this.transformParams(params, options);
      if (this.operator) {

      } else {
        this.setReturnData(params, options, paramValues[0]);
      }

    }
  }
}