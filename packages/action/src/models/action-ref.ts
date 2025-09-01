import { Action, ActionOptions } from 'l-play-core';
import { extensionSchema } from './action-ref.schema';

type ComponentId = string;

type TExtension = {
  ref?: ComponentId;
  funcName?: string;
}
export class ActionRef extends Action<TExtension> {
  static extensionSchema = extensionSchema;
  $class = 'ActionRef';

  constructor(name: string) {
    super(name);
    this.extension.ref = '';
    this.extension.funcName = '';
  }

  handle(params: any[], options:ActionOptions): Promise<void> | void {
    if (this.extension.ref && this.extension.funcName) {
      const paramValues = this.transformParams(params, options);
      
      const data = options.refs[this.extension.ref!].value[this.extension.funcName!](...paramValues);
      if (data instanceof Promise) {
        return data.then(data => {
          this.setResultData(params, options, data);
          return data;
        });
      } else {
        this.setResultData(params, options, data);
        return data;
      }
    }
  }
}