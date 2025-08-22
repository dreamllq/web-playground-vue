import { Action, ActionOptions } from 'l-play-core';

type TExtension = {
  operator?:string;
}

export class ActionOperator extends Action<TExtension> { 
  $class = 'ActionOperator';

  handle(params: any[], options:ActionOptions): void {
    if (this.result && this.params.length > 0) {
      const paramValues = this.transformParams(params, options);
      if (this.extension.operator) {

      } else {
        this.setResultData(params, options, paramValues[0]);
      }

    }
  }
}