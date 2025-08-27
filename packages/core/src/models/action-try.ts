import { ActionType } from '../types/action';
import { Action } from './action';

type TExtension = {
  tryActions: string[];
  catchActions: string[];
  finallyActions: string[];
}

export class ActionTry extends Action<TExtension> {
  $class = 'ActionTry';
  type = ActionType.TRY;
  
  constructor(name: string) {
    super(name);
    this.extension = {
      tryActions: [],
      catchActions: [],
      finallyActions: []
    };
  }
}