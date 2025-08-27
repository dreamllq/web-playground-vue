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

  async handle(params: any[], options): Promise<any> {
    if (this.params.length === 0) return;
    const paramValues = this.transformParams(params, options);
    const obj = paramValues[0];
    const result = await jsonata(this.extension.ruleString).evaluate(obj);
    console.log('result', result);
    
    this.setResultData(params, options, result);
    return result;
  }
}