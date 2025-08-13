import { Action } from './action';
import { Component } from './component';

export class ActionRef extends Action {
  ref?: Component;
  funcName?: string;

  constructor(name: string) {
    super(name);
  }
}