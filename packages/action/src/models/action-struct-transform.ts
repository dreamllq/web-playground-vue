import { Action, BuildPlaygroundOptions } from 'l-play-core';
import jsonata from 'jsonata';

type TExtension = {
  ruleString: string
}
export class ActionStructTransform extends Action<TExtension> { 
  $class = 'ActionStructTransform';
  constructor(name: string) {
    super(name);
    this.extension.ruleString = '';
  }

  handle(params: any[], options) {
    if (this.params.length === 0) return;
    const paramValues = this.transformParams(params, options);
    const obj = paramValues[0];
    const result = jsonata(this.extension.ruleString).evaluate(obj);
    console.log('result', result);
    
    this.setResultData(params, options, result);
    return result;
  }
}