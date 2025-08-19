import { Action } from 'l-play-core';
import { Component } from 'l-play-core';

export class ActionRef extends Action {
  $class = 'ActionRef';
  ref?: Component;
  funcName?: string;

  handle(params: any[], options): Promise<void> | void {
    if (this.ref && this.funcName) {
      const paramValues = this.transformParams(params, options);
      if (this.async) {
        return (async () => {
          const data = await options.refs[this.ref!.id].value[this.funcName!](...paramValues);
          this.setResultData(params, options, data);
        })();
      } else {
        const data = options.refs[this.ref!.id].value[this.funcName!](...paramValues);
        this.setResultData(params, options, data);
      }
    }
  }

  toJSON() {
    const superJSON = super.toJSON();
    return {
      ...superJSON,
      ref: this.ref ? { id: this.ref.id } : undefined,
      funcName: this.funcName
    };
  }
}