import { Action, ActionOptions } from 'l-play-core';

type ComponentId = string;

type TExtension = {
  ref?: ComponentId;
  funcName?: string;
}
export class ActionRef extends Action<TExtension> {
  $class = 'ActionRef';

  handle(params: any[], options:ActionOptions): Promise<void> | void {
    if (this.extension.ref && this.extension.funcName) {
      const paramValues = this.transformParams(params, options);
      if (this.async) {
        return (async () => {
          const data = await options.refs[this.extension.ref!].value[this.extension.funcName!](...paramValues);
          this.setResultData(params, options, data);
        })();
      } else {
        const data = options.refs[this.extension.ref!].value[this.extension.funcName!](...paramValues);
        this.setResultData(params, options, data);
      }
    }
  }
}