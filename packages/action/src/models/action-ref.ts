import { Action } from 'l-play-core';
import { Component } from 'l-play-core';

export class ActionRef extends Action {
  ref?: Component;
  funcName?: string;

  constructor(name: string) {
    super(name);
  }
}