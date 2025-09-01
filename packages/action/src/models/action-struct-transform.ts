import { Action, ActionOptions, BuildPlaygroundOptions } from 'l-play-core';
import jsonata from 'jsonata';
import { extensionSchema } from './action-struct-transform.schema';

type TExtension = {
  ruleString: string
}
export class ActionStructTransform extends Action<TExtension> { 
  $class = 'ActionStructTransform';
  static extensionSchema = extensionSchema;
  constructor(name: string) {
    super(name);
    this.extension.ruleString = '';
  }

  handle(params: any[], options:ActionOptions) {
    if (this.params.length === 0) return;
    const paramValues = this.transformParams(params, options);
    const obj = paramValues[0];
    const ruleString = this.getReplaceParamsRuleString(paramValues);
    const result = jsonata(ruleString).evaluate(obj);
    console.log('result', result);
    
    this.setResultData(params, options, result);
    return result;
  }

  getReplaceParamsRuleString(paramValues:any[]):string {
    return this.extension.ruleString.replace(/\$\$([0-9]+)/g, (match, p1) => {
      const index = parseInt(p1);
      
      return paramValues[index];
    });
  }
}