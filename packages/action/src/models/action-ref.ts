import { Action } from 'l-play-core';
import { Component } from 'l-play-core';
import { Ref } from 'vue';

export class ActionRef extends Action {
  ref?: Component;
  funcName?: string;

  constructor(name: string) {
    super(name);
  }

  async handle(params: any[], options): Promise<void> {
    if (this.ref && this.funcName) {
      console.log(111, options.refs);

      await options.refs[this.ref.id].value[this.funcName]();
    }
    
  }
}