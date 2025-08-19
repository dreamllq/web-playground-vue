import { Action, ActionReturnType, BuildPlaygroundOptions } from 'l-play-core';
import jsonata from 'jsonata';

export class ActionStructTransform extends Action { 
  $class = 'ActionStructTransform';
  ruleString: string = '';

  constructor(name: string) {
    super(name);
    this.async = true;
  }

  async handle(params: any[], options): Promise<any> {
    if (this.params.length === 0) return;
    const paramValues = this.transformParams(params, options);
    const obj = paramValues[0];
    const result = await jsonata(this.ruleString).evaluate(obj);
    console.log('result', result);
    
    this.setResultData(params, options, result);
    return result;
  }

  toJSON() {
    const superJSON = super.toJSON();
    return {
      ...superJSON,
      ruleString: this.ruleString
    };
  }
      
  fromJSON(json: ReturnType<typeof ActionStructTransform.prototype['toJSON']>, options: BuildPlaygroundOptions) {
    super.fromJSON(json, options);
    this.ruleString = json.ruleString;
  }
}