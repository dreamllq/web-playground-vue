import { Ref } from 'vue';
import { Action, ActionReturnType } from 'l-play-core';
import { set } from 'lodash';

export class ActionOperator extends Action { 
  $class = 'ActionOperator';
  operator?:string;

  handle(params: any[], options:{variables:Record<string, Ref>}): void {
    if (this.result && this.params.length > 0) {
      const paramValues = this.transformParams(params, options);
      if (this.operator) {

      } else {
        this.setResultData(params, options, paramValues[0]);
      }

    }
  }

  toJSON() {
    const superJSON = super.toJSON();
    return {
      ...superJSON,
      operator: this.operator
    };
  }
}