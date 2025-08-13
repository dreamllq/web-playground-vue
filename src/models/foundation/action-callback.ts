import { Action } from './action';

export class ActionCallback extends Action {
  callback?: string;
  constructor(name: string) {
    super(name);
  }
}