import { Action, ActionOptions } from 'l-play-core';
import _ from 'lodash';


type TExtension = {
  func?: string;
}

export class ActionLodash extends Action<TExtension> {
  $class = 'ActionLodash';

  async handle(params: any[], options:ActionOptions) {
    const paramValues = this.transformParams(params, options);
    const result = _[this.extension.func!](...paramValues);
    this.setResultData(params, options, result);
  }
}