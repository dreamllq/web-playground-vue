import { Action } from 'l-play-core';

export class ActionCallback extends Action {
  callback?: string;
  constructor(name: string) {
    super(name);
  }
}