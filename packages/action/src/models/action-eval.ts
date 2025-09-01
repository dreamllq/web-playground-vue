import { Action, ActionOptions } from 'l-play-core';

type TExtension = never;
export class ActionEval extends Action<TExtension> {
  $class = 'ActionEval';

  handle(params: any[], options:ActionOptions) {
    const paramValues = this.transformParams(params, options);
    const data = eval(paramValues[0]);
    this.setResultData(params, options, data);
    return data;
  }
}